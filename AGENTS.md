# Repository Guidelines

## プロジェクト構成

Astro で構築し Cloudflare Workers へ配信する個人サイトです。主な配置は次のとおりです。

```txt
.
├── src/
│   ├── pages/          # ファイルベースのルート
│   ├── layouts/        # 共有ページレイアウト
│   ├── components/     # 再利用可能な UI
│   ├── lib/            # コンテンツ取得・共通処理
│   ├── styles/         # グローバルスタイル
│   └── content/
│       ├── blog/       # ブログ記事の Markdown
│       └── wiki/       # Wiki 記事の Markdown
├── public/             # 静的ファイル
├── e2e/                # Playwright の視覚試験
├── astro.config.mjs    # Astro 設定
├── playwright.config.ts
└── wrangler.jsonc      # Cloudflare Workers 設定
```

試験の生成物は `e2e/.playwright/test-results/` に保存されます。 build 成果物の `dist/` は手作業で編集しないでください。

## 開発・ビルド・テスト

### Setup

- `mise install` : 指定された Node.js 24.18.1 を準備します。
- `pnpm install` : lockfile に従って依存関係を導入します。
- `pnpm exec playwright install chromium` : Playwright 用の Chromium を初回のみ導入します。

### Dev

- `pnpm run dev` : ローカル開発サーバーを起動します。
- `pnpm run build` : 本番向け成果物を生成し、型やコンテンツ設定も検証します。
- `pnpm run preview` : 本番 build をローカルで確認します。
- `pnpm run generate-types` : Cloudflare bindings の型定義を更新します。設定変更後に実行してください。
- `pnpm run deploy` : audit 通過後、 Cloudflare Workers へデプロイします。

### Test

- `pnpm run test:e2e:screenshot` : Playwright で主要ページを 4 種類の viewport から撮影します。
- `pnpm run audit` : low 以上の依存関係脆弱性を検査します。デプロイ前の必須チェックです。

## コーディング規約と命名

TypeScript は strict 設定です。既存の `src/` 配下に合わせ、タブインデント、ダブルクォート、末尾セミコロンを基本とします。 Astro コンポーネントは `PascalCase.astro` 、補助モジュールは `kebab-case.ts` 、変数と関数は `camelCase` を使います。ルート名とコンテンツ slug は小文字の kebab-case にしてください。 formatter や linter は未導入のため、変更箇所周辺の書式を維持します。

## コンテンツ作成

記事の frontmatter には `title` 、 `description` 、 `date` 、 `tags` 、 `status` を設定します。 `status` は `draft` 、 `published` 、 `archived` のいずれかで、更新日が必要な場合は `updatedAt` を追加します。 Markdown の Mermaid 図や数式を変更した場合は、開発サーバーと生成スクリーンショットの両方で描画を確認してください。

## テスト方針

現在の自動試験は `e2e/screenshot.spec.ts` の Playwright 視覚確認です。ページや responsive layout を変更したら対象 URL と必要な viewport を追加し、生成画像を目視確認してください。数値の coverage 基準はありませんが、提出前に少なくとも build と関連する E2E 試験を通します。

## コミットと Pull Request

履歴では `feat:` 、 `fix:` 、 `style:` 、 `docs:` などの短い接頭辞と命令形の要約が使われています。1 コミットを 1 つの意図に絞り、例として `fix: prevent mobile navigation overflow` のように記述します。 Pull Request には目的、主な変更、実行した確認を記載し、関連 issue があればリンクします。見た目を変える場合は desktop と mobile のスクリーンショットを添付してください。

## セキュリティと設定

秘密情報は 1Password で一元管理し、値を `.env` などのローカルファイルへ保存しません。必要な値には 1Password CLI の `op` コマンドを介してアクセスし、プロセスの環境変数へ注入します。デプロイ前には必ず `pnpm run audit` を通し、依存更新時は `SECURITY.md` と `pnpm-lock.yaml` も確認します。 Mermaid はレビュー済みのリポジトリ内コンテンツだけを入力とし、未確認のユーザー入力や生成結果を直接描画しないでください。
