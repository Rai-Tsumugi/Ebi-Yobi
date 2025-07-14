
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/users/me - ログインユーザーの情報を取得
router.get('/me', (req, res) => {
  // 認証ミドルウェアによってreq.userがセットされているはず
  if (req.user) {
    res.json(req.user);
  } else {
    // この状況は通常、ミドルウェアで弾かれるため発生しないはず
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// PUT /api/users/me - ログインユーザーの情報（名前）を更新
router.put('/me', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name } = req.body;
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name: name.trim() },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
