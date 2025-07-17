# Issue #1: プロジェクト管理システムのセットアップ手順

このドキュメントは、GitHubリポジトリの初期設定を行うための手順書です。

## 1. ブランチの作成と保護設定

### a. `develop` ブランチの作成
以下のコマンドを実行して `develop` ブランチを作成し、リモートリポジリにプッシュします。
（この手順は実行済みです）
```bash
git branch develop
git push origin develop
```

### b. ブランチの保護設定 (手動設定)
`main` ブランチと `develop` ブランチに意図しないコミットが行われるのを防ぐため、保護ルールを設定します。

1.  GitHubリポジリのページにアクセスします。
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

1.  GitHubリポジリの `Issues` タブ > `Labels` メニューを選択します。
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

このドキュメントは、GitHubリポジリの初期設定を行うための手順書です。

## 1. ブランチの作成と保護設定

### a. `develop` ブランチの作成
以下のコマンドを実行して `develop` ブランチを作成し、リモートリポジリにプッシュします。
（この手順は実行済みです）
```bash
git branch develop
git push origin develop
```

### b. ブランチの保護設定 (手動設定)
`main` ブランチと `develop` ブランチに意図しないコミットが行われるのを防ぐため、保護ルールを設定します。

1.  GitHubリポジリのページにアクセスします。
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

1.  GitHubリポジリの `Issues` タブ > `Labels` メニューを選択します。
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
    npm install
    ```

**3. 動作確認**

ブラウザで `http://localhost:5173` (Viteのデフォルト) にアクセスし、Reactアプリケーションが表示されることを確認します。
また、バックエンドサーバーが起動していることを確認するために、`http://localhost:3001` にアクセスして "Hello World!" が表示されることを確認します.

# Issue #3: CI/CD パイプラインの構築

このセクションでは、GitHubリポジリへのプッシュをトリガーとして、VercelおよびGoogle Cloudへ自動的にデプロイされるCI/CDパイプラインを構築する手順を詳述します。

## 1.3.1. デプロイ戦略の確認

`issuse.md` に記載されているデプロイ戦略を再確認します。

-   **ステージング環境**: `develop`ブランチにマージされると、ステージング環境へ自動でデプロイされる。機能の事前確認やテストに使用する。
-   **本番環境**: `main`ブランチにマージされると、本番環境へ自動でデプロイされる。ユーザーが実際に利用する環境となる。

## 1.3.2. フロントエンド (Vercel) の設定

Vercel のダッシュボード上で GitHub リポジリを連携し、以下の設定を行います。

1.  **Vercel プロジェクトの作成と GitHub 連携:**
    -   Vercel のウェブサイト (`vercel.com`) にアクセスし、ログインします。
    -   `New Project` をクリックし、GitHub リポジリをインポートします。
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

Google Cloud Build を利用して、GitHub リポジリの変更を検知し Cloud Run へデプロイします。

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
    -   **ソース:** GitHub リポジリと対象ブランチ (`main` または `develop`) を選択します。
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

# Issue #5: 認証機構の実装

このセクションでは、`issuse.md`の「2.1. 認証機構の実装」に基づき、アプリケーションの認証機能を具体的に実装する手順を詳述します。

## 2.1.1. バックエンド側の実装

バックエンドは、フロントエンドからのリクエストを受け取り、Google IAPが付与したユーザー情報を基に、データベースのユーザー情報を管理する責務を負います。

### Step 1: 依存関係の確認と設定

- **`cors`のインストール:** フロントエンド（Vercel）からバックエンド（Cloud Run）へのリクエストはクロスオリジンとなるため、`cors`ミドルウェアが必要です。
  ```bash
  # backend ディレクトリで実行
  npm install cors
  # 型定義もインストール
  npm install -D @types/cors
  ```
- **Prisma Clientの生成:** データベースと対話するためのクライアントを生成します。
  ```bash
  # backend ディレクトリで実行
  npx prisma generate
  ```
  *思想:* `prisma generate`は`schema.prisma`の内容を基に、型安全なデータベースアクセスクライアントを`node_modules/@prisma/client`内に生成します。これにより、コード内で`prisma.user.findUnique`のようなメソッドをTypeScriptの型補完と共に利用できるようになります。

### Step 2: Expressサーバーの基本設定 (`backend/src/index.ts`)

`index.ts`を修正し、`cors`ミドルウェアの適用、JSONリクエストボディのパース設定、そしてPrisma Clientのインスタンス化を行います。

```typescript
// backend/src/index.ts

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
  /https:\/\/ebiyobi-frontend-.*\.vercel\.app\/, // Vercelのプレビュー環境
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
// (後続のステップで作成するルーターをここにインポートして使用する)


// --- サーバー起動 ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
*思想:* `cors`ミドルウェアを早期に適用することで、後続のルートハンドラに到達する前にオリジンチェックを完了させます。許可するオリジンを明示的にリスト化することで、意図しないドメインからのAPIアクセスを防ぎます。

### Step 3: 認証ミドルウェアの作成 (`backend/src/middleware/auth.ts`)

APIリクエストからIAPの認証情報を抽出し、対応するユーザー情報をDBから取得・作成して後続処理に渡すミドルウェアを作成します。

1.  `backend/src/`内に`middleware`ディレクトリを作成します。
2.  `backend/src/middleware/`内に`auth.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// backend/src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ExpressのRequestオブジェクトにuserプロパティを追加するための型拡張
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        university_email: string;
        name: string | null;
        role: 'USER' | 'ADMIN';
      }
    }
  }
}

export const iapAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // IAPから付与されるヘッダー情報を取得
  const emailHeader = req.headers['x-goog-authenticated-user-email'];
  
  // ヘッダーが存在しない場合はエラー
  if (!emailHeader) {
    return res.status(401).send('Unauthorized: Missing IAP header');
  }
  
  // ヘッダーからメールアドレスを抽出 (例: "accounts.google.com:user@example.com" -> "user@example.com")
  const email = (emailHeader as string).split(':').pop();
  if (!email) {
    return res.status(400).send('Bad Request: Invalid IAP header format');
  }

  // --- ここから追加するロジック --- 
  // 許可するドメインのリストを定義（環境変数から読み込むのが理想的）
  const ALLOWED_DOMAINS = ['your-university.ac.jp', 'another-allowed.edu']; // 例: 実際のドメインに置き換える

  const domain = email.split('@')[1]; // メールアドレスからドメインを抽出
  if (!ALLOWED_DOMAINS.includes(domain)) {
    console.warn(`Unauthorized access attempt from domain: ${domain}`);
    return res.status(403).send('Forbidden: Access denied for this organization.');
  }
  // --- ここまで追加するロジック --- 

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

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Internal Server Error');
  }
};
```
*思想:* このミドルウェアは、認証ロジックをAPIエンドポイントの実装から分離する責務を持ちます。`req.user`にユーザー情報を格納することで、後続のどのルートハンドラでも認証済みユーザーの情報にアクセスできるようになり、コードの再利用性が高まります。`declare global`を用いた型拡張は、TypeScript環境で`req.user`に安全にアクセスするために不可欠です。

#### 補足: 組織ドメインによるアクセス制限の追加

IAPからの認証情報に加えて、特定の組織のメールアドレスドメインのみを許可するロジックをミドルウェアに追加することができます。これにより、より厳格なアクセス制御を実現します。

```typescript
// backend/src/middleware/auth.ts (iapAuthMiddleware関数内)

// ... (既存のIAPヘッダー取得とメールアドレス抽出ロジック)

