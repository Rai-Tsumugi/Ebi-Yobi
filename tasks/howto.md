# Issue #1: プロジェクト管理システムのセットアップ手順

このドキュメントは、GitHubリポジトリの初期設定を行うための手順書です。

## 1. ブランチの作成と保護設定

### a. `develop` ブランチの作成
以下のコマンドを実行して `develop` ブランチを作成し、リモートリポジトリにプッシュします。
（この手順は実行済みです）
```bash
git branch develop
git push origin develop
```

### b. ブランチの保護設定 (手動設定)
`main` ブランチと `develop` ブランチに意図しないコミットが行われるのを防ぐため、保護ルールを設定します。

1.  GitHubリポジトリのページにアクセスします。
2.  `Settings` タブ > `Branches` メニューを選択します。
3.  `Add branch protection rule` をクリックします。
4.  **`main` ブランチの保護ルール:**
    -   **Branch name pattern:** `main`
    -   `Require a pull request before merging` をチェックします。
        -   `Require approvals` をチェックし、必要なレビュー数を `1` に設定します。
    -   `Do not allow bypassing the above settings` をチェックします。
    -   `Create` をクリックしてルールを保存します。
5.  **`develop` ブランチの保護ルール (推奨):**
    -   同様に `develop` ブランチの保護ルールも作成します。
    -   設定は `main` と同様に、プルリクエスト経由でのマージを必須とすることが推奨されます。
    -   **推奨設定例:**
        1. `Branch name pattern` に `develop` を入力します。
        2. `Require a pull request before merging` を有効化します。
            - `Require approvals` を有効にし、必要なレビュー数を `1` 以上に設定します（チーム体制に応じて調整）。
            - `Dismiss stale pull request approvals when new commits are pushed`（新しいコミットがプッシュされた場合に承認を無効化）を有効にすることを推奨します。
            - `Require review from Code Owners`（CODEOWNERSによるレビュー必須）を必要に応じて有効化します。
        3. `Require status checks to pass before merging` を有効化し、CI/CD等のチェックが通過していることを必須にします（設定済みのチェックがある場合）。
        4. `Require linear history`（リニアヒストリーを強制）や `Include administrators`（管理者にもルールを適用）も必要に応じて有効化します。
        5. `Do not allow bypassing the above settings` を有効化します。
        6. `Create` をクリックしてルールを保存します。
    -   これにより、`develop`ブランチへの直接コミットや強制プッシュを防ぎ、品質管理を徹底できます。

## 2. Issue テンプレートの作成

開発タスクを標準化するため、Issueテンプレートを作成します。
（この手順は実行済みです。`.github/ISSUE_TEMPLATE` ディレクトリに以下のファイルが作成されました）

-   `bug_report.md`: バグ報告用
-   `feature_request.md`: 機能要望用
-   `task.md`: 一般的な開発タスク用

## 3. GitHub ラベルの設定 (手動設定)

`issuse.md`で定義されているラベルをGitHubに設定し、Issueの分類を容易にします。

1.  GitHubリポジトリの `Issues` タブ > `Labels` メニューを選択します。
2.  `New label` ボタンをクリックし、以下のラベルを一つずつ作成します。

### 種別 (Type)
- **Name:** `Type: Bug`, **Color:** `#d73a4a`  
  **Description:** バグ報告用。既存機能の不具合や誤動作に関するIssue。
- **Name:** `Type: Feature`, **Color:** `#a2eeef`  
  **Description:** 新機能の追加要望や提案に関するIssue。
- **Name:** `Type: Enhancement`, **Color:** `#a2eeef`  
  **Description:** 既存機能の改善や最適化に関するIssue。
- **Name:** `Type: Task`, **Color:** `#a2eeef`  
  **Description:** 一般的な開発タスクや作業項目。

### 担当領域 (Scope)
- **Name:** `Scope: Frontend`, **Color:** `#7e57c2`  
  **Description:** フロントエンド（UI/UX、React等）に関するIssue。
- **Name:** `Scope: Backend`, **Color:** `#03a9f4`  
  **Description:** バックエンド（API、DB等）に関するIssue。
- **Name:** `Scope: Infra`, **Color:** `#f9a825`  
  **Description:** インフラ（サーバー、CI/CD、クラウド等）に関するIssue。
