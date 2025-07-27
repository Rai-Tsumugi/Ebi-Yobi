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
import eventRouter from './routes/events';
import supplementaryLectureRouter from './routes/supplementaryLectures';
import officialLectureRouter from './routes/officialLectures';
import personalEventRouter from './routes/personalEvents';
import lectureRequestRouter from './routes/lectureRequests'; // インポートを追加

// ... (他の設定)

// --- ルーティングの設定 ---

app.use('/api/users', iapAuthMiddleware, userRouter);
app.use('/api/events', iapAuthMiddleware, eventRouter);
app.use('/api/supplementary-lectures', iapAuthMiddleware, supplementaryLectureRouter);
app.use('/api/official-lectures', iapAuthMiddleware, officialLectureRouter);
app.use('/api/personal-events', iapAuthMiddleware, personalEventRouter);
app.use('/api/lecture-requests', iapAuthMiddleware, lectureRequestRouter); // この行を追加



// --- サーバー起動 ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});