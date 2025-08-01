# Development Tasks (GitHub Issues)

This document lists the development tasks to be created as GitHub Issues, based on the detailed specifications in `issuse.md`.

## 1. 基盤構築および準備工程 (Infrastructure & Setup)

- [ ] **Issue #1: プロジェクト管理システムのセットアップ (Project Management Setup)**
    - [ ] GitHubリポジトリの作成
    - [ ] `main`, `develop` ブランチの作成と保護設定
    - [ ] Issueテンプレート (`bug_report.md`, `feature_request.md`, `task.md`) を `.github/ISSUE_TEMPLATE` に配置
    - [ ] `issuse.md`で定義したラベルをGitHubに設定

- [ ] **Issue #2: ローカル開発環境の構築 (Local Development Environment)**
    - [ ] `docker-compose.yml` をプロジェクトルートに作成
    - [ ] `backend` ディレクトリで `npm init` と必要な依存関係をインストール
    - [ ] `backend` ディレクトリで `prisma init` を実行
    - [ ] `frontend` ディレクトリで `npm create vite@latest` を実行し、React(TypeScript)プロジェクトを作成

- [ ] **Issue #3: CI/CD パイプラインの構築 (CI/CD Pipeline)**
    - [ ] Vercelプロジェクトを作成し、GitHubリポジトリと連携
    - [ ] Google Cloudプロジェクトをセットアップ (Cloud Run, Cloud SQL, IAP)
    - [ ] `develop` ブランチ用のステージング環境デプロイを設定
    - [ ] `main` ブランチ用の本番環境デプロイを設定

- [ ] **Issue #4: データベースの初期構成 (Initial Database Schema)**
    - [ ] `issuse.md`に基づき `backend/prisma/schema.prisma` を完成させる
    - [ ] `npx prisma migrate dev` を実行し、初期マイグレーションファイルを作成

## 2. 中核的機能の実装（MVP開発） (Core MVP Features)

- [ ] **Issue #5: 認証機構の実装 (Authentication)**
    - [ ] **Backend:** IAPヘッダーを検証するミドルウェアを作成
    - [ ] **Backend:** `GET /api/users/me`, `PUT /api/users/me` APIを実装
    - [ ] **Frontend:** `useUser` フックを作成
    - [ ] **Frontend:** 初回ログイン時の名前登録モーダルを実装

- [ ] **Issue #6: カレンダー機能の実装 (Calendar Feature)**
    - [ ] **Backend:** `GET /api/events` APIを実装 (公式講義、私的補講、個人予定を返す)
    - [ ] **Frontend:** FullCalendarを導入し、カレンダーコンポーネントを作成
    - [ ] **Frontend:** APIから取得したイベントをカレンダーに表示し、種類に応じて色分け

- [ ] **Issue #7: 私的補講の登録・閲覧機能 (Supplementary Lecture CRUD)**
    - [ ] **Backend:** `GET /api/supplementary-lectures/:id`, `POST /api/supplementary-lectures` APIを実装
    - [ ] **Frontend:** 補講の詳細ページ (`/lectures/[id]`) を作成
    - [ ] **Frontend:** 補講の登録フォームページ (`/lectures/new`) を作成

- [ ] **Issue #8: 私的補講への出席登録機能 (Supplementary Lecture Attendance)**
    - [ ] **Backend:** `GET /api/supplementary-lectures/:id` を拡張し `isAttending` を含める
    - [ ] **Backend:** `POST /api/supplementary-lectures/:id/attendees`, `DELETE /api/supplementary-lectures/:id/attendees` APIを実装
    - [ ] **Frontend:** 詳細ページに出席/キャンセルボタンを実装 (楽観的UI更新を含む)

## 3. 拡張機能開発 (Extended Features)

- [ ] **Issue #9: 個人予定のCRUD機能 (Personal Event CRUD)**
    - [ ] **Backend:** `POST`, `PUT`, `DELETE` の `/api/personal-events` API群を実装
    - [ ] **Frontend:** 個人予定の作成・編集用モーダルを実装

- [ ] **Issue #10: 補講開催希望とランキング機能 (Lecture Request & Ranking)**
    - [ ] **Backend:** `POST`, `DELETE` の `/api/official-lectures/:id/requests` APIを実装
    - [ ] **Backend:** `GET /api/lecture-requests/ranking` APIを実装
    - [ ] **Frontend:** 希望登録ボタンとランキング表示UIを実装

- [ ] **Issue #11: 管理者向けCSVインポート機能 (Admin CSV Import)**
    - [ ] **Backend:** 管理者権限ミドルウェアを実装
    - [ ] **Backend:** `POST /api/admin/import-lectures` APIを実装 (サーバーサイドでのCSVパース)
    - [ ] **Frontend:** 管理者ページ (`/admin`) とファイルアップロードUIを実装

- [ ] **Issue #12: Google OAuth による組織内認証 (Google OAuth for Organization)**
    - [ ] **Backend:** IAPヘッダー検証に加え、許可されたドメインのGoogleアカウントのみを認証するロジックをミドルウェアに実装
    - [ ] **Frontend:** ログインボタンの実装と、未認証時のリダイレクト処理