const email = (emailHeader as string).split(':').pop();
if (!email) {
  return res.status(400).send('Bad Request: Invalid IAP header format');
}

// --- ここから追加するロジック --- 
// 許可するドメインのリストを定義（環境変数から読み込むのが理想的）
const ALLOWED_DOMAINS = ['your-university.ac.jp', 'another-allowed.edu']; // 例: 実際のドメインに置き換える

const domain = email.split('@')[1]; // メールアドレスからドメインを抽出
if (!ALLOWED_DOMAINS.includes(domain)) {
  console.warn(`Unauthorized access attempt from domain: ${domain}`);
  return res.status(403).send('Forbidden: Access denied for this organization.');
}
// --- ここまで追加するロジック --- 

try {
  // ... (既存のユーザー検索・作成ロジック)
} catch (error) {
  // ...
}
```

このロジックは、ユーザー情報をデータベースに登録する前に実行されるため、不正なアクセスを早期にブロックし、セキュリティを強化します。

### Step 4: ユーザールーターの作成 (`backend/src/routes/user.ts`)

ユーザー情報に関連するAPIエンドポイントをまとめたルーターを作成します。

1.  `backend/src/`内に`routes`ディレクトリを作成します。
2.  `backend/src/routes/`内に`user.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// backend/src/routes/user.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/users/me - ログインユーザーの情報を取得
router.get('/me', (req, res) => {
  // 認証ミドルウェアによってreq.userがセットされているはず
  if (req.user) {
    res.json(req.user);
  } else {
    // この状況は通常、ミドルウェアで弾かれるため発生しないはず
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// PUT /api/users/me - ログインユーザーの情報（名前）を更新
router.put('/me', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name } = req.body;
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name: name.trim() },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
```
*思想:* `express.Router`を使うことで、関連するAPIエンドポイントをモジュールとしてカプセル化します。これにより、`index.ts`が肥大化するのを防ぎ、コードの見通しを良くします。

### Step 5: ルーティングの統合 (`backend/src/index.ts`)

作成した認証ミドルウェアとユーザールーターを`index.ts`に組み込みます。

```typescript
// backend/src/index.ts の `// --- ルーティングの設定 ---` セクションを以下のように修正

import { iapAuthMiddleware } from './middleware/auth';
import userRouter from './routes/user';

// ... (他の設定)

// --- ルーティングの設定 ---

// /api/users で始まるリクエストに対して、まず認証ミドルウェアを適用し、
// その後userRouterで定義されたエンドポイントに処理を渡す
app.use('/api/users', iapAuthMiddleware, userRouter);

// ... (サーバー起動)
```
*思想:* `app.use('/api/users', ...)`のようにパスを指定してミドルウェアとルーターを適用することで、特定のパス以下にのみ認証を必須にすることができます。これにより、将来的に認証が不要なAPI（例: 公開情報取得API）を追加する際に柔軟な対応が可能になります。

## 2.1.2. フロントエンド側の実装

フロントエンドは、バックエンドAPIと通信して認証状態を管理し、ユーザー名が未登録の場合には入力を促すUIを提供する責務を負います。

### Step 1: 依存関係のインストール

データ取得と状態管理を効率的に行うため、`SWR`をインストールします。

```bash
# frontend ディレクトリで実行
npm install swr
```

### Step 2: APIクライアントの準備 (`frontend/src/lib/api.ts`)

APIリクエストを行うためのヘルパー関数を作成します。

1.  `frontend/src/`内に`lib`ディレクトリを作成します。
2.  `frontend/src/lib/`内に`api.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/lib/api.ts

import type { User } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Google IAPを介したリクエストでは、通常ブラウザが自動で認証情報をハンドリングするため、
// fetchのオプションに特別なヘッダーを追加する必要はありません。
// ただし、withCredentialsをtrueに設定することが推奨される場合があります。
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'omit', // IAPでは通常不要だが、将来的な認証方式の変更に備える
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // エラーレスポンスから詳細な情報を取得してエラーオブジェクトに添付
    try {
      error.info = await res.json();
    } catch (e) {
      // JSONパースに失敗した場合
      error.info = { message: await res.text() };
    }
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// ユーザー情報を更新するAPI関数
export const updateUser = async (name: string): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    // エラーハンドリング
    throw new Error('Failed to update user');
  }

  return res.json();
};
```
*思想:* API通信ロジックを`fetcher`関数に集約することで、コードの重複を避け、エラーハンドリングや認証情報の付与を一元管理できます。`SWR`はこの`fetcher`関数と組み合わせて使用します。

#### 補足: `import type`とモジュール解決について

ViteのようなモダンなビルドツールとTypeScriptの組み合わせでは、型定義ファイル（例: `src/types/user.ts`）から`interface`のような型情報のみをインポートする際に、`import { User } from '../types/user';` のように記述すると、ビルド時に`User`という名前の**値**がエクスポートされていないためにエラーとなることがあります。これは、TypeScriptの`"verbatimModuleSyntax": true`（または`"isolatedModules": true`）設定が有効な場合に特に顕著です。

この問題を回避し、型のみをインポートすることを明示するためには、`import type`構文を使用することが推奨されます。

```typescript
// 修正前 (エラーの原因となる可能性あり)
import { User } from '../types/user';

// 修正後 (型のみをインポートすることを明示)
import type { User } from '../types/user';
```

この修正は、`frontend/src/lib/api.ts`と`frontend/src/hooks/useUser.ts`の両方で必要となります。

#### 補足: `fetcher`関数のエクスポート

`frontend/src/lib/api.ts`で定義する`fetcher`関数は、`frontend/src/hooks/useUser.ts`からインポートして使用するため、`export`キーワードを付与する必要があります。

```typescript
// 修正前 (エクスポートが不足)
const fetcher = async <T>(url: string): Promise<T> => { ... };

// 修正後 (エクスポートを追加)
export const fetcher = async <T>(url: string): Promise<T> => { ... };
```


### Step 3: 型定義の作成 (`frontend/src/types/user.ts`)

バックエンドと共有するユーザーデータの型を定義します。

1.  `frontend/src/`内に`types`ディレクトリを作成します。
2.  `frontend/src/types/`内に`user.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/types/user.ts

export interface User {
  id: string;
  university_email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string; // ISO 8601形式の文字列
  updatedAt: string; // ISO 8601形式の文字列
}
```

### Step 4: `useUser`カスタムフックの作成 (`frontend/src/hooks/useUser.ts`)

`SWR`を利用して、認証済みユーザーの情報をグローバルに管理するためのカスタムフックを作成します。

1.  `frontend/src/`内に`hooks`ディレクトリを作成します。
2.  `frontend/src/hooks/`内に`useUser.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/hooks/useUser.ts

import useSWR from 'swr';
import type { User } from '../types/user';
import { fetcher } from '../lib/api';

export const useUser = () => {
  // SWRは第一引数のキー（ここでは'/api/users/me'）を使ってリクエストをキャッシュする
  const { data, error, isLoading, mutate } = useSWR<User>('/api/users/me', fetcher);

  const isNameRegistered = data ? data.name !== null : false;
  const displayName = data ? data.name || data.university_email.split('@')[0] : 'Guest';

  return {
    user: data,
    isLoading,
    isError: error,
    isNameRegistered,
    displayName,
    mutate, // キャッシュを手動で更新するための関数
  };
};
```
*思想:* `useSWR`フックは、APIからのデータ取得、キャッシュ、再検証を自動的に行います。`useUser`フックとしてラップすることで、アプリケーション内のどのコンポーネントからでも`useUser()`を呼び出すだけで、一貫したユーザーデータにアクセスできます。`mutate`関数を返すことで、ユーザー情報が更新された際に即座にUIに反映させることが可能になります。

### Step 5: 初回登録モーダルの実装 (`frontend/src/components/ProfileModal.tsx`)

ユーザー名が未登録の場合に表示するモーダルコンポーネントを作成します。

1.  `frontend/src/`内に`components`ディレクトリを作成します。
2.  `frontend/src/components//`内に`ProfileModal.tsx`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/components/ProfileModal.tsx

