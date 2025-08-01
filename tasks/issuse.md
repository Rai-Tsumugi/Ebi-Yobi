# EbiYobi 開発工程書

本文書は、当該プロジェクトを効率的かつ確実に遂行するための開発工程を定義するものである。

## 0. 基本設計方針

- **日時の取り扱い**: システム内で扱う日時は、全て**UTC（協定世界時）**を基準とする。クライアントでの表示はローカルタイムゾーンに変換し、サーバーへの送信時はUTCに変換すること。

## 1. 基盤構築および準備工程

- **目的**: 開発環境の均一性を確保し、プロジェクトの基本構造を確立すること

### 1.1. プロジェクト管理システムの構成

- **リポジトリ**: フロントエンドとバックエンドのソースコードは、単一のGitHubリポジトリ（モノレポ）で管理する。
- **ブランチ戦略**: Git-flowを基本とした以下のブランチモデルを採用する。
    - **`main`**: 本番環境にデプロイされる安定版のソースコードを格納するブランチ。直接のコミットは禁止し、`develop`ブランチからのマージのみを許可する。
    - **`develop`**: 次期リリースに向けた開発の統合ブランチ。開発が完了した`feature`ブランチは、このブランチにマージされる。
    - **`feature/`**: 個別の機能開発やバグ修正を行う作業ブランチ。`develop`ブランチから分岐させ、作業完了後は`develop`ブランチへのプルリクエストを作成する。
        - **命名規則**: `feature/issue番号-機能名` (例: `feature/12-login-page`)
