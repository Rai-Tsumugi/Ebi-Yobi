"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnlyMiddleware = void 0;
const adminOnlyMiddleware = (req, res, next) => {
    // iapAuthMiddlewareによってreq.userがセットされていることが前提
    if (req.user && req.user.role === 'ADMIN') {
        next(); // ユーザーがADMINなら次の処理へ
    }
    else {
        // ADMINでなければアクセスを拒否
        res.status(403).json({ error: 'Forbidden: Administrator access required.' });
    }
};
exports.adminOnlyMiddleware = adminOnlyMiddleware;
