# Ebi-Yobi

Ebi-Yobi は、大学の講義情報を共有し、学生が主体的に補講を企画・参加できるWebアプリケーションです。

## 主な機能

*   **カレンダー:** 履修している公式講義、有志による私的補講、個人の予定をまとめてカレンダーで確認できます。
*   **公式講義:** シラバス情報をインポートし、休講や教室変更などを反映した最新の講義情報を確認できます。
*   **補講:**
    *   **開催:** 学生が自由に補講を企画し、参加者を募集できます。
    *   **リクエスト:** 出席できなかった講義や、より深く学びたい講義の補講開催をリクエストできます。リクエスト数の多い講義はランキングで表示されます。
*   **個人予定:** 自分だけのプライベートな予定を登録・管理できます。

## 技術スタック

### フロントエンド

*   [React](https://react.dev/)
*   [Vite](https://vitejs.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [FullCalendar](https://fullcalendar.io/)
*   [SWR](https://swr.vercel.app/)
*   [React Router](https://reactrouter.com/)

### バックエンド

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Prisma](https://www.prisma.io/)
*   [PostgreSQL](https://www.postgresql.org/) (Prisma経由)

### その他

*   [Docker](https://www.docker.com/)

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/Ebi-Yobi.git
cd Ebi-Yobi
```

### 2. 環境変数の設定

バックエンド用の`.env`ファイルを作成します。

```bash
cp backend/.env.example backend/.env
```

`backend/.env`ファイルを開き、データベースの接続情報などを設定してください。

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
# その他必要な環境変数
```

### 3. 依存関係のインストール

**フロントエンド**
```bash
cd frontend
npm install
```

**バックエンド**
```bash
cd ../backend
npm install
```

### 4. データベースのマイグレーション

```bash
cd backend
npx prisma migrate dev
```

### 5. 開発サーバーの起動

**フロントエンド**
```bash
cd frontend
npm run dev
```

**バックエンド**
```bash
cd ../backend
npm run dev
```

アプリケーションは `http://localhost:5173` で、バックエンドは `http://localhost:3000` で起動します。

## API

APIの仕様については、[API仕様書](API.md)（別途作成想定）を参照してください。

## 開発プロセスについて

このプロジェクトの開発は、` Gemini CLI ` との対話を通じて行われました。
`tasks` ディレクトリには、その過程で生成・利用されたドキュメントが格納されています。

*   `base.md`: 開発の初期構想が記述されています。
*   `think.md`, `issuse.md`: `base.md`から具体的な機能や仕様を`Gemini CLI`との対話を通じて具体化していく過程の思考プロセスや課題が記録されています。
*   `TASKS.md`: `issuse.md`などで洗い出された課題を、Issueごとに整理しまとめたファイルです。
*   `howto.md`: `TASKS.md`をもとに、`Gemini CLI`と協働しながら作成した具体的な仕様書です。

これらのドキュメントは、本プロジェクトがどのようにして現在の形になったかの背景理解に役立ちます。

## 貢献

IssueやPull Requestはいつでも歓迎します。
