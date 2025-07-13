仕様書案：エビ予備 (EbiYobi)
1. 概要 (Overview)
「エビ予備」は、大学の講義に対する私的な補講（Supplementary Lecture）のマッチングを支援する学内限定のWebサービスです。ユーザーは補講の開催や参加、開催希望の表明をカレンダー上で行うことで、学内での自主的な学習コミュニティを活性化させることを目指します。

2. 目的・ゴール (Goal)
- 目的: 学生間の教え合いを促進し、講義内容の理解度を深める機会を創出する。
- ゴール:
  - ユーザーがスムーズに補講を「開催登録」および「参加登録」できる
  - どの講義に補講の需要があるかを可視化する

3. ターゲットユーザー
- 当該大学に所属し、学内アカウントを所有する全ての学生・教職員

4. 機能要件 (Functional Requirements)
4.1. ユーザー認証
- ログイン機能: 学内アカウント（例: Google Workspace, Microsoft 365）を利用したSSO（シングルサインオン）でのみログインできる
- アクセス制限: ログインしていないユーザーは、サービス内の情報（カレンダー等）を閲覧できない

4.2. カレンダー機能
- 表示: 予定を月間または週間カレンダー形式で表示する
- 表示する情報: カレンダーには以下の3種類の予定が表示される
  - 大学公式の講義（Official Lecture）: 全ユーザーに共通で表示される（※データの取得方法は要検討）
  - 個人予定（Personal Event）: ログインユーザー本人のみが閲覧・編集できるプライベートな予定
  - 私的補講（Supplementary Lecture）: 全てのユーザーが閲覧・登録できる補講の予定

4.3. 私的補講の管理機能
- 補講の登録:
  - ログインユーザーは誰でも、補講の予定をカレンダーに登録できる
  - 登録項目: 講義名、日時、場所、担当者（登録者）、簡単な内容など
- 補講へのリアクション:
  - ユーザーは、登録された各補講予定に対して、ボタンのON/OFFで意思表示ができる
    - 出席登録: その補講に参加したいことを示す
    - 開催希望登録: （補講がまだない講義に対し）「この講義の補講を開いてほしい」という希望を示す

5. 非機能要件 (Non-Functional Requirements)
- 使用技術:
  - 言語: JavaScriptまたはTypeScript
  - フレームワーク/ライブラリ: React, Vue.jsなど、初心者が短期開発しやすい技術を選定する
  - 開発期間: 短期での製作を目指す
  - 対象デバイス: PCのWebブラウザを主軸とする（レスポンシブ対応は任意）

---

6. データベース設計案 (Database Design)
| テーブル名                        | カラム名                 | データ型     | 説明                                                    |
| --------------------------------- | ------------------------ | ------------ | ------------------------------------------------------- |
| users                             | id                       | UUID or INT  | 主キー (PK)                                             |
|                                   | university_email         | VARCHAR(255) | 学内メールアドレス (一意)                               |
|                                   | name                     | VARCHAR(255) | ユーザー名                                              |
|                                   | created_at               | TIMESTAMP    | 作成日時                                                |
|                                   | updated_at               | TIMESTAMP    | 更新日時                                                |
| official_lectures                 | id                       | INT          | 主キー (PK)                                             |
|                                   | name                     | VARCHAR(255) | 講義名                                                  |
|                                   | professor                | VARCHAR(255) | 担当教員名                                              |
|                                   | day_of_week              | INT          | 曜日 (例: 1=月, 2=火)                                   |
|                                   | period                   | INT          | 時限 (例: 1=1限)                                        |
| supplementary_lectures            | id                       | INT          | 主キー (PK)                                             |
|                                   | creator_id               | UUID or INT  | 開催者のID (FK to users.id)                             |
|                                   | lecture_id               | INT          | 関連する公式講義のID (FK to official_lectures.id)       |
|                                   | location                 | VARCHAR(255) | 開催場所                                                |
|                                   | start_time               | TIMESTAMP    | 開始日時                                                |
|                                   | end_time                 | TIMESTAMP    | 終了日時                                                |
|                                   | description              | TEXT         | 補足説明                                                |
|                                   | created_at               | TIMESTAMP    | 作成日時                                                |
| personal_events                   | id                       | INT          | 主キー (PK)                                             |
|                                   | user_id                  | UUID or INT  | ユーザーID (FK to users.id)                             |
|                                   | title                    | VARCHAR(255) | 予定のタイトル                                          |
|                                   | start_time               | TIMESTAMP    | 開始日時                                                |
|                                   | end_time                 | TIMESTAMP    | 終了日時                                                |
|                                   | description              | TEXT         | 補足説明                                                |
| supplementary_lecture_attendances | user_id                  | UUID or INT  | 出席するユーザーのID (FK to users.id)                   |
|                                   | supplementary_lecture_id | INT          | 出席対象の補講ID (FK to supplementary_lectures.id)      |
| supplementary_lecture_requests    | user_id                  | UUID or INT  | 希望するユーザーのID (FK to users.id)                   |
|                                   | official_lecture_id      | INT          | 開催を希望する公式講義のID (FK to official_lectures.id) |

---

7. 画面設計案 (UI Design)
7.1. ログイン画面
- 目的: ユーザーを学内アカウントで認証し、サービス利用を開始させる
- 主要な要素:
  - 中央に「EbiYobi」のロゴと簡単なサービス説明（例：「学内限定の私的補講マッチングサービス」）
  - 「学内アカウントでログイン」と書かれたボタンが一つだけ表示される