- **Name:** `Scope: Docs`, **Color:** `#0075ca`  
  **Description:** ドキュメントや仕様書に関するIssue。

### 優先度 (Priority)
- **Name:** `Priority: High`, **Color:** `#b71c1c`  
  **Description:** 優先度が高く、早急な対応が必要なIssue。
- **Name:** `Priority: Medium`, **Color:** `#fbca04`  
  **Description:** 通常優先度のIssue。
- **Name:** `Priority: Low`, **Color:** `#cfd8dc`  
  **Description:** 優先度が低く、後回しでも問題ないIssue。

### 状態 (Status)
- **Name:** `Status: Good First Issue`, **Color:** `#7057ff`  
  **Description:** 初学者や新規参加者向けの簡単なIssue。
- **Name:** `Status: Help Wanted`, **Color:** `#008672`  
  **Description:** 他の協力者の助けが必要なIssue。
- **Name:** `Status: Blocked`, **Color:** `#e11d21`  
  **Description:** 他の作業や要因により進行が止まっているIssue。


# Issue #1: プロジェクト管理システムのセットアップ手順

このドキュメントは、GitHubリポジトリの初期設定を行うための手順書です。

## 1. ブランチの作成と保護設定

### a. `develop` ブランチの作成
以下のコマンドを実行して `develop` ブランチを作成し、リモートリポジトリにプッシュします。
（この手順は実行済みです）
```bash
git branch develop
git push origin develop
```

### b. ブランチの保護設定 (手動設定)
`main` ブランチと `develop` ブランチに意図しないコミットが行われるのを防ぐため、保護ルールを設定します。

1.  GitHubリポジトリのページにアクセスします。
2.  `Settings` タブ > `Branches` メニューを選択します。
3.  `Add branch protection rule` をクリックします。
4.  **`main` ブランチの保護ルール:**
    -   **Branch name pattern:** `main`
    -   `Require a pull request before merging` をチェックします。
        -   `Require approvals` をチェックし、必要なレビュー数を `1` に設定します。
    -   `Do not allow bypassing the above settings` をチェックします。
    -   `Create` をクリックしてルールを保存します。
5.  **`develop` ブランチの保護ルール (推奨):**
    -   同様に `develop` ブランチの保護ルールも作成します。
    -   設定は `main` と同様に、プルリクエスト経由でのマージを必須とすることが推奨されます。

## 2. Issue テンプレートの作成

開発タスクを標準化するため、Issueテンプレートを作成します。
（この手順は実行済みです。`.github/ISSUE_TEMPLATE` ディレクトリに以下のファイルが作成されました）

-   `bug_report.md`: バグ報告用
-   `feature_request.md`: 機能要望用
-   `task.md`: 一般的な開発タスク用

## 3. GitHub ラベルの設定 (手動設定)

`issuse.md`で定義されているラベルをGitHubに設定し、Issueの分類を容易にします。

1.  GitHubリポジトリの `Issues` タブ > `Labels` メニューを選択します。
2.  `New label` ボタンをクリックし、以下のラベルを一つずつ作成します。

### 種別 (Type)
- **Name:** `Type: Bug`, **Color:** `#d73a4a`
- **Name:** `Type: Feature`, **Color:** `#a2eeef`
- **Name:** `Type: Enhancement`, **Color:** `#a2eeef`
- **Name:** `Type: Task`, **Color:** `#a2eeef`

### 担当領域 (Scope)
- **Name:** `Scope: Frontend`, **Color:** `#7e57c2`
- **Name:** `Scope: Backend`, **Color:** `#03a9f4`
- **Name:** `Scope: Infra`, **Color:** `#f9a825`
- **Name:** `Scope: Docs`, **Color:** `#0075ca`

### 優先度 (Priority)
- **Name:** `Priority: High`, **Color:** `#b71c1c`
- **Name:** `Priority: Medium`, **Color:** `#fbca04`
- **Name:** `Priority: Low`, **Color:** `#cfd8dc`

### 状態 (Status)
- **Name:** `Status: Good First Issue`, **Color:** `#7057ff`
- **Name:** `Status: Help Wanted`, **Color:** `#008672`
- **Name:** `Status: Blocked`, **Color:** `#e11d21`

---

