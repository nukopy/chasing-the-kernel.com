# Mermaid パフォーマンスレビュー

レビュー日: 2026-08-02

## 概要

Mermaid コードブロックを含まない記事でも Mermaid のブラウザランタイムを読み込む High の問題は、条件付きの dynamic import により解消しました。

Mermaid を含む記事では、引き続き4つのテスト図を正常に描画できます。Medium・Low の指摘は今回の対応範囲に含めず、そのまま残しています。

## 指摘事項

### Resolved (High): Mermaid のない記事でもランタイムを読み込んでいた

[render-mermaid-diagrams.ts](src/components/MermaidDiagrams/render-mermaid-diagrams.ts#L13) は、Mermaid のソースブロックが実際に見つかったときだけ `import("mermaid")` を実行するようになりました。Blog・Wiki の記事ページにコンポーネント自体を配置したままでも、Mermaid のない記事では runtime chunk を取得しません。

Mermaid ブロックを含まない Wiki 記事で、production build を再計測した結果は次のとおりです。

- Mermaid runtime の JavaScript リクエスト: 0件
- Mermaid ブロックを検出する component entry: 1件
- component entry の非圧縮サイズ: 3,503 bytes
- component entry の gzip 圧縮サイズ: 1,803 bytes
- browser console の error・warning: 0件

修正前は16件・非圧縮619,705 bytes・gzip換算約150,958 bytesの Mermaid 関連 JavaScript を読み込んでいました。修正後は Mermaid core と図の種類ごとの module を取得しません。

Mermaid ブロックを4つ含む Blog 記事では、dynamic import 後に4つの SVG を描画し、失敗したソースブロックが0件であることも確認しました。

Vite の 500 kB を超える chunk 警告は残っています。これは Mermaid を必要とするページで遅延読み込みされる chunk 自体に対する警告であり、今回の「Mermaid のない記事でも読み込む」問題とは分離して扱います。

### Medium: クライアント側の描画完了がページ読み込みより遅い

Mermaid ブロックを4つ含むテスト記事を、Chrome DevTools の Fast 4G・CPU 4倍低速化で計測しました。

| 計測項目 | 結果 |
| --- | ---: |
| DOMContentLoaded | 1.27 s |
| Mermaid 4図の描画完了 | 2.68 s |
| DOMContentLoaded から描画完了まで | 1.41 s |
| Mermaid の最長 network dependency chain | 2.50 s |
| Mermaid 内部の forced reflow | 22 ms |
| Largest Contentful Paint | 549 ms |
| Cumulative Layout Shift | 0.00 |

この値は、ローカルの非圧縮 HTTP/1.0 の static server で取得した比較用のラボデータです。Cloudflare 本番環境の実測値ではありません。

初期コンテンツの表示速度は良好で、今回の計測では layout shift も発生しませんでした。一方、図の表示完了は記事本文の表示より明確に遅れています。

### Medium: 図を直列に描画している

[render-mermaid-diagrams.ts](src/components/MermaidDiagrams/render-mermaid-diagrams.ts#L54) は、すべての図を共有の `renderQueue` へ追加しています。

直列描画は Mermaid の共有状態に対する競合を避けられますが、最後の図が表示されるまでの時間は図の数と複雑さに応じて伸びます。この queue は Astro のページ遷移をまたいで残るため、描画中に移動すると、前ページの切り離された要素に対する処理が CPU を消費し、新ページの描画を遅らせる可能性もあります。

推奨する対策は次のとおりです。

- ビルド時の SVG 生成を優先する。
- クライアント描画を維持する場合、置換前に `pre.isConnected` を確認する。
- navigation generation token を設け、前ページの処理が新ページを待たせないようにする。
- 1ページ内の図の数と複雑さに上限を設ける。

### Low: ソースブロックの置換によって layout shift が起きる可能性がある

[render-mermaid-diagrams.ts](src/components/MermaidDiagrams/render-mermaid-diagrams.ts#L38) は、ページ読み込み後に各 `pre` を SVG container へ置換します。

今回の CLS は `0.00` でしたが、最終的な図のための領域は事前に確保されていません。低速な端末や大きな図では、SVG への置換時に周囲のコンテンツが移動する可能性があります。

ビルド時に SVG を生成すれば、ブラウザ上でのソースから SVG への置換自体をなくせます。クライアント描画を維持する場合は、最小高さや placeholder により描画中の移動を抑えられます。

## 推奨する実装順序

1. 対応済み: Mermaid を import する前に対象ブロックの有無を確認する。
2. 対応済み: 必要なページでのみ `import("mermaid")` を実行する。
3. ページ遷移後の古い描画を無効化する guard を追加する。
4. 対応する Mermaid 記法が安定した段階で、Astro のビルド処理へ SVG 生成を移す。
5. 本番相当の圧縮と cache policy を使用する Cloudflare preview で再計測する。

## 良かった点

- throttling 環境でも LCP と CLS は良好だった。
- Mermaid は図の種類ごとの module を必要に応じて読み込んでいる。
- 描画失敗時に元のソースブロックを残している。
- 各 queue item 内でエラーを処理するため、1図の失敗で後続の描画が停止しない。
- CodeBlockEnhancer の除外設定により、Mermaid ソースへの不要な装飾処理を防いでいる。

## 参考資料

- [Astro client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/)
- [Astro view transitions](https://docs.astro.build/en/guides/view-transitions/)
- [Chrome DevTools performance insights](https://developer.chrome.com/docs/performance/insights/)
