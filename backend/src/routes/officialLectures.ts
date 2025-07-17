import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/official-lectures - 全ての公式講義リストを取得
router.get('/', async (req, res) => {
  try {
    const lectures = await prisma.officialLecture.findMany({
      orderBy: {
        name: 'asc', // 名前順でソート
      },
    });
    res.json(lectures);
  } catch (error) {
    console.error('Failed to fetch official lectures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;