# Issue #2: ローカル開発環境の構築

## 1.2.1. 前提条件

開発を開始する前に、以下のツールがインストールされていることを確認してください。

- Git
- Node.js (LTS版を推奨)
- Docker Desktop

## 1.2.2. セットアップ手順

### Step 1: プロジェクトのクローン

*この手順は既に完了しているため、スキップします。*

### Step 2: データベースの起動 (Docker)

プロジェクトのルートディレクトリに `docker-compose.yml` ファイルを作成し、以下の内容を記述します。

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

ファイル作成後、以下のコマンドでデータベースコンテナを起動します。

```bash
docker-compose up -d
```

### Step 3: バックエンドのセットアップ

1.  `backend` ディレクトリに移動し、必要なパッケージをインストールします。
    ```bash
    cd backend
    npm install
    ```

2.  `backend` ディレクトリ直下に `.env` ファイルを作成し、データベースへの接続情報を記述します。
    ```
    # .env
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/ebiyobi_dev"
    ```

3.  Prismaスキーマを基に、データベースのテーブルを作成します。
    ```bash
    npx prisma migrate dev
    ```

### Step 4: フロントエンドのセットアップ

1.  `frontend` ディレクトリに移動し、必要なパッケージをインストールします。
    ```bash
    # ルートディレクトリに戻ってから移動
    cd ../frontend
    npm install
    ```

2.  `frontend` ディレクトリ直下に `.env.development` ファイルを作成し、バックエンドAPIのURLを指定します。
    ```
    # .env.development
    VITE_API_BASE_URL=http://localhost:3001
    ```

### 1.2.3. 開発サーバーの起動

全てのセットアップが完了したら、各コンポーネントを起動して開発を開始します。

**1. 開発用スクリプトの準備と初期設定**

`backend` の `package.json` には、デフォルトで開発サーバーを起動するスクリプト（`dev`）が含まれていませんでした。また、TypeScriptファイルを直接実行するための設定も不足していました。以下の手順でこれらを解決します。

-   **`backend/package.json` の `scripts` セクションを修正:**
    `nodemon` を使用して `src/index.ts` を監視・実行する `dev` スクリプトを追加します。
    ```json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "nodemon src/index.ts"
    },
    ```
    *思想:* `nodemon` はファイルの変更を検知して自動でサーバーを再起動するために導入します。

-   **`backend` ディレクトリ内に `src` ディレクトリと `index.ts` を作成:**
    `src` ディレクトリを作成し、その中に `index.ts` というファイルを作成して、動作確認用の簡単なExpressサーバーのコードを記述します。
    ```typescript
    // backend/src/index.ts
    import express from 'express';

    const app = express();
    const port = 3001;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    ```
    *思想:* バックエンドサーバーが正しく起動し、基本的なリクエストに応答できることを確認するための最小限のコードです。

-   **`tsconfig.json` の作成と設定 (重要)**
    `npm run dev` 実行時に `TypeError: Unknown file extension ".ts"` エラーが発生しました。これは Node.js が `.ts` ファイルを直接実行できないためです。`ts-node` は TypeScript ファイルをその場でコンパイルして実行するツールですが、Node.js のモジュール解決の仕組みと `ts-node` の連携には `tsconfig.json` による適切な設定が必要です。特に、Node.js の新しいバージョンでは ESM (ECMAScript Modules) がデフォルトになりつつあるため、`module` オプションを `CommonJS` に明示的に設定することが重要です。

    `backend` ディレクトリ直下に `tsconfig.json` ファイルを作成し、以下の内容を記述します。
    ```json
    // backend/tsconfig.json
    {
      "compilerOptions": {
        "target": "es2020",
        "module": "CommonJS",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true,
        "outDir": "./dist",
        "rootDir": "./src"
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules"]
    }
    ```
    *思想:* `ts-node` が TypeScript ファイルを正しく解釈し、Node.js が実行可能な形式に変換するために必要なコンパイラオプションを定義します。特に `"module": "CommonJS"` は、Node.js の実行環境との互換性を確保するために重要です。

**2. 開発サーバーの起動**

3つのターミナルをそれぞれ開き、以下のコマンドを実行します。

-   **ターミナル① (プロジェクトルート):** データベースを起動します。
    ```bash
    docker-compose up
    ```

