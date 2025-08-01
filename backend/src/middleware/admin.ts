import { Request, Response, NextFunction } from 'express';

export const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // iapAuthMiddlewareによってreq.userがセットされていることが前提
  if (req.user && req.user.role === 'ADMIN') {
    next(); // ユーザーがADMINなら次の処理へ
  } else {
    // ADMINでなければアクセスを拒否
    res.status(403).json({ error: 'Forbidden: Administrator access required.' });
  }
};
