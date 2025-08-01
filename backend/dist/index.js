"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3001;
// --- ミドルウェアの設定 ---
// CORS設定
// VercelのプレビューデプロイURLは動的に変わるため、正規表現で許可する
const allowedOrigins = [
    'http://localhost:5173', // ローカル開発環境
    /https:\/\/ebiyobi-frontend-.*\.vercel\.app$/, // Vercelのプレビュー環境
    // TODO: 本番環境のドメインを追加
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(o => (typeof o === 'string' ? o === origin : o.test(origin)))) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
// JSONリクエストボディをパースする
app.use(express_1.default.json());
// --- ルーティングの設定 ---
const auth_1 = require("./middleware/auth");
const user_1 = __importDefault(require("./routes/user"));
const events_1 = __importDefault(require("./routes/events"));
const supplementaryLectures_1 = __importDefault(require("./routes/supplementaryLectures"));
const officialLectures_1 = __importDefault(require("./routes/officialLectures"));
const personalEvents_1 = __importDefault(require("./routes/personalEvents"));
const lectureRequests_1 = __importDefault(require("./routes/lectureRequests")); // インポートを追加
const admin_1 = __importDefault(require("./routes/admin"));
const admin_2 = require("./middleware/admin");
// ... (他の設定)
// --- ルーティングの設定 ---
app.use('/api/users', auth_1.iapAuthMiddleware, user_1.default);
app.use('/api/events', auth_1.iapAuthMiddleware, events_1.default);
app.use('/api/supplementary-lectures', auth_1.iapAuthMiddleware, supplementaryLectures_1.default);
app.use('/api/official-lectures', auth_1.iapAuthMiddleware, officialLectures_1.default);
app.use('/api/personal-events', auth_1.iapAuthMiddleware, personalEvents_1.default);
app.use('/api/lecture-requests', auth_1.iapAuthMiddleware, lectureRequests_1.default); // この行を追加
app.use('/api/admin', auth_1.iapAuthMiddleware, admin_2.adminOnlyMiddleware, admin_1.default);
// --- サーバー起動 ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
