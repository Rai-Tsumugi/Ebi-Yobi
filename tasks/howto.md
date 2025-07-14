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
import { User } from '../types/user';
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
2.  `frontend/src/components/`内に`ProfileModal.tsx`ファイルを作成します。
    （ここでは簡易的な実装を示します。実際には`Headless UI`などのライブラリを使うとより良いでしょう）

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