import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { updateUser } from '../lib/api';

export const ProfileModal = () => {
  const { user, mutate } = useUser();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('表示名を入力してください。');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const updatedUserData = await updateUser(name);
      // SWRのキャッシュを更新してUIに即時反映させる
      mutate(updatedUserData, false); // falseは再検証を抑制するオプション
    } catch (err) {
      setError('更新に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ユーザー情報がロード中、または名前が登録済みの場合は何も表示しない
  if (!user || user.name) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>ようこそ！</h2>
        <p>他のユーザーに表示される名前を入力してください。</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 山田 太郎"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '登録中...' : '登録する'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};
```
*思想:* このコンポーネントは、`useUser`フックから取得したユーザー状態にのみ依存します。`user.name`が`null`である限り表示され続け、名前の登録が成功すると`mutate`によって`user`オブジェクトが更新されるため、自動的に非表示になります。このように、コンポーネントは自身の状態を持つのではなく、グローバルな状態（SWRキャッシュ）を信頼することで、シンプルで予測可能な動作を実現します。

### Step 6: `App.tsx`の修正

最後に、`App.tsx`で`useUser`フックを呼び出し、モーダルを表示するように設定します。

```typescript
// frontend/src/App.tsx

import { useUser } from './hooks/useUser';
import { ProfileModal } from './components/ProfileModal';
import './App.css'; // モーダル用のCSSを追記する必要がある

function App() {
  const { user, isLoading, isError, displayName } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <>
      <ProfileModal />
      
      {/* メインコンテンツ */}
      <div className={user && !user.name ? 'content-blurred' : ''}>
        <header>
          <h1>EbiYobi Calendar</h1>
          <p>ようこそ, {displayName} さん</p>
        </header>
        {/* ここにカレンダーなどのメインコンポーネントが配置される */}
      </div>
    </>
  );
}

export default App;
```
*思想:* `App.tsx`はアプリケーションの最上位コンポーネントとして、認証状態のチェックと、それに応じたUIの表示分岐（ローディング、エラー、メインコンテンツ）に責任を持ちます。`ProfileModal`は自身の表示ロジックを持つため、`App.tsx`はただ配置するだけで済みます。これにより、関心事が分離され、コードの見通しが良くなります。

# Issue #6: カレンダー機能の実装

このセクションでは、`issuse.md`の「2.2. カレンダー機能の実装」に基づき、アプリケーションの中核機能であるカレンダー画面を実装する手順を詳述します。

## 2.2.1. フロントエンド側の実装

まず、ユーザーが実際に目にするカレンダー画面から実装を進めます。

### Step 1: 依存関係のインストール

カレンダー機能を実現するために、`FullCalendar`という非常に人気のあるライブラリを使用します。以下のコマンドで、必要なパッケージを`frontend`ディレクトリにインストールします。

```bash
# frontend ディレクトリで実行
npm install @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
```
*   **思想:**
    *   `@fullcalendar/react`: ReactでFullCalendarを使うための公式コンポーネントです。
    *   `@fullcalendar/core`: FullCalendarの本体です。
    *   `@fullcalendar/daygrid`: 月表示カレンダー（`dayGridMonth`）など、グリッドベースの表示を提供します。
    *   `@fullcalendar/timegrid`: 週表示や日表示（`timeGridWeek`, `timeGridDay`）など、時間軸を持つ表示を提供します。
    *   `@fullcalendar/interaction`: カレンダー上での日付クリックやイベントドラッグなどの操作を可能にします。
    *   このように、FullCalendarは機能ごとにパッケージが分かれているため、必要なものだけをインストールすることで、アプリケーションのサイズを最適化できます。

### Step 2: カレンダーコンポーネントの作成 (`frontend/src/components/Calendar.tsx`)

カレンダーを表示するための専用コンポーネントを作成します。

1.  `frontend/src/components/`内に`Calendar.tsx`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/components/Calendar.tsx

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={`${API_BASE_URL}/api/events`}
      eventColor="#3788d8" // デフォルトのイベント色
      // TODO: イベントの種類に応じて色を変えるためのeventClassNamesプロパティなどを後で追加
      // TODO: イベントクリック時の処理をeventClickプロパティで後で追加
    />
  );
};
```
*   **思想:**
    *   **コンポーネント化:** カレンダーに関連するロジックを`Calendar.tsx`に集約することで、`App.tsx`をシンプルに保ち、コードの見通しを良くします。
    *   **プラグインシステム:** `plugins`プロパティに使用したい機能をプラグインとして渡します。これにより、FullCalendarのコア機能は軽量に保たれ、必要な機能だけを柔軟に追加できます。
    *   **宣言的なUI:** `headerToolbar`のようなプロパティに必要な設定をオブジェクトとして渡すだけで、複雑なUI（ヘッダーのボタン配置など）を簡単に構築できます。
    *   **API連携の簡潔さ:** `events`プロパティにバックエンドのAPIエンドポイントのURLを直接渡すだけで、FullCalendarが自動的にそのURLにリクエストを送信し、イベントデータを取得・表示してくれます。カレンダーの表示期間（月や週）を切り替えると、`?start=...&end=...`というクエリパラメータを付けて自動で再リクエストしてくれるため、開発者はデータ取得のロジックをほとんど意識する必要がありません。

### Step 3: `App.tsx`の修正

作成した`Calendar`コンポーネントを`App.tsx`に組み込みます。

```typescript
// frontend/src/App.tsx の `// ここにカレンダーなどのメインコンポーネントが配置される` 部分を修正

import { Calendar } from './components/Calendar'; // インポートを追加

// ... (既存のコード)

      <div className={user && !user.name ? 'content-blurred' : ''}>
        <header>
          <h1>EbiYobi Calendar</h1>
          <p>ようこそ, {displayName} さん</p>
        </header>
        <main>
          <Calendar />
        </main>
      </div>

// ... (既存のコード)
```
*   **思想:** `App.tsx`は、認証状態の管理やページ全体のレイアウトといった、より大きな関心事に集中します。カレンダーの具体的な実装は`Calendar`コンポーネントに委ねることで、関心の分離（Separation of Concerns）という設計原則を守ります。

#### Step 4: フロントエンドの動作確認

ここまでの実装で、フロントエンド側の基本的なUIとAPIへのリクエストが正しく動作するかを確認します。

1.  **開発サーバーの起動:**
    *   ターミナル②でバックエンドサーバー (`npm run dev`) を、ターミナル③でフロントエンドサーバー (`npm run dev`) をそれぞれ起動します。

2.  **ブラウザでの確認:**
    *   ブラウザで `http://localhost:5173` を開きます。

3.  **想定される動作（修正前）:**
    *   画面には「Error fetching user data.」というメッセージが表示されます。これは、ローカル環境ではIAP認証ヘッダーが存在しないため、バックエンドの`/api/users/me`へのリクエストが`401 Unauthorized`エラーとなり、フロントエンドがそれを正しくハンドリングしている証拠です。この段階ではまだカレンダーのUIは表示されません。

*   **思想:**
    *   この段階的な確認により、フロントエンドのコンポーネント構造やAPIリクエストのロジックが、バックエンドの実装に先立って正しく機能しているかを検証します。エラーが想定通りに発生することを確認するのも、開発の重要なプロセスです。

#### 補足: ローカル環境でUIを完全に表示させるための一時的な修正

認証エラーによってUIの表示がブロックされているため、カレンダーUIの見た目などを確認したい場合は、一時的にバックエンドの認証をバイパスする修正が必要です。

##### 一時的な認証バイパスの追加

**警告:** この変更はローカル開発のテストを容易にするためのものであり、セキュリティリスクを伴います。**このコードをコミットしたり、本番環境にデプロイしたりしないでください。**

以下の手順で `backend/src/middleware/auth.ts` を修正します。

1.  `iapAuthMiddleware`関数を以下のように変更し、開発環境でのみダミーの認証情報を設定するロジックを追加します。

```typescript
// backend/src/middleware/auth.ts

// ... (既存のコード)

export const iapAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // IAPから付与されるヘッダー情報を取得
  let emailHeader = req.headers['x-goog-authenticated-user-email'];

  // ==============================================================================
  // ▼▼▼【開発用の一時的な認証バイパス】▼▼▼
  // 警告: このコードブロックはローカル開発環境でのテストを容易にするためのものです。
  //       本番環境にデプロイする前には、必ずこのロジックを削除または無効化してください。
  //       このままデプロイすると、誰でも認証なしでAPIにアクセスできてしまいます。
  if (process.env.NODE_ENV !== 'production' && !emailHeader) {
    console.warn('*****************************************************');
    console.warn('* [開発用警告] IAP認証がバイパスされました。      *');
    console.warn('* ダミーユーザーで処理を続行します。              *');
    console.warn('*****************************************************');
    emailHeader = 'accounts.google.com:test-user@example.com'; // ダミーのヘッダー情報
  }
  // ▲▲▲【開発用の一時的な認証バイパス】▲▲▲
  // ==============================================================================

  // ヘッダーが存在しない場合はエラー
  if (!emailHeader) {
    return res.status(401).send('Unauthorized: Missing IAP header');
  }
  
  const email = (emailHeader as string).split(':').pop();
  if (!email) {
    return res.status(400).send('Bad Request: Invalid IAP header format');
  }

  // 許可するドメインのリストに、ダミーユーザーのドメインを一時的に追加
  const ALLOWED_DOMAINS = ['your-university.ac.jp', 'another-allowed.edu', 'example.com']; 

  const domain = email.split('@')[1];
  if (!ALLOWED_DOMAINS.includes(domain)) {
    console.warn(`Unauthorized access attempt from domain: ${domain}`);
    return res.status(403).send('Forbidden: Access denied for this organization.');
  }

  try {
    // ... (以降のユーザー検索・作成ロジックは変更なし)
  } catch (error) {
    // ...
  }
};
```

##### 認証バイパスの復元（削除）方法

動作確認が完了したら、**必ず**以下の手順で認証バイパスのコードを削除し、元の状態に戻してください。

1.  `backend/src/middleware/auth.ts`の`iapAuthMiddleware`関数を、以下のオリジナルコードに戻します。

```typescript
// backend/src/middleware/auth.ts (元の状態)

export const iapAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // IAPから付与されるヘッダー情報を取得
  const emailHeader = req.headers['x-goog-authenticated-user-email'];
  
  // ヘッダーが存在しない場合はエラー
  if (!emailHeader) {
    return res.status(401).send('Unauthorized: Missing IAP header');
  }
  
  const email = (emailHeader as string).split(':').pop();
  if (!email) {
    return res.status(400).send('Bad Request: Invalid IAP header format');
  }

  // 許可するドメインのリスト（ダミードメインを削除）
  const ALLOWED_DOMAINS = ['your-university.ac.jp', 'another-allowed.edu'];

  const domain = email.split('@')[1];
  if (!ALLOWED_DOMAINS.includes(domain)) {
    console.warn(`Unauthorized access attempt from domain: ${domain}`);
    return res.status(403).send('Forbidden: Access denied for this organization.');
  }

  try {
    let user = await prisma.user.findUnique({
      where: { university_email: email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          university_email: email,
        },
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Internal Server Error');
  }
};
```

## 2.2.2. バックエンド側の実装

次に、フロントエンドのFullCalendarにイベントデータを提供するAPIをバックエンドに実装します。

### Step 1: カレンダーイベント取得APIの作成 (`backend/src/routes/events.ts`)

カレンダーイベントに関連するAPIエンドポイントをまとめたルーターを作成します。

1.  `backend/src/routes/`内に`events.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// backend/src/routes/events.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/events - カレンダーに表示する全てのイベントを取得
router.get('/', async (req, res) => {
  // FullCalendarから送られてくるクエリパラメータを取得
  const { start, end } = req.query;

  if (typeof start !== 'string' || typeof end !== 'string') {
    return res.status(400).json({ error: 'start and end query parameters are required' });
  }

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // TODO: データベースから3種類の予定（公式講義、私的補講、個人予定）を取得するロジックを実装
    // 現時点では、動作確認のために空の配列を返す
    // "strict": true の設定のため、空配列には型注釈が必要
    const events: Record<string, any>[] = [];

    res.json(events);

  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
```
*   **思想:**
    *   **責務の分離:** ユーザー情報関連のAPIは`user.ts`、イベント関連のAPIは`events.ts`と、機能ごとにファイルを分割することで、コードの管理を容易にします。
    *   **APIのインターフェース定義:** まずはAPIが受け取るリクエスト（クエリパラメータ`start`, `end`）と、返すレスポンス（JSON配列）の型を明確に定義します。この段階では、内部の複雑なロジックは後回しにし、APIの「出入り口」を固めることに集中します。
    *   **段階的な実装:** データベースからデータを取得するロジックは複雑になりがちです。そのため、まずは空の配列を返すだけの最小限の実装を行い、APIエンドポイント自体が正しく動作することを確認します。その後、データベースとの連携という次のステップに進むことで、問題の切り分けが容易になります。

### Step 2: ルーティングの統合 (`backend/src/index.ts`)

作成したイベント用ルーターを`index.ts`に組み込みます。このAPIは認証済みのユーザーのみがアクセスできるように、既存の認証ミドルウェアを適用します。

```typescript
// backend/src/index.ts の `// --- ルーティングの設定 ---` セクションを修正

import { iapAuthMiddleware } from './middleware/auth';
import userRouter from './routes/user';
import eventRouter from './routes/events'; // インポートを追加

// ... (他の設定)

// --- ルーティングの設定 ---

app.use('/api/users', iapAuthMiddleware, userRouter);
app.use('/api/events', iapAuthMiddleware, eventRouter); // この行を追加

// ... (サーバー起動)
```
*   **思想:**
    *   **ミドルウェアの再利用:** 認証は多くのAPIで必要となる共通の関心事です。`iapAuthMiddleware`を`/api/events`にも適用することで、同じ認証ロジックを再利用し、コードの重複を防ぎます。
    *   **一貫性のあるAPI設計:** `/api/`で始まるパスにAPIエンドポイントを集約し、それぞれに適切なミドルウェアとルーターを割り当てることで、アプリケーション全体の構造に一貫性を持たせます。

### Step 3: データベースからのイベント取得ロジックの実装（詳細）

このステップは、`backend/src/routes/events.ts`の`// TODO:`コメント部分を実際に実装する、この機能で最も複雑な部分です。

*   **実装方針:**
    1.  **3つのデータソース:** `OfficialLecture`, `SupplementaryLecture`, `PersonalEvent`の3つのテーブルから、指定された期間（`startDate`から`endDate`）に該当するデータをそれぞれ取得します。
    2.  **ヘルパー関数の活用:** 「公式講義を生成するロジック」「私的補講を取得するロジック」「個人予定を取得するロジック」をそれぞれ別の非同期関数に分割します。これにより、`router.get`ハンドラ本体は各ヘルパー関数を呼び出して結果を結合するだけになり、コードが非常に読みやすくなります。
    3.  **データ形式の変換:** 各テーブルから取得したデータを、FullCalendarが要求するJSON形式（`title`, `start`, `end`, `className`など）に変換します。
    4.  **公式講義の動的生成:** `OfficialLecture`は「毎週月曜1限」のような繰り返しデータとして保存されています。これを、指定された期間内の具体的な日付のイベント（例: `2025-07-14`の1限、`2025-07-21`の1限...）に動的に変換するロジックが必要になります。その際、`LectureException`テーブルを参照し、休講日などを除外する必要があります。
    5.  **認可:** `PersonalEvent`を取得する際は、ログインしているユーザー（`req.user.id`）自身の予定のみを取得するように、`where`句に条件を追加します。

*   **思想:**
    *   **複雑性の分割:** 一つの大きな問題を、管理しやすい小さな問題（ヘルパー関数）に分割して解決します。これは、ソフトウェア開発における最も重要な原則の一つです。
    *   **データ変換層:** データベースのスキーマ構造と、APIがクライアントに返すJSONの構造は、必ずしも一致しません。データベースから取得したデータを、クライアント（この場合はFullCalendar）が最も使いやすい形式に変換する層を設けることで、フロントエンドとバックエンドの結合度を下げ、それぞれが独立して変更しやすくなります。
    *   **パフォーマンスへの配慮:** データベースへのクエリは、アプリケーションのパフォーマンスに大きな影響を与えます。必要なデータのみを効率的に取得するクエリ（`where`句の活用）を記述することが重要です。

#### Step 4: バックエンドの動作確認テスト

ここまでの実装で、バックエンドが3種類の予定を正しく集計し、FullCalendarが期待する形式で返却できるかを確認します。

##### テストの準備

1.  **テストデータの投入:**
    *   APIが返すイベント情報を確認するためには、データベースにテスト用のデータが必要です。`psql`やDBeaverのようなデータベースクライアントを使い、ローカルのPostgreSQLデータベース（`ebiyobi_dev`）に直接接続します。
    *   以下のテーブルに、カレンダーの表示期間内に収まるようなサンプルデータを数件`INSERT`しておきます。

    *   **SQL実行例:**
        以下のSQLクエリを実行することで、基本的なテストデータを投入できます。（`id`や`cuid()`は適宜調整してください）

        ```sql
        -- 前提: 認証バイパスで使われるダミーユーザーのIDを確認しておく必要があります。
        -- 'test-user@example.com' で初回アクセスした際に自動生成されるユーザーのIDを事前にSELECT文で確認してください。
        -- 例: SELECT id FROM "User" WHERE university_email = 'test-user@example.com';
        -- 以下では、そのIDが 'clx...' であったと仮定します。

        -- 学期マスタ (Term)
        INSERT INTO "Term" (id, name, "startDate", "endDate") VALUES (1, '2025年度前期', '2025-04-01T00:00:00Z', '2025-09-30T23:59:59Z') ON CONFLICT (id) DO NOTHING;

        -- 時限マスタ (PeriodSetting)
        INSERT INTO "PeriodSetting" (id, period, "startTime", "endTime") VALUES (1, 1, '09:00', '10:30') ON CONFLICT (id) DO NOTHING;
        INSERT INTO "PeriodSetting" (id, period, "startTime", "endTime") VALUES (2, 2, '10:40', '12:10') ON CONFLICT (id) DO NOTHING;

        -- 大学公式の講義 (OfficialLecture)
        -- 月曜1限: 微分積分学
        INSERT INTO "OfficialLecture" (id, name, professor, "dayOfWeek", period, "termId") VALUES (1, '微分積分学', '高木教授', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
        -- 火曜2限: 統計学
        INSERT INTO "OfficialLecture" (id, name, professor, "dayOfWeek", period, "termId") VALUES (2, '統計学', '大前教授', 2, 2, 1) ON CONFLICT (id) DO NOTHING;

        -- 私的補講 (SupplementaryLecture)
        INSERT INTO "SupplementaryLecture" (id, location, "startTime", "endTime", description, "creatorId", "officialLectureId") VALUES (1, '図書館2階', '2025-07-15T10:00:00Z', '2025-07-15T12:00:00Z', '第5回までの内容の復習会です。', 'clx...', 2) ON CONFLICT (id) DO NOTHING;

        -- 個人予定 (PersonalEvent)
        INSERT INTO "PersonalEvent" (id, title, "startTime", "endTime", description, "userId") VALUES (1, 'サークルMTG', '2025-07-16T18:00:00Z', '2025-07-16T19:00:00Z', '夏合宿の計画', 'clx...') ON CONFLICT (id) DO NOTHING;

        -- 休講情報 (LectureException)
        -- 7/14の微分積分学は休講
        INSERT INTO "LectureException" (id, "originalDate", type, "officialLectureId") VALUES (1, '2025-07-14T00:00:00Z', 'CANCELLED', 1) ON CONFLICT (id) DO NOTHING;
        ```

2.  **開発サーバーの起動:**
    *   `backend`と`frontend`の両方の開発サーバーを起動します。
    *   `backend/src/middleware/auth.ts`で、**一時的な認証バイパスが有効になっている**ことを確認してください。

##### テストの実施方法

テストには、フロントエンドを経由する方法と、APIクライアントで直接APIを叩く方法の2通りがあります。

**方法A: ブラウザを使った総合テスト（推奨）**

1.  ブラウザで`http://localhost:5173`にアクセスします。
2.  **想定される結果:**
    *   認証が成功し、名前入力モーダルが表示（または既に登録済みの場合はヘッダーに名前が表示）されます。
    *   カレンダーUI上に、**準備段階で投入したテストデータがイベントとして表示されていること**を確認します。
    *   ブラウザの開発者ツール（F12）の「ネットワーク」タブで、`/api/events?...`へのリクエストのステータスコードが`200 OK`になり、レスポンスとしてイベント情報のJSON配列が返ってきていることを確認します。

**方法B: APIクライアントツールを使った単体テスト**

1.  PostmanやInsomniaなどのAPIクライアントツールを起動します。
2.  以下のリクエストを作成して送信します。
    *   **メソッド:** `GET`
    *   **URL:** `http://localhost:3001/api/events`
    *   **ヘッダー:**
        *   `Key`: `x-goog-authenticated-user-email`
        *   `Value`: `accounts.google.com:test-user@example.com`
    *   **クエリパラメータ:**
        *   `start`: テストデータが含まれる期間の開始日時 (例: `2025-07-01T00:00:00Z`)
        *   `end`: テストデータが含まれる期間の終了日時 (例: `2025-07-31T23:59:59Z`)
3.  **想定される結果:**
    *   レスポンスのステータスコードが`200 OK`であること。
    *   レスポンスボディに、FullCalendar形式に変換されたイベント情報のJSON配列が含まれていることを確認します。

##### テスト後の復帰

*   このテストではアプリケーションコードの変更は不要です。
*   データベースに投入したテストデータは、今後の開発でも利用できるため、必ずしも削除する必要はありません。
*   **重要:** ローカルでの動作確認のために`backend/src/middleware/auth.ts`に一時的な認証バイパスを追加した場合は、テスト完了後、**必ずその変更を元に戻してください。** この作業を怠ると、深刻なセキュリティリスクを伴うコードがリポジリに残ってしまう可能性があります。

# Issue #7: 私的補講の登録・閲覧機能の実装

このセクションでは、`issuse.md`の「2.3. 私的補講の登録・閲覧機能の実装」に基づき、ユーザーが私的補講を登録し、その詳細情報を閲覧できるようにする機能の実装手順を詳述します。

## 2.3.1. 詳細閲覧機能

まず、カレンダーに表示された私的補講をクリックした際に、その詳細情報を表示するページを実装します。

### Step 1: APIの設計と実装 (`backend/src/routes/supplementaryLectures.ts`)

私的補講の詳細情報を取得するためのAPIエンドポイントをバックエンドに実装します。

1.  `backend/src/routes/`内に`supplementaryLectures.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// backend/src/routes/supplementaryLectures.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/supplementary-lectures/:id - 私的補講の詳細情報を取得
router.get('/:id', async (req, res) => {
  const lectureId = parseInt(req.params.id, 10);

  if (isNaN(lectureId)) {
    return res.status(400).json({ error: 'Invalid lecture ID' });
  }

  try {
    const lecture = await prisma.supplementaryLecture.findUnique({
      where: { id: lectureId },
      include: {
        officialLecture: true, // 関連する公式講義情報も取得
        creator: true,         // 開催者情報も取得
        attendees: true,       // 出席者数カウントのために取得
      },
    });

    if (!lecture) {
      return res.status(404).json({ error: 'Supplementary lecture not found' });
    }

    // レスポンス形式をissuse.mdに合わせて整形
    const response = {
      id: lecture.id,
      officialLectureName: lecture.officialLecture.name,
      location: lecture.location,
      startTime: lecture.startTime.toISOString(),
      endTime: lecture.endTime.toISOString(),
      description: lecture.description,
      creator: {
        id: lecture.creator.id,
        name: lecture.creator.name || lecture.creator.university_email.split('@')[0],
      },
      attendeeCount: lecture.attendees.length,
      // TODO: ログインユーザーが出席済みかどうかのフラグ (isAttending) を後で追加
    };

    res.json(response);

  } catch (error) {
    console.error('Failed to fetch supplementary lecture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
```
*   **思想:**
    *   **RESTful API:** リソース（私的補講）をIDで指定して取得する、RESTfulな設計に従います。
    *   **関連データの取得:** `Prisma`の`include`オプションを活用することで、関連する`OfficialLecture`や`User`（開催者）の情報を効率的に一度のクエリで取得できます。
    *   **データ整形:** データベースから取得した生データを、フロントエンドが利用しやすい形式に整形して返します。`issuse.md`で定義されたレスポンス形式に合わせることで、フロントエンドとの連携をスムーズにします。
    *   **エラーハンドリング:** 無効なIDや存在しないリソースに対する適切なエラーレスポンス（`400 Bad Request`, `404 Not Found`）を返します。

### Step 2: ルーティングの統合 (`backend/src/index.ts`)

作成した私的補講用ルーターを`index.ts`に組み込みます。このAPIも認証済みのユーザーのみがアクセスできるように、認証ミドルウェアを適用します。

```typescript
// backend/src/index.ts の `// --- ルーティングの設定 ---` セクションを修正

import { iapAuthMiddleware } from './middleware/auth';
import userRouter from './routes/user';
import eventRouter from './routes/events';
import supplementaryLectureRouter from './routes/supplementaryLectures'; // インポートを追加

// ... (他の設定)

// --- ルーティングの設定 ---

app.use('/api/users', iapAuthMiddleware, userRouter);
app.use('/api/events', iapAuthMiddleware, eventRouter);
app.use('/api/supplementary-lectures', iapAuthMiddleware, supplementaryLectureRouter); // この行を追加

// ... (サーバー起動)
```
*   **思想:**
    *   新しいAPIエンドポイントを既存のルーティング構造に組み込むことで、アプリケーション全体のAPI設計の一貫性を保ちます。

### Step 3: フロントエンドのルーティングと詳細ページの作成

私的補講の詳細を表示するためのページと、そこへのルーティングをフロントエンドに実装します。

1.  **ルーティングライブラリの導入:**
    *   Reactアプリケーションでルーティングを行うために、`react-router-dom`をインストールします。
    ```bash
    # frontend ディレクトリで実行
    npm install react-router-dom
    npm install -D @types/react-router-dom
    ```
    *   **思想:** `react-router-dom`は、URLに基づいて表示するコンポーネントを切り替えるための標準的なライブラリです。これにより、単一ページアプリケーション（SPA）でありながら、複数の「ページ」を持つかのように振る舞うことができます。

2.  **`App.tsx`のルーティング設定:**
    *   `App.tsx`を修正し、`BrowserRouter`と`Routes`、`Route`を使ってルーティングを設定します。
    *   `/`パスにはカレンダーを表示し、`/lectures/:id`パスには私的補講の詳細ページを表示するようにします。

```typescript
// frontend/src/App.tsx

import { useUser } from './hooks/useUser';
import { ProfileModal } from './components/ProfileModal';
import { Calendar } from './components/Calendar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // インポートを追加
import { SupplementaryLectureDetail } from './components/SupplementaryLectureDetail'; // 後で作成するコンポーネント

function App() {
  const { user, isLoading, isError, displayName } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <BrowserRouter> {/* BrowserRouterでアプリケーションをラップ */}
      <ProfileModal />
      
      <div className={user && !user.name ? 'content-blurred' : ''}>
        <header>
          <h1>EbiYobi Calendar</h1>
          <p>ようこそ, {displayName} さん</p>
        </header>
        <main>
          <Routes> {/* Routesでルーティングを定義 */}
            <Route path="/" element={<Calendar />} /> {/* ルートパスにカレンダー */}
            <Route path="/lectures/:id" element={<SupplementaryLectureDetail />} /> {/* 私的補講詳細ページ */}
            {/* TODO: 他のルートもここに追加 */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```
*   **思想:**
    *   **宣言的ルーティング:** `react-router-dom`は、コンポーネントベースでルーティングを定義できるため、Reactの思想と親和性が高いです。
    *   **動的ルーティング:** `/lectures/:id`のようにパスパラメータを使用することで、一つのコンポーネントで複数の私的補講の詳細を表示できるようになります。

3.  **私的補講詳細コンポーネントの作成 (`frontend/src/components/SupplementaryLectureDetail.tsx`)**
    *   `frontend/src/components/`内に`SupplementaryLectureDetail.tsx`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/components/SupplementaryLectureDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../lib/api';
import type { User } from '../types/user'; // User型をインポート

// 私的補講のAPIレスポンスの型定義
interface SupplementaryLectureDetailData {
  id: number;
  officialLectureName: string;
  location: string;
  startTime: string; // ISO 8601形式
  endTime: string;   // ISO 8601形式
  description: string | null;
  creator: {
    id: string;
    name: string | null;
  };
  attendeeCount: number;
  // isAttending?: boolean; // 後で追加
}

export const SupplementaryLectureDetail = () => {
  const { id } = useParams<{ id: string }>(); // URLからIDを取得

  // SWRでAPIからデータを取得
  const { data, error, isLoading } = useSWR<SupplementaryLectureDetailData>(
    id ? `/api/supplementary-lectures/${id}` : null,
    fetcher
  );

  if (isLoading) return <div>Loading supplementary lecture details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;
  if (!data) return <div>No details found.</div>;

  // 日付のフォーマット
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // ローカルタイムゾーンで表示
  };

  return (
    <div className="supplementary-lecture-detail">
      <h2>{data.officialLectureName} 補講</h2>
      <p><strong>場所:</strong> {data.location}</p>
      <p><strong>日時:</strong> {formatDateTime(data.startTime)} - {formatDateTime(data.endTime)}</p>
      {data.description && <p><strong>内容:</strong> {data.description}</p>}
      <p><strong>開催者:</strong> {data.creator.name || data.creator.id}</p>
      <p><strong>現在の出席者数:</strong> {data.attendeeCount}名</p>
      {/* TODO: 出席登録/キャンセルボタンを後で追加 */}
    </div>
  );
};
```
*   **思想:**
    *   **`useParams`:** `react-router-dom`の`useParams`フックを使って、URLのパスパラメータ（`:id`）から私的補講のIDを簡単に取得します。
    *   **`useSWR`によるデータ取得:** 認証機構の実装で学んだ`useSWR`をここでも活用し、APIから非同期にデータを取得し、ローディング状態やエラーハンドリングを簡潔に記述します。
    *   **型定義の重要性:** APIレスポンスの型を`SupplementaryLectureDetailData`として明確に定義することで、コードの安全性を高め、開発時の補完を効かせます。
    *   **日付のローカライズ:** `toLocaleString()`を使って、UTCで取得した日時をユーザーのローカルタイムゾーンで表示します。これは`issuse.md`の「日時の取り扱い」の基本設計方針に沿ったものです。

### Step 4: カレンダーイベントクリック処理の追加 (`frontend/src/components/Calendar.tsx`)

カレンダー上のイベントをクリックした際に、私的補講の詳細ページに遷移するように`Calendar.tsx`を修正します。

```typescript
// frontend/src/components/Calendar.tsx

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom'; // インポートを追加

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Calendar = () => {
  const navigate = useNavigate(); // useNavigateフックを使用

  const handleEventClick = (clickInfo: any) => {
    // 私的補講イベントの場合のみ詳細ページに遷移
    if (clickInfo.event.extendedProps.type === 'supplementary') {
      navigate(`/lectures/${clickInfo.event.id.replace('sup-', '')}`);
    }
    // TODO: 個人予定の場合は編集モーダルを表示するロジックを後で追加
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={`${API_BASE_URL}/api/events`}
      eventColor="#3788d8" // デフォルトのイベント色
      eventClick={handleEventClick} // eventClickハンドラを追加
      // TODO: イベントの種類に応じて色を変えるためのeventClassNamesプロパティなどを後で追加
    />
  );
};
```
*   **思想:**
    *   **`useNavigate`:** `react-router-dom`の`useNavigate`フックを使って、プログラム的にURLを操作し、ページ遷移を実現します。
    *   **イベントIDのパース:** FullCalendarのイベントIDは`sup-123`のような形式なので、`replace('sup-', '')`で実際のデータベースIDを抽出します。
    *   **条件分岐:** イベントの種類（`extendedProps.type`）に応じて、異なるアクション（詳細ページ遷移、モーダル表示など）を実行できるようにします。

## 2.3.2. 登録機能

ユーザーが新しい私的補講を登録するためのフォームを実装します。

### Step 1: APIの設計と実装 (`backend/src/routes/supplementaryLectures.ts`の拡張)

私的補講を登録するためのAPIエンドポイントを`supplementaryLectures.ts`に追加します。

```typescript
// backend/src/routes/supplementaryLectures.ts (既存のコードに追加)

// ... (既存のimport文、router, prismaの定義)

// POST /api/supplementary-lectures - 私的補講を登録
router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { officialLectureId, location, startTime, endTime, description } = req.body;

  // 入力値のバリデーション
  if (!officialLectureId || !location || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ error: 'End time must be after start time' });
  }

  try {
    const newLecture = await prisma.supplementaryLecture.create({
      data: {
        officialLectureId: parseInt(officialLectureId, 10),
        location,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        description,
        creatorId: req.user.id, // ログインユーザーをcreatorIdとして設定
      },
    });
    res.status(201).json(newLecture); // 201 Createdを返す

  } catch (error) {
    console.error('Failed to create supplementary lecture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
```
*   **思想:**
    *   **入力バリデーション:** APIの入口で入力値のチェックを行うことで、不正なデータがデータベースに登録されるのを防ぎます。
    *   **認証済みユーザーの利用:** `req.user.id`を使って、誰が補講を作成したかを自動的に記録します。
    *   **適切なHTTPステータスコード:** リソースの作成成功時には`201 Created`を返します。

### Step 2: フロントエンドのフォームとAPI連携

私的補講の登録フォームを作成し、バックエンドAPIと連携させます。

1.  **フォーム管理ライブラリの導入:**
    *   フォームの状態管理とバリデーションを効率的に行うために、`react-hook-form`をインストールします。
    *   日時選択UIのために、`react-datepicker`をインストールします。
    ```bash
    # frontend ディレクトリで実行
    npm install react-hook-form react-datepicker
    npm install -D @types/react-datepicker
    ```
    *   **思想:**
        *   `react-hook-form`: フォームの再レンダリングを最小限に抑え、パフォーマンスを向上させます。バリデーションルールを簡単に定義できます。
        *   `react-datepicker`: 日時入力のUI/UXを向上させます。

2.  **私的補講登録フォームコンポーネントの作成 (`frontend/src/components/SupplementaryLectureForm.tsx`)**
    *   `frontend/src/components/`内に`SupplementaryLectureForm.tsx`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/components/SupplementaryLectureForm.tsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // スタイルシートをインポート
import { useNavigate } from 'react-router-dom';
import { fetcher } from '../lib/api';
import type { OfficialLecture } from '../types/officialLecture'; // 後で作成する型定義

// フォームデータの型定義
interface SupplementaryLectureFormData {
  officialLectureId: number;
  location: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}

export const SupplementaryLectureForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SupplementaryLectureFormData>();
  const navigate = useNavigate();

  // 公式講義リストの取得
  const { data: officialLectures, error: officialLecturesError } = useSWR<OfficialLecture[]>('/api/official-lectures', fetcher);

  const [startDate, endDate] = watch(['startTime', 'endTime']); // DatePickerの制御用

  useEffect(() => {
    register('startTime', { required: '開始時間は必須です' });
    register('endTime', { required: '終了時間は必須です' });
  }, [register]);

  const onSubmit = async (data: SupplementaryLectureFormData) => {
    try {
      // 日時をISO文字列に変換して送信
      const payload = {
        ...data,
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
      };
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplementary-lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to create supplementary lecture');
      }

      navigate('/'); // 登録成功後、カレンダーページへリダイレクト
    } catch (error) {
      console.error('Error creating supplementary lecture:', error);
      alert('補講の登録に失敗しました。');
    }
  };

  if (officialLecturesError) return <div>公式講義の読み込みに失敗しました。</div>;
  if (!officialLectures) return <div>公式講義を読み込み中...</div>;

  return (
    <div className="supplementary-lecture-form">
      <h2>私的補講 登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>関連講義:</label>
          <select {...register('officialLectureId', { required: '関連講義は必須です' })}> 
            <option value="">選択してください</option>
            {officialLectures.map(lecture => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.name} ({lecture.professor})
              </option>
            ))}
          </select>
          {errors.officialLectureId && <p className="error-message">{errors.officialLectureId.message}</p>}
        </div>

        <div>
          <label>場所:</label>
          <input type="text" {...register('location', { required: '場所は必須です' })} />
          {errors.location && <p className="error-message">{errors.location.message}</p>}
        </div>

        <div>
          <label>開始日時:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setValue('startTime', date)}
            showTimeSelect
            dateFormat="yyyy/MM/dd HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            placeholderText="開始日時を選択"
          />
          {errors.startTime && <p className="error-message">{errors.startTime.message}</p>}
        </div>

        <div>
          <label>終了日時:</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setValue('endTime', date)}
            showTimeSelect
            dateFormat="yyyy/MM/dd HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            placeholderText="終了日時を選択"
            minDate={startDate} // 開始日時より前の日付は選択不可
          />
          {errors.endTime && <p className="error-message">{errors.endTime.message}</p>}
        </div>

        <div>
          <label>内容 (任意):</label>
          <textarea {...register('description')} />
        </div>

        <button type="submit">登録</button>
      </form>
    </div>
  );
};
```
*   **思想:**
    *   **`useForm`:** フォームの状態管理、入力値の取得、バリデーションを`react-hook-form`に任せることで、コード量を減らし、パフォーマンスを最適化します。
    *   **`DatePicker`:** 日時入力のUIを改善し、ユーザーフレンドリーにします。`minDate`プロパティで終了日時が開始日時より前にならないように制御します。
    *   **API連携:** フォームの送信時に、`fetch`APIを使ってバックエンドの登録APIを呼び出します。
    *   **リダイレクト:** 登録成功後、`useNavigate`を使ってカレンダーページにリダイレクトし、ユーザーに登録が完了したことを視覚的に伝えます。

#### 補足: `useSWR`のインポートエラーと解決策

`SupplementaryLectureForm.tsx`で`Uncaught ReferenceError: useSWR is not defined`というエラーが発生した場合、これは`useSWR`フックが正しくインポートされていないことを示します。

`howto.md`のコードブロックでは`import useSWR from 'swr';`が記述されていますが、何らかの理由でこのインポートが機能しない場合、以下の点を確認してください。

*   **インポート文の重複:** ファイル内に`import useSWR from 'swr';`が複数回記述されていないか確認し、もしあれば一つだけ残して他を削除してください。
*   **インポートの順序:** `import useSWR from 'swr';`の行が、ファイルの先頭付近、他の`import`文と一緒に記述されていることを確認してください。

3.  **公式講義の型定義の作成 (`frontend/src/types/officialLecture.ts`)**
    *   `frontend/src/types/`内に`officialLecture.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// frontend/src/types/officialLecture.ts

