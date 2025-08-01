# API仕様書

このドキュメントは Ebi-Yobi アプリケーションのバックエンドAPI仕様を定義します。

**ベースURL:** `/api`

**認証:**

多くのエンドポイントは認証を必要とします。認証が必要な場合は、リクエストヘッダーに有効なセッショントークンを含める必要があります。（認証ミドルウェアの具体的な実装に依存します）

---

## 1. ユーザー (`/users`)

### **GET /users/me**

ログインしているユーザー自身の情報を取得します。

*   **認証:** 必要
*   **レスポンス (200 OK):**

```json
{
  "id": "clx...",
  "university_email": "user@example.ac.jp",
  "name": "表示名",
  "isAdmin": false
}
```

### **PUT /users/me**

ログインしているユーザーの情報（現在、表示名のみ）を更新します。

*   **認証:** 必要
*   **リクエストボディ:**

```json
{
  "name": "新しい表示名"
}
```

*   **レスポンス (200 OK):** 更新後のユーザーオブジェクト

---

## 2. イベント (`/events`)

### **GET /events**

指定された期間内のカレンダーに表示すべき全てのイベント（公式講義、私的補講、個人予定）を取得します。

*   **認証:** 必要
*   **クエリパラメータ:**
    *   `start`: 取得期間の開始日時 (ISO 8601 形式, e.g., `2025-08-01T00:00:00.000Z`)
    *   `end`: 取得期間の終了日時 (ISO 8601 形式, e.g., `2025-09-01T00:00:00.000Z`)
*   **レスポンス (200 OK):** FullCalendarのイベント形式に準拠したイベントオブジェクトの配列

```json
[
  {
    "id": "off-1-2025-08-04",
    "title": "基礎数学A",
    "start": "2025-08-04T09:00:00.000Z",
    "end": "2025-08-04T10:30:00.000Z",
    "className": "event-official",
    "display": "background",
    "extendedProps": { "type": "official", "professor": "山田太郎" }
  },
  {
    "id": "sup-5",
    "title": "基礎数学A 補講",
    "start": "2025-08-05T13:00:00.000Z",
    "end": "2025-08-05T14:30:00.000Z",
    "className": "event-supplementary",
    "extendedProps": { "type": "supplementary", "location": "オンライン", "creatorName": "田中花子" }
  },
  {
    "id": "per-12",
    "title": "サークルMTG",
    "start": "2025-08-04T18:00:00.000Z",
    "end": "2025-08-04T19:00:00.000Z",
    "className": "event-personal",
    "extendedProps": { "type": "personal" }
  }
]
```

---

## 3. 公式講義 (`/official-lectures`)

### **GET /official-lectures**

全ての公式講義のリストを取得します。各講義には、ログインユーザーが補講をリクエスト済みかどうかのフラグと、総リクエスト数が含まれます。

*   **認証:** 必要
*   **レスポンス (200 OK):**

```json
[
  {
    "id": 1,
    "name": "基礎数学A",
    "professor": "山田太郎",
    "dayOfWeek": 1,
    "period": 1,
    "termId": 1,
    "requestCount": 15,
    "isRequested": true
  }
]
```

### **POST /official-lectures/:id/requests**

指定された公式講義の補講開催をリクエストします。

*   **認証:** 必要
*   **URLパラメータ:** `id` - 公式講義ID
*   **レスポンス:**
    *   `201 Created`: 成功
    *   `409 Conflict`: 既にリクエスト済み

### **DELETE /official-lectures/:id/requests**

補講開催リクエストを取り消します。

*   **認証:** 必要
*   **URLパラメータ:** `id` - 公式講義ID
*   **レスポンス:**
    *   `204 No Content`: 成功
    *   `404 Not Found`: リクエストが存在しない

---

## 4. 補講リクエスト (`/lecture-requests`)

### **GET /lecture-requests/ranking**

補講開催リクエスト数の多い公式講義のランキングを取得します。

*   **認証:** 不要
*   **レスポンス (200 OK):**

```json
[
  {
    "officialLectureId": 1,
    "requestCount": 15,
    "lectureName": "基礎数学A",
    "professor": "山田太郎"
  }
]
```

---

## 5. 私的補講 (`/supplementary-lectures`)

### **GET /supplementary-lectures/:id**

指定された私的補講の詳細情報を取得します。

*   **認証:** 必要
*   **URLパラメータ:** `id` - 私的補講ID
*   **レスポンス (200 OK):**

```json
{
  "id": 5,
  "officialLectureName": "基礎数学A",
  "location": "オンライン",
  "startTime": "2025-08-05T13:00:00.000Z",
  "endTime": "2025-08-05T14:30:00.000Z",
  "description": "1回目の内容の復習です。",
  "creator": {
    "id": "clx...",
    "name": "田中花子"
  },
  "attendeeCount": 5,
  "isAttending": false
}
```

### **POST /supplementary-lectures**

新しい私的補講を登録します。

*   **認証:** 必要
*   **リクエストボディ:**

```json
{
  "officialLectureId": 1,
  "location": "オンライン",
  "startTime": "2025-08-05T13:00:00.000Z",
  "endTime": "2025-08-05T14:30:00.000Z",
  "description": "1回目の内容の復習です。"
}
```

*   **レスポンス (201 Created):** 作成された補講オブジェクト

### **POST /supplementary-lectures/:id/attendees**

私的補講への出席を登録します。

*   **認証:** 必要
*   **URLパラメータ:** `id` - 私的補講ID
*   **レスポンス:**
    *   `201 Created`: 成功
    *   `409 Conflict`: 既に出席登録済み
    *   `400 Bad Request`: 自身の補講には出席できない

### **DELETE /supplementary-lectures/:id/attendees**

私的補講への出席登録をキャンセルします。

*   **認証:** 必要
*   **URLパラメータ:** `id` - 私的補講ID
*   **レスポンス:**
    *   `204 No Content`: 成功
    *   `404 Not Found`: 出席登録が存在しない

---

## 6. 個人予定 (`/personal-events`)

### **POST /personal-events**

新しい個人予定を作成します。

*   **認証:** 必要
*   **リクエストボディ:**

```json
{
  "title": "サークルMTG",
  "startTime": "2025-08-04T18:00:00.000Z",
  "endTime": "2025-08-04T19:00:00.000Z",
  "description": "夏合宿について"
}
```

*   **レスポンス (201 Created):** 作成された個人予定オブジェクト

### **PUT /personal-events/:id**

個人予定を更新します。

*   **認証:** 必要（かつ、その予定の所有者である必要がある）
*   **URLパラメータ:** `id` - 個人予定ID
*   **リクエストボディ:** 更新する情報（`title`, `startTime`, `endTime`, `description`）
*   **レスポンス (200 OK):** 更新後の個人予定オブジェクト

### **DELETE /personal-events/:id**

個人予定を削除します。

*   **認証:** 必要（かつ、その予定の所有者である必要がある）
*   **URLパラメータ:** `id` - 個人予定ID
*   **レスポンス (204 No Content):** 成功

---

## 7. 管理者 (`/admin`)

### **POST /admin/import-lectures**

CSVファイルを使用して公式講義を一括でインポート（洗い替え）します。

*   **認証:** 必要（かつ、管理者である必要がある）
*   **リクエストボディ:** `multipart/form-data`
    *   `file`: 講義情報が記載されたCSVファイル
*   **レスポンス (200 OK):**

```json
{
  "message": "Successfully imported 150 lectures."
}
```
