# 1. 基盤技術の構成

| 領域           | 担当サービス     | 主要技術          | 役割                                                  |
| -------------- | ---------------- | ----------------- | ----------------------------------------------------- |
| フロントエンド | Vercel           | React / Vite      | UIの表示、ユーザー操作の受付、APIリクエストの送信     |
| 認証           | Google IAP       | -                 | Cloud Runへのアクセスを学内Googleアカウントのみに制限 |
| バックエンド   | Google Cloud Run | Node.js / Express | APIロジックの実行、データベースとの連携               |
| データベース   | Google Cloud SQL | PostgreSQL        | 全てのデータの永続的な保存・管理                      |

# 2. フロントエンド

- Vercel（ホスティングプラットフォーム）
  - Reactプロジェクトのビルドとデプロイを管理し、静的ファイルをユーザーに配信
  - バックエンドのCloud Run上で公開されているAPIと通信
- React（UIライブラリ）
  - Viteによってビルド・管理され、Vercel上で実行
  - 開発環境ではNode.jsに依存
- Vite（ビルドツール）
  - 開発環境のNode.js上で実行

# 3. バックエンド

- Google Cloud Run（実行環境）
  - Node.jsアプリケーションのコンテナをホスティング・実行
  - Google IAPによって保護
- Node.js（サーバーサイド言語）
  - ExpressとPrismaを実行
- Express（Webフレームワーク）
  - APIのエンドポイントを定義
- Prisma（データベース連携）
  - Cloud SQLを操作

# 4. 認証とデータベース

- Google IAP（認証）
  - Cloud Runサービスを保護
- Google Cloud SQL（データベース）
  - Prismaクライアントからの接続を受け付け、データの永続化を担当

---

# 5. VercelとGoogle Cloud Runで実行環境を構築するための設定リスト

## 5.1. Vercel（フロントエンド）

- フレームワークプリセット:
  - 設定値: Vite
  - 目的: VercelにプロジェクトがViteで構築されていることを伝え、最適なビルド・デプロイ設定を自動で行わせるため
- 環境変数（Environment Variables）:
  - キー: `VITE_API_BASE_URL`
  - 値: （Cloud RunでデプロイしたバックエンドのURL例: `https://ebiyobi-backend-xxxx.a.run.app`）
  - 目的: Reactアプリが本番環境で通信すべきバックエンドAPIの場所を知るため

## 5.2. Cloud Run（バックエンド）

- ソースコードのデプロイ:
  - 設定値: 対象のGitHubリポジトリとブランチを指定
  - 目的: 指定リポジトリのコードを元に、自動でコンテナをビルド・デプロイ
- 環境変数:
  - キー: `DATABASE_URL`
    - 値: Cloud SQLの接続文字列例: `postgresql://user:password@host:port/database`
    - 目的: Node.jsアプリ（Prisma）が接続すべきデータベースの場所を特定
  - キー: `CORS_ORIGIN`
    - 値: VercelでデプロイしたフロントエンドのURL例: `https://ebiyobi-frontend.vercel.app`
    - 目的: バックエンドAPIがVercel上のフロントエンドからのリクエストのみを許可（CORS設定）
- 下り（外向き）のネットワーク:
  - 設定値: Cloud SQLへの直接接続
  - 目的: Cloud RunからCloud SQLへ安全かつ効率的に接続

## 5.3. Cloud SQL（データベース）

- 公開IP: 無効（プライベートIPのみ有効化）
  - 目的: データベースをインターネットから直接アクセスできないようにし、セキュリティ向上。Cloud Runからは内部ネットワーク経由で接続

## 5.4. IAP（認証） & IAM（権限管理）

- IAPの設定:
  - 対象リソース: 作成したCloud Runサービス
  - 設定: IAPを有効にする
  - 目的: Cloud Runの手前に認証の関所を設置
- IAPのアクセス許可:
  - プリンシパル: アクセスを許可したいGoogleグループまたは個人のGoogleアカウント（学内ドメイン）
  - ロール: IAP-secured Web App User
  - 目的: IAPを通過してCloud Runにアクセスできるユーザーを定義
- IAPサービスアカウントへの権限付与:
  - プリンシパル: `service-[PROJECT_NUMBER]@gcp-sa-iap.iam.gserviceaccount.com`
  - ロール: Cloud Run Invoker
  - 目的: IAPが認証済みユーザーのリクエストをCloud Runへ中継できるようにする

---

# 6. 開発環境の構築

## 6.1. 準備するもの

- Node.js（npm含む）
- Git
- Docker Desktop
- VS Code

## 6.2. プロジェクトの初期化

```bash
# プロジェクト用のフォルダを作成
mkdir ebi-yobi
cd ebi-yobi

# フロントエンドとバックエンドのフォルダを作成
mkdir frontend backend
```

## 6.3. データベースの起動（Docker）

- プロジェクトのルートフォルダ（ebi-yobi）に `docker-compose.yml` を作成

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=ebiyobi_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

- データベース起動コマンド

```bash
docker-compose up -d
```

## 6.4. バックエンドのセットアップ（backendフォルダ）

- Node.jsプロジェクト初期化とライブラリインストール

```bash
cd backend
npm init -y
npm install express cors dotenv
npm install --save-dev typescript ts-node nodemon prisma @types/node @types/express
```

- Prisma初期化

```bash
npx prisma init --datasource-provider postgresql
```

- .envファイル編集（docker-compose.ymlと一致させる）

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/ebiyobi_dev"
```

- テーブル作成

```bash
npx prisma migrate dev --name init
```

## 6.5. フロントエンドのセットアップ（frontendフォルダ）

- Reactプロジェクト作成と依存ライブラリインストール

```bash
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

- 環境変数の設定  
  frontendフォルダ直下に `.env.development` を作成し、ローカルのバックエンドサーバーの場所を指定

```
VITE_API_BASE_URL=http://localhost:3001
```
（※バックエンドを3001ポートで動かす場合）

## 6.6. 開発環境の起動

- ターミナル①（データベース）: ebi-yobiフォルダで `docker-compose up`
- ターミナル②（バックエンド）: backendフォルダで `npm run dev`
- ターミナル③（フロントエンド）: frontendフォルダで `npm run dev`

- ブラウザで `http://localhost:5173` などにアクセスすれば、開発中のアプリケーションが表示されます。

# 7. 開発環境の依存関係

- ホストOS（あなたのPC: macOS, Windowsなど）
  - Docker Desktop を実行
  - Node.js を実行
  - VS Code や Git などのツールを実行

- Docker Desktop（コンテナ管理）
  - `docker-compose.yml` の設定に基づき、PostgreSQLのコンテナを管理・実行

- Node.js（アプリケーション実行環境）
  - バックエンドのWebサーバー（Express）を実行（`npm run dev`）
  - フロントエンドの開発サーバー（Vite）を実行（`npm run dev`）
  - データベースを操作するPrismaのコマンドを実行

# 8. 各プログラム間の通信の流れ

- 開発中は、以下の流れで各プログラムが通信します。

  - フロントエンド（Vite） ↔ バックエンド（Express） ↔ データベース（Docker上のPostgreSQL）

    - フロントエンドは、ローカルで動いているバックエンドのAPI（例: `http://localhost:3001`）を呼び出します。
    - バックエンドは、そのリクエストに応じて、Dockerで動いているデータベース（例: `localhost:5432`）に接続してデータを操作します。