- **Issue管理**: 全ての開発タスクはGitHub Issuesで管理する。以下のテンプレートとラベルを用いて、タスクの内容と状態を明確にする。
- **コミットメッセージ**: `feat:`, `fix:`, `docs:`, `refactor:` などのプレフィックスを付け、変更内容を分かりやすく記述する（[Conventional Commits](https://www.conventionalcommits.org/)仕様を推奨）。

#### 1.1.1. Issueテンプレート

リポジトリの`.github/ISSUE_TEMPLATE`ディレクトリに、以下の3種類のテンプレートを配置する。

- **Bug Report**: バグ報告用
- **Feature Request**: 機能要望・提案用
- **Task**: 上記以外の開発タスク用

#### 1.1.2. ラベル一覧

Issueの分類には、以下のラベルを使用する。

- **種別 (Type)**
  - `Type: Bug`: バグ
  - `Type: Feature`: 新機能
  - `Type: Enhancement`: 既存機能の改善
  - `Type: Task`: 上記以外のタスク（リファクタリング、ドキュメント作成など）
- **担当領域 (Scope)**
  - `Scope: Frontend`: フロントエンドに関するタスク
  - `Scope: Backend`: バックエンドに関するタスク
  - `Scope: Infra`: インフラ（CI/CD, Docker, GCP設定など）に関するタスク
  - `Scope: Docs`: ドキュメントに関するタスク
- **優先度 (Priority)**
  - `Priority: High`: 緊急度・重要度が高い
  - `Priority: Medium`: 通常の優先度
  - `Priority: Low`: 緊急度が低い
- **状態 (Status)**
  - `Status: Good First Issue`: 初めてコントリビュートする人向けのタスク
  - `Status: Help Wanted`: 協力者を求めているタスク
  - `Status: Blocked`: 他のタスクに依存しており、進行できない状態

### 1.2. ローカル開発環境の構築

ローカルマシン上で開発を行うための統一された環境構築手順を以下に定める。

#### 1.2.1. 前提条件

開発を開始する前に、以下のツールがインストールされていること。

- Git
- Node.js (LTS版を推奨)
- Docker Desktop

#### 1.2.2. セットアップ手順

**Step 1: プロジェクトのクローン**

```bash
# GitHubからリポジトリをクローン
git clone <リポジトリのURL> ebi-yobi

# プロジェクトディレクトリに移動
cd ebi-yobi
```

**Step 2: データベースの起動 (Docker)**

プロジェクトのルートディレクトリに、以下の内容で`docker-compose.yml`ファイルを作成する。

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

ファイル作成後、以下のコマンドでデータベースコンテナを起動する。

```bash
docker-compose up -d
```

**Step 3: バックエンドのセットアップ**

1.  バックエンドディレクトリに移動し、必要なパッケージをインストールする。
    ```bash
    cd backend
    npm install
    ```

2.  `backend`ディレクトリ直下に`.env`ファイルを作成し、データベースへの接続情報を記述する。
    ```
    # .env
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/ebiyobi_dev"
    ```

3.  Prismaスキーマを基に、データベースのテーブルを作成する。
    ```bash
    npx prisma migrate dev
    ```
    （初回以降、`prisma/schema.prisma`に変更があった場合もこのコマンドを実行する）

**Step 4: フロントエンドのセットアップ**

1.  フロントエンドディレクトリに移動し、必要なパッケージをインストールする。
    ```bash
    # ルートディレクトリに戻ってから移動
    cd ../frontend
    npm install
    ```

2.  `frontend`ディレクトリ直下に`.env.development`ファイルを作成し、バックエンドAPIのURLを指定する。
    ```
    # .env.development
    VITE_API_BASE_URL=http://localhost:3001
    ```
    （バックエンドをデフォルトの3001ポートで起動する場合）

#### 1.2.3. 開発サーバーの起動

全てのセットアップが完了したら、以下のコマンドで各開発サーバーを起動する。

- **ターミナル① (ルート):** `docker-compose up`
- **ターミナル② (backend):** `npm run dev`
- **ターミナル③ (frontend):** `npm run dev`

ブラウザで `http://localhost:5173` (Viteのデフォルト) にアクセスし、アプリケーションが表示されることを確認する。

### 1.3. CI/CDパイプラインの構築

GitHubリポジトリへのプッシュをトリガーとして、VercelおよびGoogle Cloudへ自動的にデプロイされるCI/CDパイプラインを構築する。

#### 1.3.1. デプロイ戦略

- **ステージング環境**: `develop`ブランチにマージされると、ステージング環境へ自動でデプロイされる。機能の事前確認やテストに使用する。
- **本番環境**: `main`ブランチにマージされると、本番環境へ自動でデプロイされる。ユーザーが実際に利用する環境となる。

#### 1.3.2. フロントエンド (Vercel)

Vercelのダッシュボード上でGitHubリポジトリを連携し、以下の設定を行う。

- **プロジェクト設定**:
  - **Framework Preset**: `Vite`
  - **Root Directory**: `frontend`
- **環境変数 (Environment Variables)**:
  - **Production (`main`ブランチ)**:
    - `VITE_API_BASE_URL`: 本番バックエンドのURL (例: `https://ebiyobi-backend-prod.a.run.app`)
  - **Preview (`develop`ブランチなど)**:
    - `VITE_API_BASE_URL`: ステージングバックエンドのURL (例: `https://ebiyobi-backend-staging.a.run.app`)

#### 1.3.3. バックエンド (Google Cloud Run)

Google Cloud Buildを利用して、GitHubリポジトリの変更を検知しCloud Runへデプロイする。

- **Cloud Build トリガー**: `main`用と`develop`用の2つのトリガーを作成する。
  - **イベント**: 特定ブランチへのプッシュ
  - **ソース**: GitHubリポジトリと対象ブランチ (`main` or `develop`)
  - **ビルド構成**: `backend`ディレクトリ内の`Dockerfile`を指定
- **Cloud Run サービス**: 本番用とステージング用の2つのサービスを作成する。
  - **ソース**: 上記Cloud Buildトリガーによってビルドされたコンテナイメージ
  - **環境変数**:
    - `DATABASE_URL`: 対応するCloud SQLインスタンスの接続文字列
    - `CORS_ORIGIN`: 対応するVercelフロントエンドのURL (Production/Preview)
  - **ネットワーク**: Cloud SQLに接続するためのVPCコネクタを設定

#### 1.3.4. データベース (Google Cloud SQL)

- 本番用とステージング用の2つのPostgreSQLインスタンスを作成する。
- **接続**: プライベートIPを有効化し、Cloud Runからの安全な接続を確立する。パブリックIPは無効化し、外部からの直接アクセスを防止する。

#### 1.3.5. 認証 (Google IAP)

Cloud Runで稼働するバックエンドAPIを保護するため、Identity-Aware Proxy (IAP) を設定する。

1. Google Cloudコンソールで、対象のCloud Runサービスに対してIAPを有効化する。
2. IAM設定ページで、アクセスを許可したいGoogleアカウントまたはGoogleグループに対し、「IAP-secured Web App User」ロールを付与する。

### 1.4. データベースの初期構成

データベースの構造は、`backend/prisma/schema.prisma`ファイルで一元的に定義する。このファイルがデータベーススキーマの唯一の信頼できる情報源（Single Source of Truth）となる。

#### 1.4.1. Prismaスキーマ定義

`backend/prisma/schema.prisma`に以下の内容を記述する。

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

// ユーザー
model User {
  id                      String                           @id @default(cuid())
  university_email        String                           @unique
  name                    String?                          // 初回ログイン時はNULL
  role                    Role                             @default(USER)
  createdAt               DateTime                         @default(now())
  updatedAt               DateTime                         @updatedAt

  // Relations
  createdSupplementaryLectures SupplementaryLecture[]
  personalEvents               PersonalEvent[]
  attendances                  SupplementaryLectureAttendance[]
  requests                     SupplementaryLectureRequest[]
}

// 大学公式の講義
model OfficialLecture {
  id          Int      @id @default(autoincrement())
  name        String
  professor   String
  dayOfWeek   Int // 曜日 (例: 1=月, 2=火)
  period      Int // 時限 (例: 1=1限)
  termId      Int

  // Relations
  term                  Term                           @relation(fields: [termId], references: [id], onDelete: Cascade)
  supplementaryLectures SupplementaryLecture[]
  requests              SupplementaryLectureRequest[]
  exceptions            LectureException[]
}

// 私的補講
model SupplementaryLecture {
  id                Int      @id @default(autoincrement())
  location          String
  startTime         DateTime
  endTime           DateTime
  description       String?
  createdAt         DateTime @default(now())

  // Relations
  creator           User                           @relation(fields: [creatorId], references: [id], onDelete: Cascade)
  creatorId         String
  officialLecture   OfficialLecture                @relation(fields: [officialLectureId], references: [id], onDelete: Restrict) // 関連する公式講義が消えたらエラー
  officialLectureId Int
  attendees         SupplementaryLectureAttendance[]
}

// 個人予定
model PersonalEvent {
  id          Int      @id @default(autoincrement())
  title       String
  startTime   DateTime
  endTime     DateTime
  description String?

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
}

// 補講への出席登録（中間テーブル）
model SupplementaryLectureAttendance {
  // Relations
  user                   User                 @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId                 String
  supplementaryLecture   SupplementaryLecture @relation(fields: [supplementaryLectureId], references: [id], onDelete: Cascade)
  supplementaryLectureId Int

  @@id([userId, supplementaryLectureId])
}

// 補講の開催希望（中間テーブル）
model SupplementaryLectureRequest {
  // Relations
  user              User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId            String
  officialLecture   OfficialLecture @relation(fields: [officialLectureId], references: [id], onDelete: Restrict) // 関連する公式講義が消えたらエラー
  officialLectureId Int

  @@id([userId, officialLectureId])
}

// 学期マスタ
model Term {
  id        Int      @id @default(autoincrement())
  name      String   // 例: "2025年度前期"
  startDate DateTime
  endDate   DateTime

  // Relations
  lectures  OfficialLecture[]
}

// 時限マスタ
model PeriodSetting {
  id        Int      @id
  period    Int      @unique
  startTime String   // "HH:mm"
  endTime   String   // "HH:mm"
}

// 講義の例外日（休講・補講日など）
model LectureException {
  id                Int      @id @default(autoincrement())
  originalDate      DateTime // 本来の講義日
  type              String   // "CANCELLED" (休講), "MOVED" (日程変更)
  newDate           DateTime? // 変更後の日付 (MOVEDの場合)
  description       String?

  // Relations
  officialLecture   OfficialLecture @relation(fields: [officialLectureId], references: [id], onDelete: Cascade)
  officialLectureId Int
}
```

#### 1.4.2. マイグレーションの実行

ローカル開発環境で`schema.prisma`ファイルを変更した後は、必ず以下のコマンドを実行し、変更内容をデータベースに適用するためのマイグレーションファイルを作成・実行する。

```bash
# backendディレクトリで実行
npx prisma migrate dev --name <マイグレーションの概要>
# 例: npx prisma migrate dev --name add-user-model
```

#### 1.4.3. 本番データベースの準備

- Google Cloud SQL for PostgreSQL を使用し、本番用(`production`)とステージング用(`staging`)のデータベースインスタンスをそれぞれ作成する。
- 本番環境へのマイグレーション適用は、CI/CDパイプライン経由で安全に実行する計画とする。

---

## 2. 中核的機能の実装（MVP開発）

- **目的**: 限定的ながらも実用可能な製品バージョン（Minimum Viable Product）を完成させること

### 2.1. 認証機構の実装

Google IAP (Identity-Aware Proxy) を利用して、学内Googleアカウントを持つユーザーのみがアクセスできる認証機構を構築する。

**認証フローの概要:**
1.  フロントエンドからIAPで保護されたバックエンドAPI（例: `/api/users/me`）にリクエストを送信する。
2.  ユーザーが未認証の場合、IAPがGoogleのログインページに自動的にリダイレクトする。
3.  ログイン成功後、IAPはリクエストヘッダーにユーザー情報（メールアドレス等）を付与してバックエンドにリクエストを転送する。
4.  バックエンドはヘッダー情報を基にユーザーを識別し、処理を行う。

#### 2.1.1. バックエンド側のタスク

- **ユーザー情報取得ミドルウェアの実装:**
    - 全てのリクエストに対して、IAPが付与するヘッダー (`X-Goog-Authenticated-User-Email`) を検証するExpressミドルウェアを作成する。
    - **（追記）組織ドメインによるアクセス制限:** IAPから取得したメールアドレスのドメインが、許可された組織のドメインリストに含まれるか検証する。含まれない場合は、`403 Forbidden`などの適切なエラーを返してアクセスを拒否する。この実装は、ユーザー情報をデータベースに登録する前に実施する。
    - ヘッダーから取得したメールアドレスを使い、`users`テーブルを検索または新規作成する。
    - 取得または作成したユーザー情報を、後続の処理で利用できるよう`request`オブジェクトに格納する。

- **認証状態確認APIの実装:**
    - `GET /api/users/me` エンドポイントを実装する。
    - ログインユーザーの情報を返すが、`name`が`null`の場合は、フロントエンド側で追加の登録フローが必要であることを示すフラグも同時に返す。

- **ユーザー情報更新APIの実装:**
    - `PUT /api/users/me` エンドポイントを実装する。
    - ユーザーが表示名 (`name`) を登録・更新するために使用する。

#### 2.1.2. フロントエンド側のタスク

- **認証状態のグローバル管理:**
    - `/api/users/me` を呼び出すカスタムフック (`useUser`) を作成する。
    - APIのレスポンスを基に、ユーザーのログイン状態と、**名前が未登録である状態**を管理する。
    - ユーザー名が`null`の場合は、UI表示用にメールアドレスの`@`より前の部分を仮名として使用するヘルパー関数を実装する。

- **初回登録フローの実装:**
    - `useUser`フックで名前が未登録であることを検知した場合、アプリケーションのメインコンテンツを覆う形で「表示名を入力してください」というモーダルを表示する。
    - このモーダルは、ユーザーが名前を登録するまで閉じられない仕様とする。
    - ユーザーが名前を入力して送信すると、`PUT /api/users/me`を呼び出して登録し、モーダルを閉じる。

- **ログイン・ログアウト処理:** (変更なし)

### 2.2. カレンダー機能の実装

中核機能であるカレンダー画面を実装する。フロントエンドには`FullCalendar`ライブラリを導入し、バックエンドはカレンダーに表示する全ての予定を返すAPIを提供する。

#### 2.2.1. フロントエンド側のタスク

- **ライブラリの導入**:
  - 以下のFullCalendar関連パッケージをインストールする。
    ```bash
    npm install @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
    ```

- **カレンダーコンポーネントの実装**:
  - FullCalendarを描画するReactコンポーネントを作成する。
  - バックエンドAPI (`GET /api/events`) をデータソースとして指定する。FullCalendarの`events`プロパティにAPIエンドポイントを渡すことで、カレンダーの表示期間が変更されるたびに自動でデータが再取得されるように設定する。
  - イベントの種類 (`type`) に応じて、イベントの色が変化するようにCSSクラスを動的に割り当てる。

- **イベントクリック処理**:
  - カレンダー上のイベントがクリックされた際に、そのイベントの詳細ページ（補講の場合）または編集モーダル（個人予定の場合）に遷移・表示するための`eventClick`ハンドラを実装する。

#### 2.2.2. バックエンド側のタスク

- **カレンダーイベント取得APIの実装**:
  - `GET /api/events` エンドポイントを実装する。
  - このAPIは、指定された期間内の「私的補講」「個人予定」「大学公式の講義」の3種類の予定を全て取得し、FullCalendarが解釈可能な形式のJSON配列として返す。

- **API仕様**:
  - **リクエスト**: FullCalendarから自動で送信される以下のクエリパラメータを受け取る。
    - `start`: 表示期間の開始日時 (ISO 8601形式)
    - `end`: 表示期間の終了日時 (ISO 8601形式)
    - 例: `GET /api/events?start=2025-07-01T00:00:00Z&end=2025-07-31T23:59:59Z`

  - **レスポンス**: 以下の形式のJSON配列を返す。
    ```json
    [
      {
        "id": "sup-8", // 種類とIDを組み合わせたユニークなID
        "title": "統計学 補講",
        "start": "2025-07-15T10:00:00Z",
        "end": "2025-07-15T12:00:00Z",
        "className": "event-supplementary", // CSSでの色分け用
        "extendedProps": { // カスタムデータ
          "type": "supplementary",
          "creatorName": "Taro Yamada",
          "location": "図書館2階"
        }
      },
      {
        "id": "per-15",
        "title": "サークルMTG",
        "start": "2025-07-16T18:00:00Z",
        "end": "2025-07-16T19:00:00Z",
        "className": "event-personal"
      },
      {
        "id": "off-1-20250714", // 公式講義は日付を含めてユニーク化
        "title": "微分積分学",
        "start": "2025-07-14T09:00:00Z", // 曜と時限から計算
        "end": "2025-07-14T10:30:00Z",
        "className": "event-official",
        "display": "background" // 背景イベントとして表示
      }
    ]
    ```

- **実装ロジック**: 
  - 可読性とテスト容易性のため、ロジックを「公式講義の生成」「私的補講の取得」「個人予定の取得」などの責務ごとにヘルパー関数へ分割する。
  - リクエストで受け取った`start`と`end`の期間を基に、各テーブルから予定を検索する。
  - **公式講義の動的生成**: `Term`（学期）テーブルで指定された期間内で、`OfficialLecture`の`dayOfWeek`と`PeriodSetting`（時限マスタ）の時間を基に講義イベントを生成する。その際、`LectureException`（例外日）テーブルを参照し、休講や日程変更を正しくカレンダーに反映させる。

### 2.3. 私的補講の登録・閲覧機能の実装

ユーザーが私的補講を登録し、その詳細情報を閲覧できるようにする。カレンダー上のイベント描画は2.2で実装済みのため、ここでは登録フォームと詳細ページの機能に焦点を当てる。

#### 2.3.1. 詳細閲覧機能

- **フロントエンド側のタスク**:
  - **動的ルーティング**: `/lectures/[id]` のような動的ルートを持つ詳細ページを作成する。
  - **データ取得**: `SWR`または`React Query`を使用し、`GET /api/supplementary-lectures/:id` エンドポイントから補講の詳細データを取得して表示する。
  - **画面表示**: `base.md`の設計に基づき、講義名、日時、場所、担当者名、内容、現在の出席者数を表示する。

- **バックエンド側のタスク**:
  - **API実装**: `GET /api/supplementary-lectures/:id` エンドポイントを実装する。
  - **ロジック**: パスパラメータで受け取った`id`を基に、`supplementary_lectures`テーブルを検索する。関連する`users`テーブルから開催者名を取得し、`supplementary_lecture_attendances`テーブルから現在の出席者数をカウントして、まとめてJSON形式で返す。
  - **レスポンス例**:
    ```json
    {
      "id": 8,
      "officialLectureName": "統計学",
      "location": "図書館2階",
      "startTime": "2025-07-15T10:00:00Z",
      "endTime": "2025-07-15T12:00:00Z",
      "description": "第5回までの内容の復習会です。",
      "creator": {
        "id": "user-cuid-123",
        "name": "Taro Yamada"
      },
      "attendeeCount": 5
    }
    ```

#### 2.3.2. 登録機能

- **フロントエンド側のタスク**:
  - **ライブラリ導入**: フォーム管理と日時選択のために、ライブラリをインストールする。
    ```bash
    npm install react-hook-form react-datepicker
    ```
  - **フォーム画面作成**: `/lectures/new` のようなパスに、補講登録フォーム画面を作成する。
    - **関連講義**: `GET /api/official-lectures` (別途実装) から取得した公式講義リストをプルダウンで表示する。
    - **日時入力**: `react-datepicker`を導入し、直感的な日時入力を可能にする。
  - **入力値の管理と検証**: `React Hook Form` を使用して、フォームの状態管理とバリデーション（必須項目チェック、終了日時が開始日時より後であることなど）を実装する。
  - **データ送信**: フォーム送信時、`POST /api/supplementary-lectures` へ入力データを送信する。登録成功後はカレンダーページへリダイレクトし、表示を更新させる。

- **バックエンド側のタスク**:
  - **API実装**: `POST /api/supplementary-lectures` エンドポイントを実装する。
  - **ロジック**: リクエストボディのバリデーションを行う。認証ミドルウェアから取得したログインユーザーのIDを`creatorId`として使用し、`supplementary_lectures`テーブルに新しいレコードを作成する。成功した場合はステータスコード`201 Created`と作成されたリソースを返す。
  - **リクエストボディ (期待値)**:
    ```json
    {
      "officialLectureId": 1,
      "location": "図書館2階",
      "startTime": "2025-07-15T10:00:00Z",
      "endTime": "2025-07-15T12:00:00Z",
      "description": "第5回までの内容の復習会です。"
    }
    ```

### 2.4. 私的補講への出席登録機能の実装

私的補講の詳細ページに、ユーザーが出席登録およびキャンセルを行える機能を実装する。

#### 2.4.1. フロントエンド側のタスク

- **UIの実装**:
  - 補講詳細ページに「出席する」「出席をキャンセルする」ボタンを配置する。
  - ログインユーザー自身の出席状況 (`isAttending`) に応じて、表示するボタンを条件分岐で切り替える。

- **楽観的UI更新の実装**:
  - `SWR`や`React Query`のmutation機能を利用して、ユーザー体験を向上させる。
  - ボタンクリック時、APIリクエストを送信すると同時に、即座にUI（ボタンの表示、出席者数）を更新する。
  - APIリクエストが失敗した場合は、UIを元の状態に戻し、エラーメッセージを表示する。

- **データフロー**:
  1.  ページ表示時: `GET /api/supplementary-lectures/:id` を呼び出し、補講情報とログインユーザーの出席状況 (`isAttending`) を取得する。
  2.  「出席する」ボタンクリック時: `POST /api/supplementary-lectures/:id/attendees` を呼び出す。
  3.  「出席をキャンセルする」ボタンクリック時: `DELETE /api/supplementary-lectures/:id/attendees` を呼び出す。

#### 2.4.2. バックエンド側のタスク

- **詳細情報取得APIの拡張**:
  - `GET /api/supplementary-lectures/:id` のロジックを修正する。
  - レスポンスに、ログイン中のユーザーがその補講に出席登録済みかを示す真偽値 `isAttending` を含めるようにする。
  - **レスポンス例 (拡張後)**:
    ```json
    {
      "id": 8,
      // ... (他の補講情報)
      "attendeeCount": 5,
      "isAttending": true // ログインユーザーが出席済みか
    }
    ```

- **出席登録APIの実装**:
  - `POST /api/supplementary-lectures/:id/attendees` エンドポイントを実装する。
  - 認証ミドルウェアから取得した`userId`と、パスパラメータの`supplementaryLectureId`を使い、`supplementary_lecture_attendances`テーブルに新しいレコードを作成する。
  - 既に出席済みの場合や、自身の補講への登録など、不正なリクエストはエラーとして処理する。

- **出席キャンセルAPIの実装**:
  - `DELETE /api/supplementary-lectures/:id/attendees` エンドポイントを実装する。
  - 認証ミドルウェアから取得した`userId`と、パスパラメータの`supplementaryLectureId`に一致するレコードを`supplementary_lecture_attendances`テーブルから削除する。

---

## 3. 拡張機能開発および公開準備

- **目的**: MVPへの機能追加を完了し、正式公開に向けた最終準備を遂行すること

### 3.1. 拡張機能の実装

MVPの機能に加え、アプリケーションの利便性を高めるための拡張機能を実装する。

#### 3.1.1. 個人予定のCRUD機能

ユーザーが自身のプライベートな予定をカレンダー上で管理できるようにする。操作はページ遷移を伴わないモーダルウィンドウで完結させる。

- **UI/UX方針**:
  - カレンダーの日付部分クリック、または「個人予定を追加」ボタン押下で、予定作成用のモーダルを表示する。
  - カレンダー上の個人予定イベントをクリックすると、既存の予定を編集・削除するためのモーダルを表示する。

- **フロントエンド側のタスク**:
  - **ライブラリ導入**: `Headless UI`や`Radix UI`などのライブラリを利用して、アクセシビリティの高いモーダルコンポーネントを実装する。
  - **フォーム実装**: `React Hook Form`を使用し、予定のタイトル、開始・終了日時、詳細を入力するフォームをモーダル内に作成する。
  - **API連携**:
    - **作成 (Create)**: フォーム送信時に`POST /api/personal-events`を呼び出す。
    - **更新 (Update)**: 編集フォーム送信時に`PUT /api/personal-events/:id`を呼び出す。
    - **削除 (Delete)**: モーダル内の削除ボタン押下時に`DELETE /api/personal-events/:id`を呼び出す。
  - **状態管理**: APIリクエスト成功後、`SWR`や`React Query`のキャッシュを再検証し、カレンダー表示を自動で更新する。

- **バックエンド側のタスク**:
  - **CRUD APIの実装**:
    - `POST /api/personal-events`: 新しい個人予定を作成する。
    - `PUT /api/personal-events/:id`: 指定されたIDの個人予定を更新する。
    - `DELETE /api/personal-events/:id`: 指定されたIDの個人予定を削除する。
  - **認可ロジック**: 全てのAPIにおいて、操作対象の個人予定の`userId`が、現在ログインしているユーザーのIDと一致することを必ず検証する。一致しない場合は`403 Forbidden`エラーを返す。

#### 3.1.2. 補講開催希望とランキング機能

学生がどの公式講義の補講を求めているかを可視化し、補講開催を促進する。

- **UI/UX方針**:
  - **希望登録**: カレンダー上の公式講義イベントの詳細表示内、または別途作成する公式講義一覧ページに「補講を希望する」ボタンを設置する。ボタンはユーザーの登録状況に応じて「希望する」「希望を取り消す」に変化させる。
  - **ランキング**: メイン画面のサイドパネルに、希望者数の多い順で公式講義名と希望者数をリスト表示する。

- **フロントエンド側のタスク**:
  - **UI実装**: 上記方針に基づき、希望登録ボタンとランキング表示エリアをコンポーネントとして実装する。
  - **API連携**:
    - **希望登録/取消**: ボタンクリック時に`POST /api/official-lectures/:id/requests`または`DELETE /api/official-lectures/:id/requests`を呼び出す。楽観的UI更新を適用する。
    - **ランキング取得**: `GET /api/lecture-requests/ranking`を呼び出し、取得したデータをランキングエリアに表示する。

- **バックエンド側のタスク**:
  - **希望登録/取消APIの実装**:
    - `POST /api/official-lectures/:id/requests`: ログインユーザーIDと講義IDを`supplementary_lecture_requests`テーブルに記録する。
    - `DELETE /api/official-lectures/:id/requests`: 対応するレコードを削除する。
  - **ランキング集計APIの実装**:
    - `GET /api/lecture-requests/ranking`エンドポイントを実装する。
    - **ロジック**: `supplementary_lecture_requests`テーブルを`official_lecture_id`でグループ化してカウントし、`official_lectures`テーブルと結合して講義名を取得する。結果を希望者数の降順でソートし、上位10件などを返す。
    - **レスポンス例**:
      ```json
      [
        { "officialLectureId": 5, "lectureName": "線形代数学", "requestCount": 12 },
        { "officialLectureId": 2, "lectureName": "統計学", "requestCount": 9 },
        { "officialLectureId": 1, "lectureName": "微分積分学", "requestCount": 7 }
      ]
      ```

#### 3.1.3. 管理者向けCSV一括インポート機能

管理者ユーザーが、大学公式の講義データをCSVファイルを用いて一括でデータベースに登録できるようにする。

- **前提**: `users`テーブルの`role`が`ADMIN`のユーザーのみがアクセス可能。

- **UI/UX方針**:
  - `/admin`などの管理者専用ページに、CSVファイル選択フィールドと「インポート実行」ボタンを設置する。
  - 処理結果（成功件数、エラー情報など）をフィードバックする表示エリアを設ける。

- **フロントエンド側のタスク**:
  - **ファイル送信**: ユーザーが選択したCSVファイルを、`multipart/form-data`形式でバックエンドに直接送信する。

- **バックエンド側のタスク**:
  - **管理者権限ミドルウェア**: `/api/admin/*`で始まるすべてのエンドポイントで、ユーザーの`role`が`ADMIN`であることを検証する。
  - **CSVインポートAPI**: `POST /api/admin/import-lectures`を実装する。
    - **ファイル処理**: `multer`や`busboy`といったライブラリを使用し、アップロードされたファイルを受け取る。
    - **CSVパース**: `papaparse`などのストリーミング対応パーサーを使用し、大きなファイルでもメモリを圧迫せずに処理する。
    - **ロジック（洗い替え方式）**: トランザクション内で、まず`official_lectures`テーブルの全データを削除し、その後パースした講義データ配列を`createMany`で一括登録する。
    - **CSVフォーマット定義**: インポートするCSVは以下のヘッダーを持つことを必須とする。
      - `name`, `professor`, `dayOfWeek`, `period`, `termId`

### 3.2. Google OAuth による組織内認証 (Issue #12)

Google IAPによる認証に加え、許可された組織ドメインを持つGoogleアカウントのみがサービスを利用できるように制限を強化します。

#### 3.2.1. バックエンド側のタスク

- **認証ミドルウェアの強化 (`iapAuthMiddleware`):**
    - IAPから渡される`X-Goog-Authenticated-User-Email`ヘッダーから取得したメールアドレスのドメインが、許可された組織のドメイン（環境変数などで管理）と一致するかを検証するロジックを追加します。
    - ドメインが一致しない場合は、`403 Forbidden`エラーを返却し、後続の処理（ユーザーのDB登録など）を中断します。

#### 3.2.2. フロントエンド側のタスク

- **ログインフローの明確化:**
    - 現在のIAPの仕様では、保護されたリソースへのアクセス時に自動でGoogleのログインページへリダイレクトされます。このフローをユーザーに分かりやすくするため、未認証状態のページに「学内アカウントでログイン」ボタンなどを設置し、クリックすると保護されたAPI (`/api/users/me`) へのアクセスをトリガーするように実装します。
- **エラーハンドリング:**
    - バックエンドから`403 Forbidden`エラーが返された場合に、「あなたのアカウントはこのサービスを利用する権限がありません。」といった適切なメッセージをユーザーに表示する処理を実装します。

### 3.3. 本番環境への配備と最終検証

開発した全ての機能を本番環境へリリースし、正式公開前の最終確認を行うための手順を定める。

#### 3.3.1. 本番デプロイ手順

1.  **ステージング環境での最終確認**: `develop`ブランチからデプロイされたステージング環境で、全ての機能が意図通りに動作することを開発チーム内で確認する。
2.  **プルリクエストの作成**: `develop`ブランチから`main`ブランチへのプルリクエストを作成する。プルリクエストの概要には、今回のリリースに含まれる変更点をまとめる。
3.  **コードレビューとマージ**: チームメンバーによるコードレビューを経て、プルリクエストを`main`ブランチにマージする。
4.  **自動デプロイの確認**: `main`ブランチへのマージをトリガーとして、CI/CDパイプラインが実行され、VercelおよびCloud Runの本番環境へ自動的にデプロイが完了することを監視・確認する。

#### 3.3.2. IAP設定の最終監査

Google Cloudコンソール上で、本番環境のセキュリティ設定を最終確認する。

- **対象リソース**: 本番環境のCloud Runサービス
- **確認項目**:
  - [ ] IAPが「有効」になっていること。
  - [ ] OAuth同意画面が正しく設定されていること。
  - [ ] IAPのアクセス許可（プリンシパル）が、対象となる学内GoogleアカウントのドメインまたはGoogleグループに正しく限定されていること。

#### 3.3.3. ユーザー受け入れテスト (UAT)

- **目的**: 実際の利用者に近い視点でシステムの動作を評価し、予期せぬ不具合や使い勝手の問題を洗い出す。
- **テスター**: 開発関係者に加え、協力を依頼した数名の学生・教職員。
- **テスト項目リストの準備**: 以下の主要機能に関する操作シナリオをまとめたテストケース一覧を用意する。
  - 新規ユーザーの初回ログイン
  - カレンダーの表示（3種類の予定の色分け確認）
  - 私的補講の新規登録・編集・削除
  - 私的補講への出席登録・キャンセル
  - 個人予定の新規登録・編集・削除
  - 補講開催希望の登録・キャンセル
  - ランキングの表示
- **フィードバック**: 発見された問題点は全てGitHub Issuesに`Type: Bug`または`Type: Enhancement`のラベルを付けて起票してもらう。重大なバグが発見された場合は、修正後に再度デプロイとUATを行う。

### 3.4. サービス提供開始および運用

UATを経て安定性が確認された後、サービスを正式に公開し、継続的な運用・保守フェーズに移行する。

#### 3.4.1. サービス提供開始

- **利用者への告知**:
  - 学内ポータルサイトや関連部署を通じて、全学生・教職員にサービス開始を告知する。
  - 告知内容には、サービスURL、主な機能、簡単な利用ガイド、利用規約へのリンクを含める。
- **ドキュメントの整備**:
  - アプリケーション内に、よくある質問（FAQ）や使い方をまとめたヘルプページを設置する。

#### 3.4.2. 運用・保守

- **システム監視**:
  - **フロントエンド**: Vercel Analyticsを用いて、トラフィック、パフォーマンス、ユーザーの利用状況を監視する。
  - **バックエンド/DB**: Google Cloud Monitoringを活用し、Cloud RunのCPU使用率、エラー率、およびCloud SQLの負荷状況をダッシュボードで可視化する。閾値を超えた場合にアラートが通知されるように設定する。
- **ログ管理**:
  - Google Cloud Loggingに集約されたバックエンドのアプリケーションログを定期的に確認し、エラーの早期発見と原因究明に役立てる。
- **フィードバック収集**:
  - アプリケーション内に、改善要望や不具合報告を受け付けるためのフィードバックフォーム（Googleフォーム等へのリンク）を設置する。
- **定期メンテナンス**:
  - GitHub Dependabotを有効化し、依存パッケージの脆弱性を自動で検知する。
  - `npm audit`を定期的に実行し、セキュリティリスクを評価・対応する。

## 4. 本番環境への配備と最終検証

開発した全ての機能を本番環境へリリースし、正式公開前の最終確認を行うための手順を定める。

#### 4.1.1. 本番デプロイ手順

1.  **ステージング環境での最終確認**: `develop`ブランチからデプロイされたステージング環境で、全ての機能が意図通りに動作することを開発チーム内で確認する。
2.  **プルリクエストの作成**: `develop`ブランチから`main`ブランチへのプルリクエストを作成する。プルリクエストの概要には、今回のリリースに含まれる変更点をまとめる。
3.  **コードレビューとマージ**: チームメンバーによるコードレビューを経て、プルリクエストを`main`ブランチにマージする。
4.  **自動デプロイの確認**: `main`ブランチへのマージをトリガーとして、CI/CDパイプラインが実行され、VercelおよびCloud Runの本番環境へ自動的にデプロイが完了することを監視・確認する。

#### 4.1.2. IAP設定の最終監査

Google Cloudコンソール上で、本番環境のセキュリティ設定を最終確認する。

- **対象リソース**: 本番環境のCloud Runサービス
- **確認項目**:
  - [ ] IAPが「有効」になっていること。
  - [ ] OAuth同意画面が正しく設定されていること。
  - [ ] IAPのアクセス許可（プリンシパル）が、対象となる学内GoogleアカウントのドメインまたはGoogleグループに正しく限定されていること。

#### 4.1.3. ユーザー受け入れテスト (UAT)

- **目的**: 実際の利用者に近い視点でシステムの動作を評価し、予期せぬ不具合や使い勝手の問題を洗い出す。
- **テスター**: 開発関係者に加え、協力を依頼した数名の学生・教職員。
- **テスト項目リストの準備**: 以下の主要機能に関する操作シナリオをまとめたテストケース一覧を用意する。
  - 新規ユーザーの初回ログイン
  - カレンダーの表示（3種類の予定の色分け確認）
  - 私的補講の新規登録・編集・削除
  - 私的補講への出席登録・キャンセル
  - 個人予定の新規登録・編集・削除
  - 補講開催希望の登録・キャンセル
  - ランキングの表示
- **フィードバック**: 発見された問題点は全てGitHub Issuesに`Type: Bug`または`Type: Enhancement`のラベルを付けて起票してもらう。重大なバグが発見された場合は、修正後に再度デプロイとUATを行う。

### 4.2. サービス提供開始および運用

UATを経て安定性が確認された後、サービスを正式に公開し、継続的な運用・保守フェーズに移行する。

#### 4.2.2. サービス提供開始

- **利用者への告知**:
  - 学内ポータルサイトや関連部署を通じて、全学生・教職員にサービス開始を告知する。
  - 告知内容には、サービスURL、主な機能、簡単な利用ガイド、利用規約へのリンクを含める。
- **ドキュメントの整備**:
  - アプリケーション内に、よくある質問（FAQ）や使い方をまとめたヘルプページを設置する。

#### 4.2.3. 運用・保守

- **システム監視**:
  - **フロントエンド**: Vercel Analyticsを用いて、トラフィック、パフォーマンス、ユーザーの利用状況を監視する。
  - **バックエンド/DB**: Google Cloud Monitoringを活用し、Cloud RunのCPU使用率、エラー率、およびCloud SQLの負荷状況をダッシュボードで可視化する。閾値を超えた場合にアラートが通知されるように設定する。
- **ログ管理**:
  - Google Cloud Loggingに集約されたバックエンドのアプリケーションログを定期的に確認し、エラーの早期発見と原因究明に役立てる。
- **フィードバック収集**:
  - アプリケーション内に、改善要望や不具合報告を受け付けるためのフィードバックフォーム（Googleフォーム等へのリンク）を設置する。
- **定期メンテナンス**:
  - GitHub Dependabotを有効化し、依存パッケージの脆弱性を自動で検知する。
  - `npm audit`を定期的に実行し、セキュリティリスクを評価・対応する。