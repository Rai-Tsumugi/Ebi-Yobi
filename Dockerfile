# ステージ1: 依存関係のインストールとビルド
FROM node:18-alpine AS builder
# PrismaのためにOpenSSLをインストール
RUN apk add --no-cache openssl-dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma Clientを生成
RUN npx prisma generate

# Next.jsアプリをビルド
RUN npm run build

# ステージ2: 本番用の軽量イメージを作成
FROM node:18-alpine AS runner
WORKDIR /app

# 本番に必要なファイルのみをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# 生成されたPrisma Clientもコピー
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD ["npm", "start"]