"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iapAuthMiddleware = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const iapAuthMiddleware = async (req, res, next) => {
    // IAPから付与されるヘッダー情報を取得
    const emailHeader = req.headers['x-goog-authenticated-user-email'];
    // ヘッダーが存在しない場合はエラー
    if (!emailHeader) {
        return res.status(401).send('Unauthorized: Missing IAP header');
    }
    // ヘッダーからメールアドレスを抽出 (例: "accounts.google.com:user@example.com" -> "user@example.com")
    const email = emailHeader.split(':').pop();
    if (!email) {
        return res.status(400).send('Bad Request: Invalid IAP header format');
    }
    // 許可するドメインのリストを定義（環境変数から読み込むのが理想的）
    const ALLOWED_DOMAINS = ['your-university.ac.jp', 'another-allowed.edu']; // 例: 実際のドメインに置き換える
    const domain = email.split('@')[1]; // メールアドレスからドメインを抽出
    if (!ALLOWED_DOMAINS.includes(domain)) {
        console.warn(`Unauthorized access attempt from domain: ${domain}`);
        return res.status(403).send('Forbidden: Access denied for this organization.');
    }
    try {
        // メールアドレスを基にユーザーを検索
        let user = await prisma.user.findUnique({
            where: { university_email: email },
        });
        // ユーザーが存在しない場合は新規作成
        if (!user) {
            user = await prisma.user.create({
                data: {
                    university_email: email,
                    // nameは初回ログイン時はNULL
                },
            });
        }
        // 後続の処理で使えるように、リクエストオブジェクトにユーザー情報を格納
        req.user = user;
        next(); // 次のミドルウェアまたはルートハンドラへ処理を移す
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.iapAuthMiddleware = iapAuthMiddleware;