export interface OfficialLecture {
  id: number;
  name: string;
  professor: string;
  dayOfWeek: number;
  period: number;
  termId: number;
}
```

4.  **`App.tsx`のルーティング設定の拡張:**
    *   私的補講登録フォームへのルートを追加します。

```typescript
// frontend/src/App.tsx (既存のRoutesに追加)

import { SupplementaryLectureForm } from './components/SupplementaryLectureForm'; // インポートを追加

// ... (既存のRoutes)

          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/lectures/:id" element={<SupplementaryLectureDetail />} />
            <Route path="/lectures/new" element={<SupplementaryLectureForm />} /> {/* この行を追加 */}
          </Routes>

// ... (既存のコード)
```

### Step 3: 公式講義リスト取得APIの作成 (`backend/src/routes/officialLectures.ts`)

私的補講登録フォームで公式講義を選択できるように、公式講義のリストを返すAPIをバックエンドに実装します。

1.  `backend/src/routes/`内に`officialLectures.ts`ファイルを作成し、以下の内容を記述します。

```typescript
// backend/src/routes/officialLectures.ts

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/official-lectures - 全ての公式講義リストを取得
router.get('/', async (req, res) => {
  try {
    const lectures = await prisma.officialLecture.findMany({
      orderBy: {
        name: 'asc', // 名前順でソート
      },
    });
    res.json(lectures);
  } catch (error) {
    console.error('Failed to fetch official lectures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
```
*   **思想:**
    *   **シンプルさ:** 登録フォームが必要とする最小限のデータ（ID、名前、教授）を返すシンプルなAPIです。

2.  **ルーティングの統合 (`backend/src/index.ts`の拡張)**
    *   作成した公式講義用ルーターを`index.ts`に組み込みます。

```typescript
// backend/src/index.ts の `// --- ルーティングの設定 ---` セクションを修正

import { iapAuthMiddleware } from './middleware/auth';
import userRouter from './routes/user';
import eventRouter from './routes/events';
import supplementaryLectureRouter from './routes/supplementaryLectures';
import officialLectureRouter from './routes/officialLectures'; // インポートを追加

// ... (他の設定)

// --- ルーティングの設定 ---

app.use('/api/users', iapAuthMiddleware, userRouter);
app.use('/api/events', iapAuthMiddleware, eventRouter);
app.use('/api/supplementary-lectures', iapAuthMiddleware, supplementaryLectureRouter);
app.use('/api/official-lectures', iapAuthMiddleware, officialLectureRouter); // この行を追加

// ... (サーバー起動)
```

## テストの実施方法

### 2.3.1. 詳細閲覧機能のテスト

1.  **テストデータの準備:**
    *   データベースに、表示したい私的補講のテストデータ（`SupplementaryLecture`テーブル）が投入されていることを確認します。
    *   `OfficialLecture`テーブルにも関連するデータが必要です。
    *   `howto.md`の「2.2.2. バックエンド側の実装」のテストデータ投入例を参考にしてください。

2.  **開発サーバーの起動:**
    *   `backend`と`frontend`の両方の開発サーバーを起動します。
    *   `backend/src/middleware/auth.ts`で、一時的な認証バイパスが有効になっていることを確認してください。

3.  **テストの実施:**
    *   ブラウザで`http://localhost:5173`にアクセスし、カレンダーが表示されることを確認します。
    *   カレンダー上の私的補講イベント（`className: 'event-supplementary'`）をクリックします。
    *   **想定される結果:**
        *   URLが`/lectures/<補講ID>`に変わり、私的補講の詳細情報が表示されること。
        *   表示される情報がデータベースのデータと一致していること。
        *   開発者ツールのネットワークタブで、`/api/supplementary-lectures/<ID>`へのリクエストが`200 OK`で成功していること。

### 2.3.2. 登録機能のテスト

1.  **開発サーバーの起動:**
    *   `backend`と`frontend`の両方の開発サーバーを起動します。
    *   `backend/src/middleware/auth.ts`で、一時的な認証バイパスが有効になっていることを確認してください。

2.  **テストの実施:**
    *   ブラウザで`http://localhost:5173/lectures/new`にアクセスします。
    *   **想定される結果:**
        *   私的補講登録フォームが表示されること。
        *   「関連講義」のプルダウンに、データベースに登録されている公式講義のリストが表示されること。
        *   フォームに必要事項を入力し、「登録」ボタンをクリックします。
        *   入力値のバリデーションが正しく機能すること（例: 必須項目が空の場合にエラーメッセージが表示される）。
        *   登録成功後、カレンダーページ（`/`）にリダイレクトされること。
        *   開発者ツールのネットワークタブで、`POST /api/supplementary-lectures`へのリクエストが`201 Created`で成功していること。
        *   データベースの`SupplementaryLecture`テーブルに新しいレコードが追加されていること（DBeaverなどで確認）。
        *   カレンダーを再表示すると、新しく登録した補講がカレンダーに表示されること。
