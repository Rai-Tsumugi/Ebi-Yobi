"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const papaparse_1 = __importDefault(require("papaparse"));
const db_1 = require("../lib/db");
const stream_1 = require("stream");
const router = (0, express_1.Router)();
// ファイルをメモリ上にバッファとして保存するmulter設定
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// POST /api/admin/import-lectures - CSVファイルで公式講義を一括登録
router.post('/import-lectures', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const fileBuffer = req.file.buffer;
    const lectures = [];
    try {
        // BufferをStreamに変換してPapaparseでストリーミング処理
        const stream = stream_1.Readable.from(fileBuffer);
        await new Promise((resolve, reject) => {
            papaparse_1.default.parse(stream, {
                header: true, // 1行目をヘッダーとして扱う
                skipEmptyLines: true,
                step: (result) => {
                    // 各行のデータをバリデーションし、配列に追加
                    const row = result.data;
                    if (row.name && row.professor && row.dayOfWeek && row.period && row.termId) {
                        lectures.push({
                            name: row.name,
                            professor: row.professor,
                            dayOfWeek: parseInt(row.dayOfWeek, 10),
                            period: parseInt(row.period, 10),
                            termId: parseInt(row.termId, 10),
                        });
                    }
                    else {
                        // バリデーションエラーがある行はスキップまたはエラー処理
                        console.warn('Skipping invalid row:', result.data);
                    }
                },
                complete: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
        // トランザクション内で洗い替え処理を実行
        await db_1.prisma.$transaction(async (tx) => {
            // 1. 既存の公式講義データを全て削除
            await tx.officialLecture.deleteMany({});
            // 2. CSVからパースした新しいデータを一括登録
            await tx.officialLecture.createMany({
                data: lectures,
            });
        });
        res.status(200).json({ message: `Successfully imported ${lectures.length} lectures.` });
    }
    catch (error) {
        console.error('CSV import failed:', error);
        res.status(500).json({ error: 'Failed to import CSV file.', details: error.message });
    }
});
exports.default = router;
