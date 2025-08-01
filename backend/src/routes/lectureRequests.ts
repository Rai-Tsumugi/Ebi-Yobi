import { Router } from 'express';
import { prisma } from '../lib/db';
import type { OfficialLecture } from '@prisma/client';

const router = Router();

// GET /api/lecture-requests/ranking - 補講開催希望のランキングを取得
router.get('/ranking', async (req, res) => {
  try {
    const ranking: { officialLectureId: number; _count: { officialLectureId: number; } }[] = await prisma.supplementaryLectureRequest.groupBy({
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
    const lectures: OfficialLecture[] = await prisma.officialLecture.findMany({
      where: {
        id: { in: lectureIds },
      },
      select: {
        id: true,
        name: true,
        professor: true,
        dayOfWeek: true,
        period: true,
        termId: true,
        requests: true,
        exceptions: true,
        supplementaryLectures: true,
        term: true,
      },
    });

    const lectureMap = new Map<number, OfficialLecture>(lectures.map((l: OfficialLecture) => [l.id, l]));

    const response = ranking.map(r => ({
      officialLectureId: r.officialLectureId,
      requestCount: r._count.officialLectureId,
      lectureName: lectureMap.get(r.officialLectureId)?.name || '',
      professor: lectureMap.get(r.officialLectureId)?.professor || '',
    }));

    res.json(response);

  } catch (error) {
    console.error('Failed to fetch lecture request ranking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
