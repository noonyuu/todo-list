# テーブル設計

## TODO

| カラム名    | データ型                 | 制約                          | 説明              |
| ----------- | ------------------------ | ----------------------------- | ----------------- |
| id          | UUID (PK)                | PRIMARY KEY                   | タスク ID         |
| title       | VARCHAR NOT NULL         | NOT NULL                      | タスク名          |
| description | TEXT                     | NULLABLE                      | 説明文（null 可） |
| start_date  | DATE                     | NULLABLE                      | 開始日（null 可） |
| end_date    | DATE                     | NULLABLE                      | 終了日（null 可） |
| priority_id | UUID                     | NOT NULL, FK → priorities(id) | 優先度 ID         |
| status_id   | UUID                     | NOT NULL, FK → statuses(id)   | 対応ステータス ID |
| created_at  | TIMESTAMP WITH TIME ZONE | NOT NULL DEFAULT NOW()        | 作成日時          |
| updated_at  | TIMESTAMP WITH TIME ZONE | NOT NULL DEFAULT NOW()        | 更新日時          |

## Priories

| カラム名 | データ型         | 制約        | 説明                               |
| -------- | ---------------- | ----------- | ---------------------------------- |
| id       | UUID (PK)        | PRIMARY KEY | 優先度 ID                          |
| name     | VARCHAR NOT NULL | NOT NULL    | 優先度名（High, Middle, Low など） |
| order    | INTEGER NOT NULL | NOT NULL    | 表示順（小さいほど優先度高い等）   |

## statuses

| カラム名 | データ型         | 制約        | 説明                                   |
| -------- | ---------------- | ----------- | -------------------------------------- |
| id       | UUID (PK)        | PRIMARY KEY | ステータス ID                          |
| name     | VARCHAR NOT NULL | NOT NULL    | ステータス名（未着手、着手、完了など） |
| order    | INTEGER NOT NULL | NOT NULL    | 表示順                                 |

## labels

| カラム名 | データ型         | 制約        | 説明      |
| -------- | ---------------- | ----------- | --------- |
| id       | UUID (PK)        | PRIMARY KEY | ラベル ID |
| name     | VARCHAR NOT NULL | NOT NULL    | ラベル名  |

## todo_labels

| カラム名 | データ型 | 制約                      | 説明      |
| -------- | -------- | ------------------------- | --------- |
| todo_id  | UUID     | NOT NULL, FK → todos(id)  | タスク ID |
| label_id | UUID     | NOT NULL, FK → labels(id) | ラベル ID |