-   **ターミナル② (`backend` ディレクトリ):** バックエンドのAPIサーバーを起動します。
    ```bash
    cd backend
    npm run dev
    ```

-   **ターミナル③ (`frontend` ディレクトリ):** フロントエンドの開発サーバーを起動します。
    ```bash
    cd frontend
    npm run dev
    ```

**3. 動作確認**

ブラウザで `http://localhost:5173` (Viteのデフォルト) にアクセスし、Reactアプリケーションが表示されることを確認します。
また、バックエンドサーバーが起動していることを確認するために、`http://localhost:3001` にアクセスして "Hello World!" が表示されることを確認します.

# Issue #3: CI/CD パイプラインの構築

このセクションでは、GitHubリポジトリへのプッシュをトリガーとして、VercelおよびGoogle Cloudへ自動的にデプロイされるCI/CDパイプラインを構築する手順を詳述します。

## 1.3.1. デプロイ戦略の確認

`issuse.md` に記載されているデプロイ戦略を再確認します。

-   **ステージング環境**: `develop`ブランチにマージされると、ステージング環境へ自動でデプロイされる。機能の事前確認やテストに使用する。
-   **本番環境**: `main`ブランチにマージされると、本番環境へ自動でデプロイされる。ユーザーが実際に利用する環境となる。

## 1.3.2. フロントエンド (Vercel) の設定

Vercel のダッシュボード上で GitHub リポジトリを連携し、以下の設定を行います。

1.  **Vercel プロジェクトの作成と GitHub 連携:**
    -   Vercel のウェブサイト (`vercel.com`) にアクセスし、ログインします。
    -   `New Project` をクリックし、GitHub リポジトリをインポートします。
    -   プロジェクトのルートディレクトリがモノレポのルート (`ebi-yobi/`) であることを確認し、`frontend` ディレクトリを Vercel プロジェクトのルートとして設定します。

2.  **プロジェクト設定:**
    -   **Framework Preset**: `Vite` を選択します。
    -   **Root Directory**: `frontend` を指定します。

3.  **環境変数 (Environment Variables) の設定:**
    -   **Production (`main` ブランチにデプロイされる環境):**
        -   `VITE_API_BASE_URL`: 本番バックエンドのURL (例: `https://ebiyobi-backend-prod.a.run.app`) を設定します。このURLは、バックエンドの Cloud Run サービスをデプロイした後に取得できます。
    -   **Preview (`develop` ブランチなど、プルリクエスト時にデプロイされる環境):**
        -   `VITE_API_BASE_URL`: ステージングバックエンドのURL (例: `https://ebiyobi-backend-staging.a.run.app`) を設定します。このURLも、バックエンドの Cloud Run サービスをデプロイした後に取得できます。

## 1.3.3. バックエンド (Google Cloud Run) の設定

Google Cloud Build を利用して、GitHub リポジトリの変更を検知し Cloud Run へデプロイします。

1.  **Google Cloud プロジェクトのセットアップ:**
    -   Google Cloud Console (`https://console.cloud.google.com/`) にアクセスし、新しいプロジェクトを作成するか、既存のプロジェクトを選択します。
    -   **操作によってできるようになること:** GCP 上でリソースを管理するための論理的なコンテナが準備されます。
    -   以下の API を有効にします。
        -   Cloud Run API
        -   Cloud SQL Admin API
        -   Cloud Build API
        -   Identity-Aware Proxy (IAP) API
    -   **操作によってできるようになること:** これらのサービスを利用するための基盤が整い、Cloud Run でアプリケーションをデプロイしたり、Cloud SQL でデータベースを管理したり、Cloud Build で CI/CD を自動化したり、IAP で認証を強化したりする準備ができます。

2.  **`backend` ディレクトリに `Dockerfile` を作成:**
    `backend` ディレクトリのルートに `Dockerfile` という名前のファイルを作成し、以下の内容を記述します。
    ```dockerfile
    # Use the official Node.js 20 image as the base image
    FROM node:20-slim

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and package-lock.json to the working directory
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application code
    COPY . .

    # Build the TypeScript application
    RUN npm run build

    # Expose the port the app runs on
    EXPOSE 3001

    # Run the application
    CMD ["npm", "start"]
    ```
    *思想:* この `Dockerfile` は、Node.js アプリケーションをコンテナ化するための標準的な手順を定義しています。依存関係のインストール、TypeScript のビルド、そしてアプリケーションの起動コマンドを含みます。
    *   **操作によってできるようになること:** バックエンドアプリケーションを Docker コンテナとしてパッケージ化できるようになります。これにより、環境に依存せず、どこでも一貫した方法でアプリケーションを実行・デプロイすることが可能になります。