7.2. メインカレンダー画面（ダッシュボード）
- 目的: ユーザー自身の予定と全体の補講予定を一覧し、主要なアクションへの起点となる
- 主要な要素:
  - ヘッダー: ログイン中のユーザー名、ログアウトボタン
  - カレンダー表示エリア: 月間表示のカレンダー。「大学公式の講義」「個人予定」「私的補講」の3種類が色分け表示
  - サイドパネル/アクションエリア:
    - 「補講を登録する」ボタン（補講登録画面へ遷移）
    - 「個人予定を登録する」ボタン（個人予定登録画面へ遷移）
    - 補講開催希望ランキング: 開催希望が登録されている公式講義を希望数順にリスト表示

7.3. 補講詳細画面
- 目的: 特定の補講の詳細情報を表示し、ユーザーが出席登録を行えるようにする
- 主要な要素:
  - 補講情報: タイトル、日時、開催場所、担当者名、内容詳細、出席登録者数
  - アクションボタン: 状態に応じて「出席する」「出席をキャンセルする」
  - 条件付きボタン: 開催者のみ「編集」「削除」ボタン

7.4. 補講登録・編集画面
- 目的: ユーザーが新しい補講を作成、または既存の補講を編集するためのフォーム
- 主要な要素:
  - 入力フォーム: 関連講義（プルダウン）、開催場所、日時、内容詳細
  - アクションボタン: 「登録する」「更新する」「キャンセル」

---

8. API設計案 (API Design)
- エンドポイントのプレフィックス: `/api`
- 認証: ログイン後のリクエストはセッション情報でユーザーを識別
- データ形式: JSON

#### 認証 (Authentication)
| メソッド | パス               | 説明                                                             |
| -------- | ------------------ | ---------------------------------------------------------------- |
| GET      | /api/auth/login    | 学内アカウントでのログイン開始（大学の認証ページへリダイレクト） |
| GET      | /api/auth/callback | 認証成功後のコールバック。ユーザー情報をDB保存しセッション開始   |
| POST     | /api/auth/logout   | サーバー上のセッションを破棄しログアウト                         |
| GET      | /api/users/me      | 現在ログインしているユーザーの情報取得                           |

#### 予定 (Events)
| メソッド | パス        | 説明                                              |
| -------- | ----------- | ------------------------------------------------- |
| GET      | /api/events | カレンダー用の全予定を取得（クエリ: year, month） |

例:
```
GET /api/events?year=2025&month=7
```
レスポンス例:
```json
[
  { "id": 1, "type": "official", "title": "微分積分学", "start_time": "..." },
  { "id": 15, "type": "personal", "title": "サークルMTG", "start_time": "..." },
  { "id": 8, "type": "supplementary", "title": "統計学 補講", "start_time": "..." }
]
```

#### 私的補講 (Supplementary Lectures)
| メソッド | パス                                       | 説明                           |
| -------- | ------------------------------------------ | ------------------------------ |
| POST     | /api/supplementary-lectures                | 新しい私的補講を登録           |
| GET      | /api/supplementary-lectures/{id}           | 特定の私的補講の詳細情報取得   |
| PUT      | /api/supplementary-lectures/{id}           | 補講の情報を更新（開催者のみ） |
| DELETE   | /api/supplementary-lectures/{id}           | 補講を削除（開催者のみ）       |
| POST     | /api/supplementary-lectures/{id}/attendees | 補講に出席登録                 |
| DELETE   | /api/supplementary-lectures/{id}/attendees | 補講の出席をキャンセル         |

#### 補講開催希望 (Lecture Requests)
| メソッド | パス                                 | 説明                                     |
| -------- | ------------------------------------ | ---------------------------------------- |
| GET      | /api/lecture-requests/ranking        | 補講開催希望のランキング取得             |
| POST     | /api/official-lectures/{id}/requests | 特定の公式講義に対して補講開催希望を登録 |
| DELETE   | /api/official-lectures/{id}/requests | 開催希望を取り消す                       |

---

9. 技術選定 (Technology Stack)
| カテゴリ       | 推奨技術                                            |
| -------------- | --------------------------------------------------- |
| フロントエンド | React（Vite推奨）                                   |
| バックエンド   | Node.js + Express                                   |
| データベース   | PostgreSQL（開発用はSQLiteも可）                    |
| デプロイ環境   | Render（バックエンド/DB）、Vercel（フロントエンド） |

---

10. バリデーション・エラーハンドリング・認証・テスト方針
- バリデーション例:
  - 補講開始日時は未来であること
  - 終了日時は開始日時より後
  - 開催場所は最大50文字
  - ユーザー名は2～20文字
- エラーハンドリング例:
  - API通信エラー：「サーバーとの通信に失敗しました。時間をおいて再度お試しください。」
  - 権限エラー：「この予定を編集する権限がありません。」
- 認証・認可例:
  - 学内メールアドレスのドメイン以外はログイン不可
  - ユーザーは自分の予定・補講のみ編集・削除可
- テスト方針:
  - 単体テスト、結合テスト、E2Eテスト

---

11. 運用・セキュリティ・規約
- ログ管理、死活監視、バックアップ方針
- 依存関係管理（npm audit, Dependabot等）
- 個人情報の取り扱い方針
- 利用規約・プライバシーポリシーの明示

---

12. 講義データ管理
- 基本は「CSVファイルによる一括インポート」
- 補助として「手動での登録・編集」管理画面も用意