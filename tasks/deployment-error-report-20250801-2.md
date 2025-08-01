# Cloud Run デプロイ失敗に関する最終調査レポート (2025/08/02)

## 1. 現象

ローカル環境での `npm run build` は成功するにもかかわらず、Google Cloud RunへのデプロイがCloud Buildのビルドステップで失敗する。エラー内容は前回から変化していない。

## 2. 調査概要

最新のビルドログ (`downloaded-logs-20250802-002207.json`) を再分析し、ローカル環境とCloud Build環境の差異に着目して原因を特定した。

## 3. エラーの直接原因

ビルドログから、`RUN npm run build` (`tsc`) の実行中に、以下のTypeScriptコンパイルエラーが多数発生していることを再確認した。

-   **`error TS2305: Module '"@prisma/client"' has no exported member '...'`**
-   **`error TS7006: Parameter '...' implicitly has an 'any' type.`**

## 4. 根本原因の特定：環境差異によるPrisma Clientの未生成

ビルド失敗の根本原因は、**Cloud Buildのクリーンな環境において、TypeScriptのコンパイル(`tsc`)が実行される前に、Prisma Clientの型定義を生成する`prisma generate`コマンドが実行されていないこと**である。

### 4.1. なぜローカルでは成功し、Cloud Buildでは失敗するのか

-   **ローカル環境:** 開発者は通常、`prisma migrate`や`prisma db push`といったコマンドを手動で実行する。これらのコマンドは内部的に`prisma generate`を呼び出すため、ローカルの`node_modules/@prisma/client`には、`schema.prisma`に基づいた`User`, `OfficialLecture`などの型定義が常に最新の状態で存在する。そのため、`npm run build`は成功する。
-   **Cloud Build環境:** Cloud Buildは毎回ゼロから環境を構築する。`Dockerfile`の`RUN npm install`では、Prismaのパッケージはインストールされるが、プロジェクト固有の型定義は生成されない。その直後に`RUN npm run build`が実行されると、`tsc`は必要な型定義を見つけられず、大量の`TS2305`エラーと、それに起因する`any`型エラーを発生させる。

## 5. 解決策：ビルドプロセスに`prisma generate`を組み込む

この問題を恒久的かつ確実に解決するためには、ビルドプロセスの一部として`prisma generate`を明示的に実行する必要がある。

### 5.1. `package.json`のビルドスクリプト修正（推奨）

`backend/package.json`の`scripts`セクションを以下のように修正する。これが最も確実な解決策である。

-   **ファイル:** `backend/package.json`
-   **修正前:**
    ```json
    "scripts": {
      "build": "tsc"
    }
    ```
-   **修正後:**
    ```json
    "scripts": {
      "build": "prisma generate && tsc"
    }
    ```
-   **設計思想:** `build`コマンドに`prisma generate`を組み込むことで、`tsc`が実行される直前に必ずPrisma Clientの型定義が生成されることを保証する。これにより、ローカル環境とCI/CD環境のどちらで`npm run build`を実行しても、ビルドプロセスの一貫性が保たれ、環境差異に起因する問題を根絶できる。

### 5.2. `postinstall`フックの追加（補助的・推奨）

ローカル開発の利便性をさらに高めるために、`postinstall`フックを追加することも有効である。

-   **ファイル:** `backend/package.json`
-   **追記:**
    ```json
    "scripts": {
      "postinstall": "prisma generate",
      "build": "prisma generate && tsc",
      // ...他のスクリプト
    }
    ```
-   **設計思想:** `postinstall`スクリプトは`npm install`が実行された直後に自動で実行される。これにより、開発者がリポジトリをクローンして最初に`npm install`を実行した際や、依存関係を更新した際に、`prisma generate`の実行を忘れるという人為的ミスを防ぐことができる。

## 6. 修正手順

1.  `backend/package.json`を開く。
2.  `scripts`オブジェクト内の`build`コマンドを`"prisma generate && tsc"`に修正する。
3.  （推奨）`scripts`オブジェクトに`"postinstall": "prisma generate"`の行を追加する。
4.  変更を保存し、Gitにコミットしてプッシュする。

この修正により、Cloud Buildは正常にビルドを完了し、デプロイが成功するはずである。