3.  **Cloud SQL for PostgreSQL インスタンスの作成:**
    -   Cloud Console で `Cloud SQL` に移動し、`インスタンスを作成` をクリックします。
    -   `PostgreSQL` を選択し、インスタンス名 (例: `ebiyobi-prod-db`, `ebiyobi-staging-db`)、パスワード、リージョンなどを設定します。
    -   **本番用とステージング用の2つのインスタンス**を作成します。
    -   **接続設定:** `プライベート IP` を有効化し、`パブリック IP` は無効化します。
    -   **操作によってできるようになること:** アプリケーションが利用するデータベースがクラウド上に構築されます。プライベート IP の設定により、Cloud Run からの安全な内部接続が可能になり、外部からの直接アクセスを防ぐことでセキュリティが向上します。

4.  **Cloud Run サービスの作成:**
    -   Cloud Console で `Cloud Run` に移動し、`サービスを作成` をクリックします。
    -   **本番用とステージング用の2つのサービス**を作成します。
    -   **コンテナイメージの URL:** ここではまだイメージがないため、**後で Cloud Build からデプロイされるイメージを指定します**。初期デプロイ時には、適当なダミーイメージ（例: `gcr.io/cloudrun/hello`）を指定しておき、後で Cloud Build トリガーで自動更新されるように設定します。
    -   **環境変数:**
        -   `DATABASE_URL`: 対応する Cloud SQL インスタンスの接続文字列 (例: `postgresql://user:password@/database?host=/cloudsql/project-id:region:instance-name`) を設定します。
        -   `CORS_ORIGIN`: 対応する Vercel フロントエンドの URL (Production/Preview) を設定します。例: `https://ebiyobi-frontend.vercel.app` (本番用), `https://ebiyobi-frontend-git-develop-your-username.vercel.app` (ステージング用)
    -   **ネットワーク:** Cloud SQL に接続するために、`VPC コネクタ` を設定します。
    -   **操作によってできるようになること:** バックエンドアプリケーションをサーバーレス環境で実行するためのエンドポイントが準備されます。環境変数により、データベース接続や CORS 設定が動的に行われ、VPC コネクタにより Cloud SQL とのセキュアな通信が可能になります。

5.  **Cloud Build トリガーの設定:**
    -   Cloud Console で `Cloud Build` に移動し、`トリガー` をクリックします。
    -   **`main` ブランチ用と `develop` ブランチ用の2つのトリガー**を作成します。
    -   **イベント:** `ブランチにプッシュする` を選択します。
    -   **ソース:** GitHub リポジトリと対象ブランチ (`main` または `develop`) を選択します。
    -   **ビルド構成:** `Dockerfile` を選択し、`backend` ディレクトリ内の `Dockerfile` を指定します。
    -   **ビルド済みイメージの保存先:** 対応する Cloud Run サービスにデプロイされるイメージのパスを指定します。
    -   **操作によってできるようになること:** GitHub へのコードプッシュをトリガーとして、バックエンドアプリケーションのコンテナイメージが自動的にビルドされ、対応する Cloud Run サービスにデプロイされるようになります。これにより、CI/CD パイプラインの自動化が実現します。


## 1.3.4. 認証 (Google IAP) の設定

Cloud Run で稼働するバックエンド API を保護するため、Identity-Aware Proxy (IAP) を設定します。

1.  **IAP の有効化:**
    -   Cloud Console で `Identity-Aware Proxy` に移動します。
    -   対象の Cloud Run サービスを選択し、IAP を有効にします。

2.  **OAuth 同意画面の設定:**
    -   IAP を有効にする前に、OAuth 同意画面が正しく設定されている必要があります。`OAuth 同意画面` に移動し、アプリケーション名、サポートメール、承認済みドメインなどを設定します。

