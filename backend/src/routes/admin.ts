import { Router } from 'express';
import multer from 'multer';
import Papa from 'papaparse';
import { prisma } from '../lib/db';
import { Readable } from 'stream';

const router = Router();

// ファイルをメモリ上にバッファとして保存するmulter設定
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/admin/import-lectures - CSVファイルで公式講義を一括登録
router.post('/import-lectures', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileBuffer = req.file.buffer;
  const lectures: any[] = [];

  try {
    // BufferをStreamに変換してPapaparseでストリーミング処理
    const stream = Readable.from(fileBuffer);
    
    await new Promise<void>((resolve, reject) => {
      Papa.parse(stream, {
        header: true, // 1行目をヘッダーとして扱う
        skipEmptyLines: true,
        step: (result) => {
          // 各行のデータをバリデーションし、配列に追加
          const row = result.data as any;
          if (row.name && row.professor && row.dayOfWeek && row.period && row.termId) {
            lectures.push({
              name: row.name,
              professor: row.professor,
              dayOfWeek: parseInt(row.dayOfWeek, 10),
              period: parseInt(row.period, 10),
              termId: parseInt(row.termId, 10),
            });
          } else {
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
    await prisma.$transaction(async (tx) => {
      // 1. 既存の公式講義データを全て削除
      await tx.officialLecture.deleteMany({});
      
      // 2. CSVからパースした新しいデータを一括登録
      await tx.officialLecture.createMany({
        data: lectures,
      });
    });

    res.status(200).json({ message: `Successfully imported ${lectures.length} lectures.` });

  } catch (error) {
    console.error('CSV import failed:', error);
    res.status(500).json({ error: 'Failed to import CSV file.', details: (error as Error).message });
  }
});

export default router;
