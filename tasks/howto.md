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