3.  **アクセス許可 (IAM) の設定:**
    -   Cloud Console で `IAM と管理` > `IAM` に移動します。
    -   アクセスを許可したい Google アカウントまたは Google グループに対し、「`IAP-secured Web App User`」ロールを付与します。これにより、指定されたユーザーのみが IAP を通過してバックエンド API にアクセスできるようになります。

## 1.3.5. 動作確認

-   `develop` ブランチにプッシュし、ステージング環境のフロントエンドとバックエンドがデプロイされ、正しく連携していることを確認します。
-   `main` ブランチにプルリクエストをマージし、本番環境のフロントエンドとバックエンドがデプロイされ、正しく連携していることを確認します。
-   IAP が正しく機能し、認証されたユーザーのみがバックエンド API にアクセスできることを確認します。
-   

# Issue #4: データベースの初期構成

このセクションでは、アプリケーションが使うデータの「設計図」を作り、それを実際のデータベースに反映させる方法を学びます。データベースは、アプリの情報を整理して保存する「倉庫」のようなものです。この倉庫の設計図を「スキーマ」と呼びます。

## 1.4.1. Prismaスキーマ定義の理解と更新

私たちのプロジェクトでは、**Prisma** というツールを使ってデータベースの設計図（スキーマ）を管理します。Prisma は、データベースの操作を簡単にしてくれる便利な道具です。

1.  **`backend/prisma/schema.prisma` ファイルを開く:**
    このファイルが、私たちのデータベースの設計図の「唯一の真実の源（Single Source of Truth）」となります。つまり、データベースの構造はすべてこのファイルで定義します。

2.  **スキーマの内容を確認する:**
    `issuse.md` の `1.4.1. Prismaスキーマ定義` に、このプロジェクトで使うテーブル（データの種類）とその中身（カラム）が詳しく書かれています。例えば、`User`（ユーザー）テーブルには `id` や `university_email`、`name` といった情報が保存されます。

    ```prisma
    // backend/prisma/schema.prisma の一部抜粋
    model User {
      id                      String                           @id @default(cuid())
      university_email        String                           @unique
      name                    String?                          // 初回ログイン時はNULL
      // ... その他の項目
    }
    ```
    *   **`model User { ... }`**: これは「ユーザー」という種類のデータを保存する「テーブル」の設計図です。
    *   **`id String @id @default(cuid())`**: `id` はユーザーを識別するための番号（または文字列）です。`@id` は「この項目でユーザーを特定するよ」という意味で、`@default(cuid())` は「自動的にユニークなIDを割り振るよ」という意味です。
    *   **`university_email String @unique`**: `university_email` は大学のメールアドレスです。`@unique` は「同じメールアドレスは2つとないよ」という意味で、重複を防ぎます。
    *   **`name String?`**: `name` はユーザーの名前です。`?` がついているのは「名前がなくても大丈夫だよ（最初は空っぽでもいいよ）」という意味です。

3.  **`schema.prisma` ファイルを更新する:**
    `backend/prisma/schema.prisma` ファイルの内容が、`issuse.md` の `1.4.1. Prismaスキーマ定義` に記載されている内容と完全に一致していることを確認してください。もし異なっている場合は、`issuse.md` の内容で `backend/prisma/schema.prisma` を上書きしてください。

    *   **操作によってできるようになること:** アプリケーションが扱うデータの種類（テーブル）と、それぞれのデータがどのような情報（カラム）を持つのかが明確に定義されます。これにより、アプリケーションがデータを保存したり、読み出したりする際のルールが確立されます。

## 1.4.2. マイグレーションの実行

データベースの設計図（`schema.prisma`）を更新したら、その変更を実際のデータベースに反映させる必要があります。この作業を「マイグレーション」と呼びます。Prisma は、このマイグレーション作業をとても簡単にしてくれます。

1.  **ローカル開発環境のデータベースが起動していることを確認する:**
    `docker-compose up -d` コマンドで起動した PostgreSQL データベースが動いていることを確認してください。データベースが動いていないと、Prisma は変更を反映できません。

