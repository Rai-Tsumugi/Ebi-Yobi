import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// --- ミドルウェアの設定 ---

// CORS設定
// VercelのプレビューデプロイURLは動的に変わるため、正規表現で許可する
const allowedOrigins = [
  'http://localhost:5173', // ローカル開発環境
  /https:\/\/ebiyobi-frontend-.*\.vercel\.app$/, // Vercelのプレビュー環境
  // TODO: 本番環境のドメインを追加
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => (typeof o === 'string' ? o === origin : o.test(origin)))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// JSONリクエストボディをパースする
app.use(express.json());


// --- ルーティングの設定 ---
import { iapAuthMiddleware } from './middleware/auth';
import userRouter from './routes/user';

// /api/users で始まるリクエストに対して、まず認証ミドルウェアを適用し、
// その後userRouterで定義されたエンドポイントに処理を渡す
app.use('/api/users', iapAuthMiddleware, userRouter);



// --- サーバー起動 ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});