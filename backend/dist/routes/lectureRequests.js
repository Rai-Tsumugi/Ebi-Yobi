"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
// GET /api/lecture-requests/ranking - 補講開催希望のランキングを取得
router.get('/ranking', async (req, res) => {
    try {
        const ranking = await db_1.prisma.supplementaryLectureRequest.groupBy({
            by: ['officialLectureId'],
            _count: {
                officialLectureId: true,
            },
            orderBy: {
                _count: {
                    officialLectureId: 'desc',
                },
            },
            take: 10, // 上位10件に絞る
        });
        // 講義情報を取得してマージ
        const lectureIds = ranking.map(r => r.officialLectureId);
        const lectures = await db_1.prisma.officialLecture.findMany({
            where: {
                id: { in: lectureIds },
            },
        });
        const lectureMap = new Map(lectures.map(l => [l.id, l]));
        const response = ranking.map(r => ({
            officialLectureId: r.officialLectureId,
            requestCount: r._count.officialLectureId,
            lectureName: lectureMap.get(r.officialLectureId)?.name || '',
            professor: lectureMap.get(r.officialLectureId)?.professor || '',
        }));
        res.json(response);
    }
    catch (error) {
        console.error('Failed to fetch lecture request ranking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