2.  **マイグレーションコマンドを実行する:**
    `backend` ディレクトリに移動し、以下のコマンドを実行します。
    ```bash
    cd backend
    npx prisma migrate dev --name <マイグレーションの概要>
    ```
    *   `<マイグレーションの概要>` の部分には、今回の変更内容がわかるような短い名前をつけます。例えば、初めてデータベースを作る場合は `init` や `initial-schema` などが良いでしょう。もし後で新しいテーブルを追加したり、既存のテーブルに項目を追加したりする場合は、`add-new-feature-table` のように、変更内容がわかる名前にします。
    *   **操作によってできるようになること:** `npx prisma migrate dev` コマンドを実行すると、Prisma は `schema.prisma` の変更を検知し、その変更をデータベースに適用するための特別なファイル（マイグレーションファイル）を自動的に作成してくれます。そして、そのファイルを使って、実際にデータベースに新しいテーブルを作ったり、既存のテーブルを変更したりしてくれます。これにより、データベースの構造が `schema.prisma` の内容と常に一致するようになります。

    *   **補足:** このコマンドは、データベースの変更履歴を管理するためのファイルも作成します。これにより、後からデータベースの構造を元に戻したり、別の環境に同じ構造を適用したりすることが容易になります。

## 1.4.3. 本番データベースの準備 (手動設定)

ローカル開発環境だけでなく、実際にアプリケーションを公開する「本番環境」や、テストを行う「ステージング環境」でもデータベースが必要です。これらのデータベースは、Google Cloud SQL を使って準備します。

1.  **Google Cloud SQL for PostgreSQL インスタンスの作成:**
    -   `Issue #3: CI/CD パイプラインの構築` の `1.3.3. バックエンド (Google Cloud Run) の設定` の手順で、既に Cloud SQL インスタンスを作成しているはずです。
    -   **本番用 (`production`) とステージング用 (`staging`) の2つの PostgreSQL データベースインスタンス**が作成されていることを確認してください。
    -   **操作によってできるようになること:** アプリケーションが本番環境やステージング環境で利用する、安定したデータベースがクラウド上に用意されます。

2.  **本番環境へのマイグレーション適用:**
    本番環境のデータベースに `schema.prisma` の変更を適用する（テーブルを作成する）作業は、手動で行うのではなく、**CI/CD パイプライン経由で安全に実行する計画**です。

    *   **なぜ自動化するのか？**
        手動でデータベースの変更を行うと、以下のような問題が発生しやすくなります。
        -   **ヒューマンエラー:** コマンドの打ち間違いや手順の漏れなど、人為的なミスが起こりやすい。
        -   **環境間の差異:** 開発環境と本番環境でデータベースの構造が異なってしまい、アプリケーションが正しく動作しなくなる可能性がある。
        -   **ロールバックの困難さ:** 問題が発生した際に、以前の状態に戻すのが難しい。
        CI/CD パイプラインに組み込むことで、これらのリスクを最小限に抑え、より確実で安全にデータベースの更新を行うことができます。

    *   **具体的な自動化の仕組み（概要）:**
        -   **Cloud Build のトリガー:** GitHub の `main` ブランチにコードがプッシュされると、Cloud Build が自動的に起動します。
        -   **コンテナイメージのビルド:** Cloud Build は、`Dockerfile` に基づいてバックエンドアプリケーションの新しいコンテナイメージをビルドします。
        -   **マイグレーションの実行:** ビルドプロセスの一部として、またはデプロイ後のコンテナ起動時に、Prisma のマイグレーションコマンド (`npx prisma migrate deploy`) が自動的に実行されるように設定します。これにより、最新の `schema.prisma` の内容が本番データベースに適用されます。
        -   **Cloud Run へのデプロイ:** マイグレーションが成功した後、新しいコンテナイメージが Cloud Run サービスにデプロイされ、アプリケーションが更新されます。

    *   **操作によってできるようになること:**
        -   **データベースの自動更新:** コードの変更（特に `schema.prisma` の変更）が GitHub にプッシュされるだけで、自動的に本番データベースの構造に反映されるようになります。
        -   **デプロイプロセスの安全性向上:** 手動での操作ミスが減り、データベースの更新がより確実に行われるようになります。
        -   **開発効率の向上:** 開発者はデータベースの更新を手動で行う手間が省け、アプリケーション開発に集中できるようになります。
        -   **環境の一貫性:** 開発環境と本番環境のデータベーススキーマが常に同期されるようになります。
