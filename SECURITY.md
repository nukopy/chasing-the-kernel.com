# Mermaid セキュリティレビュー

レビュー日: 2026-08-02

## 概要

現在の実装は、Mermaid のソースをレビュー済みの Markdown に限定し、このリポジトリで管理する運用であれば許容できます。一方、任意のユーザー入力や、未レビューの LLM 生成図を安全に描画できる実装として扱うことはできません。

`securityLevel: "strict"` の明示と Mermaid 11.16.0 の採用は適切です。ただし、strict mode は外部画像へのリクエストを防ぎません。また、生成された SVG は `innerHTML` を通じて挿入されています。

## 信頼境界

現在の安全性は、次の前提に基づきます。

- Mermaid のソースはリポジトリに保存する。
- すべての変更をデプロイ前にレビューする。
- Web サイトの訪問者は Mermaid のソースを送信・変更できない。
- LLM が生成したコンテンツは、人間がレビューするまで未信頼として扱う。

いずれかの前提を変更する場合、新しい入力経路を有効にする前に、追加の隔離と外向きリクエスト制御が必要です。

## 指摘事項

### Medium: strict mode でも外部画像をリクエストできる

[render-mermaid-diagrams.ts](src/components/MermaidDiagrams/render-mermaid-diagrams.ts#L17) は Mermaid を `securityLevel: "strict"` で初期化しています。[Mermaid の security level 仕様](https://mermaid.js.org/config/schema-docs/config-properties-securitylevel.html)によると、strict mode は HTML tag を encode し、click 機能を無効化します。

一方、strict mode には外部画像 URL の制御機能がありません。インストール済みの Mermaid 11.16.0 を使用した browser probe では、画像 node を含む図の描画が最終的に失敗した場合でも、その前に HTTP request が発生することを確認しました。[Mermaid issue #7645](https://github.com/mermaid-js/mermaid/issues/7645)でも、外部画像が未信頼入力や LLM 生成図における data exfiltration channel になり得ることが説明されています。

Mermaid は SVG を返す前に画像読み込みを開始できるため、完成した SVG を sanitize するだけではこのリスクを防げません。

推奨する対策は次のとおりです。

- Mermaid のソースをレビュー済みのリポジトリ内コンテンツに限定する。
- `img-src` を制限した Content Security Policy を追加する。
- 外部画像が必要な場合は、送信先を明示的な allowlist で管理する。
- 任意のユーザー入力や LLM 出力を、そのままページ内で描画しない。

sandbox での描画は script・DOM injection の影響を抑えられますが、外部画像に対する送信先制御の代わりにはなりません。

### Medium: SVG 挿入の安全性が Mermaid の sanitizer に依存している

[render-mermaid-diagrams.ts](src/components/MermaidDiagrams/render-mermaid-diagrams.ts#L36) は、Mermaid の出力を `diagram.innerHTML` へ代入しています。

これは HTML injection sink です。安全性は、インストール済み Mermaid の version、設定、sanitize 処理に依存します。Mermaid は過去に XSS、HTML injection、CSS injection の advisory を公開しています。現在の11.16.0は、2026年5月の advisory が修正された11.15.0より新しい version です。詳細は [Mermaid security advisories](https://github.com/mermaid-js/mermaid/security)を参照してください。

運用上、次の policy が必要です。

- pnpm lockfile を commit した状態で維持する。
- Dependabot または Renovate で Mermaid の更新を監視する。
- CI で `pnpm audit --prod` を実行する。
- Mermaid の更新を security-sensitive な変更として扱う。
- `securityLevel` を Mermaid の secure configuration に含め、図の frontmatter から上書きできない状態を維持する。

レビュー時に実行した `pnpm audit --prod --audit-level moderate` では、既知の脆弱性は検出されませんでした。

### Low: strict mode では interactive binding が不要

[render-mermaid-diagrams.ts](src/components/MermaidDiagrams/render-mermaid-diagrams.ts#L39) は、SVG の挿入後に `bindFunctions?.(diagram)` を呼び出します。

strict mode では Mermaid の click 機能が無効になるため、現在この binding が提供する必要な機能はありません。削除すると interaction surface が減り、非 interactive な security model であることも明確になります。

### Low: コンテンツ方針に合わせて複雑さの上限を決める必要がある

Mermaid には `maxTextSize` と `maxEdges` があります。現在の default は 50,000文字と 500 edges で、default の secure configuration により図ごとの上書きから保護されています。詳細は [Mermaid configuration schema](https://mermaid.js.org/config/schema-docs/config.html)を参照してください。

レビュー済みのリポジトリ内コンテンツに対しては、現在の default で妥当です。未信頼入力や自動生成コンテンツを導入する場合は、より小さい明示的な上限を設定し、timeout を設けたビルド時描画も検討してください。複雑な図の parse・layout 処理は browser の main thread で実行されるため、client-side resource exhaustion に利用される可能性があります。

## 未信頼の Mermaid 入力を受け入れる前に必要な対策

1. Mermaid のソースを生成できる system を定義する。
2. 描画前にソースサイズと graph の複雑さを検証する。
3. CSP で外部画像の送信先を禁止または allowlist 化する。
4. 隔離された context またはビルド時に描画する。
5. 生成された SVG を SVG 対応 policy で sanitize する。
6. Web サイト訪問者の main browser thread 外で timeout を適用する。
7. Mermaid を更新するたびに、代表的な不正入力を再テストする。

## 良かった点

- `securityLevel: "strict"` を明示している。
- `startOnLoad: false` により、Mermaid が無関係な DOM を自動走査しない。
- `suppressErrorRendering: true` により、Mermaid の error diagram 挿入を防いでいる。
- 描画エラー時にソースを残し、訪問者向けには一般化したエラー表示を使用している。
- 図の ID を Markdown 入力ではなく内部で生成している。
- Mermaid 11.16.0には、11.14.0以前に影響する advisory の修正が含まれている。

## 参考資料

- [Mermaid security levels](https://mermaid.js.org/config/schema-docs/config-properties-securitylevel.html)
- [Mermaid configuration schema](https://mermaid.js.org/config/schema-docs/config.html)
- [Mermaid security advisories](https://github.com/mermaid-js/mermaid/security)
- [External image policy discussion](https://github.com/mermaid-js/mermaid/issues/7645)
