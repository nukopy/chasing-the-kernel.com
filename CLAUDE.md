# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Chasing the Kernel は、React Router と Cloudflare Workers で構築されたブログサイトです。Content Collections を使用してマークダウンコンテンツを管理し、Tailwind CSS と daisyUI でスタイリングしています。

## 開発コマンド

### 基本的な開発フロー

```bash
# 開発サーバーの起動（型生成も含む）
pnpm run dev

# ビルド（Content Collections と React Router のビルド）
pnpm run build

# プレビュー（本番ビルドのローカル確認）
pnpm run preview

# デプロイ（Cloudflare Workers へのデプロイ）
pnpm run deploy
```

### コード品質チェック

以下はコードの品質チェックを行うためのコマンドです。
特に、タスク終了時は `pnpm run check`、`pnpm run typecheck` は必ず実行し、これらの終了コードが 0 になるまで修正してください。どうしても直せない場合は止まってよいです。

```bash
# フォーマット
pnpm run format

# リント
pnpm run lint

# フォーマット、リント、import整理を一括実行
pnpm run check

# CI環境でのチェック（読み取り専用）
pnpm run ci

# 型チェック（型定義生成も含む）
pnpm run typecheck

# テスト
pnpm run test
```

### 型定義生成

```bash
# Cloudflare Workers の型定義生成
pnpm run cf-typegen

# React Router の型定義生成
pnpm run react-router-typegen

# 両方の型定義を生成
pnpm run typegen
```

## アーキテクチャ

### 技術スタック

- **フレームワーク**: React Router v7（SSR対応）
- **ランタイム**: Cloudflare Workers
- **スタイリング**: Tailwind CSS v4 + daisyUI
- **コンテンツ管理**: Content Collections（マークダウン/MDX）
- **ビルドツール**: Vite
- **コード品質**: Biome（フォーマット、リント、import整理）

### ディレクトリ構造

```
app/
├── routes/              # React Router のルート定義
│   ├── home.tsx        # ホームページ
│   ├── contents.tsx    # コンテンツ一覧
│   ├── contents.$slug.tsx  # 個別コンテンツ
│   ├── tags.tsx        # タグ一覧
│   └── tags.$tag.tsx   # タグ別コンテンツ
├── components/         # 共通コンポーネント
│   └── layout/        # レイアウト関連コンポーネント
├── hooks/             # カスタムフック
├── lib/
│   └── content-collections/  # Content Collections設定
├── contents/          # マークダウンコンテンツ
└── root.tsx          # アプリケーションのルート
```

### Content Collections

`app/lib/content-collections/index.ts` で設定されています：
- マークダウンファイル（`.md`, `.mdx`）を `app/contents/` から読み込み
- フロントマター（title, tags, summary）をパース
- マークダウンをHTMLに、MDXをReactコンポーネントに変換
- ビルド時に型定義を自動生成

### ルーティング

`app/routes.ts` でルート定義：
- `/` - ホーム
- `/contents` - コンテンツ一覧
- `/contents/:slug` - 個別コンテンツ
- `/tags` - タグ一覧
- `/tags/:tag` - タグ別コンテンツ

### デプロイメント

GitHub Actions（`.github/workflows/`）で自動化：
- **ci.yml**: PRやpushでのテスト実行
- **deploy.yml**: mainブランチへのマージでCloudflare Workersへデプロイ

### 設定ファイル

- **vite.config.ts**: Viteの設定（Cloudflare、Tailwind、React Router、Content Collectionsのプラグイン）
- **wrangler.jsonc**: Cloudflare Workersの設定
- **biome.jsonc**: コードフォーマット・リントルール
- **tsconfig.json**: TypeScriptの設定（複数の設定ファイルを参照）
