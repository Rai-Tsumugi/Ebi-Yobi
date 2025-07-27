import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/official-lectures - 全ての公式講義リストを取得
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const lectures = await prisma.officialLecture.findMany({
      orderBy: {
        name: 'asc', // 名前順でソート
      },
      include: {
        requests: true, // 関連するリクエストも取得
      },
    });

    const userId = req.user.id; // ログインユーザーのID

    const responseLectures = lectures.map(lecture => {
      const requestCount = lecture.requests.length;
      const isRequested = lecture.requests.some(request => request.userId === userId);
      
      // 不要なrequestsプロパティを削除して返す
      const { requests, ...rest } = lecture;
      return {
        ...rest,
        requestCount,
        isRequested,
      };
    });

    res.json(responseLectures);
  } catch (error) {
    console.error('Failed to fetch official lectures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/official-lectures/:id/requests - 補講開催を希望する
router.post('/:id/requests', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const officialLectureId = parseInt(req.params.id, 10);
  if (isNaN(officialLectureId)) {
    return res.status(400).json({ error: 'Invalid lecture ID' });
  }

  try {
    // 既に希望済みでないか確認
    const existingRequest = await prisma.supplementaryLectureRequest.findUnique({
      where: {
        userId_officialLectureId: {
          userId: req.user.id,
          officialLectureId,
        },
      },
    });

    if (existingRequest) {
      return res.status(409).json({ error: 'Already requested' }); // 409 Conflict
    }

    await prisma.supplementaryLectureRequest.create({
      data: {
        userId: req.user.id,
        officialLectureId,
      },
    });
    res.status(201).send();

  } catch (error) {
    console.error('Failed to create lecture request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/official-lectures/:id/requests - 補講開催の希望を取り消す
router.delete('/:id/requests', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const officialLectureId = parseInt(req.params.id, 10);
  if (isNaN(officialLectureId)) {
    return res.status(400).json({ error: 'Invalid lecture ID' });
  }

  try {
    await prisma.supplementaryLectureRequest.delete({
      where: {
        userId_officialLectureId: {
          userId: req.user.id,
          officialLectureId,
        },
      },
    });
    res.status(204).send();

  } catch (error) {
    // @ts-ignore
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Request not found' });
    }
    console.error('Failed to delete lecture request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;