# GitHub の公開リポジトリの棚卸し（個人開発の実績）

- 更新日: 2026-11-03
- 対象: GitHub `otomatty` の公開リポジトリ 18 件と、サイトに載せていた個人開発の実績
- 方法: 公開リポジトリをすべて手元で動かし、シードのデモデータ（架空の会社・人物、メールは `@example.com`）でスクリーンショットを撮った。本番の環境には書き込んでいない。各リポジトリの調査メモは、撮影に使った作業フォルダに置いた（リポジトリには入れていない）

---

## 0. 先に対応が要るもの

| 優先 | 対象 | 内容 | おすすめの対応 |
| --- | --- | --- | --- |
| 高 | `distribution-system` | 受託に関わるリポジトリで、公開すべきでない情報が含まれている | 直すあいだは非公開にする。修正はそのリポジトリの issue にまとめた。サイトには載せない |
| 中 | 大船渡もくもく会の公開サイト | 申し込みフォームが今も動き、名前・メール・電話・性別・生年月日を Firestore に保存する。Google Calendar API が 400 を返し、開催予定が出ない | 6 章の手順で対応する。対応するまでサイトからはリンクしない |
| 中 | `stella` の不具合 | 修了証の API が、レッスンの多い講座で 500 を返す（D1 の SQL 変数の上限）。テストモードの招待でデータが入らず、例外が握りつぶされる。講師のレビュー画面で、キーワードを含む行の残りが消える | 直す。上の 2 つは本番でも起きる見込み |
| 低 | `stella` のデザイン | スライドの見た目に、勤務先のサイトから起こしたデザインシステムを使っている。`.claude/settings.local.json` に社名入りの仕様書のファイル名が残る | 個人の配色・書体に差し替え、ファイル名の記載を消す |
| 低 | `typeflow` | README（サーバー・ログイン不要）が今のコード（Clerk・Turso）と食い違う | README を直す |
| 低 | Zedi・TypeFlow のドメイン | zedi-note.app と type-flow.app は Cloudflare の DNS にあるが、apex に A / AAAA レコードがなく表示されない | 公開するまでサイトからはリンクしない |
| 低 | `cbcc-tool` | CLI が引数の先頭 2 つを捨てる不具合と、互換データの引き方の誤りで、非互換が 1 件も検出されない | 掲載しない。直すか、アーカイブ・非公開にする |
| 低 | ログインが要る公開 URL | Sen・Kaiwa・Minamo HR・DevPuzzle は Google ログインが要り、訪問者は中を見られない。DevPuzzle の URL には他のサービス名（robozzle）が入っている | サイトからはリンクせず、スクリーンショットで見せる |
| 低 | GitHub の homepage | Facette の homepage が 404 の workers.dev のまま | デモ（https://demo.facette.saedgewell.com ）に変える |
| 低 | LICENSE | 多くのリポジトリに LICENSE ファイルがない（package.json の MIT の表記だけのものもある） | 公開の意図に合わせて足す |

## 1. 公開リポジトリ 18 件の判断

| リポジトリ | 判断 | サイトでの扱い |
| --- | --- | --- |
| `andon-for-aidlc` | 掲載（更新） | 旧名 AIDLC Guide。slug を `aidlc-guide` から `andon-for-aidlc` に変え、旧 URL はリダイレクト。画面 4 枚。勤務先で学んだことをもとに個人で作ったものと明記 |
| `cbcc-tool` | 掲載しない | 検出が動かない（0 章） |
| `dev-puzzle` | 掲載（更新） | 画面 4 枚、Cloudflare と AWS の構成比較 |
| `distribution-system` | 掲載しない | 受託に関わるため（0 章） |
| `ekyc-signup-sample` | 掲載しない | 案件の予習用で実在の社名があったため、非公開にした（2026-11-03） |
| `facette` | 掲載（更新） | 画面 4 枚、構成比較、デモへのリンク |
| `kaiwa` | 掲載（更新） | 画面 4 枚、構成比較 |
| `m3-baseui` | 掲載（更新） | 画面 4 枚、ドキュメントサイトへのリンク |
| `minamo-hr` | 掲載（更新） | 画面 4 枚、構成比較。本番は実際に使っている可能性があるのでリンクしない |
| `ofunato-mokumoku` | 掲載（更新） | 本番の画面 2 枚。公開サイトへのリンクは外した（0 章） |
| `portfolio` | 掲載（新規） | このサイト。画面 4 枚 |
| `printing-erp` | 掲載（受託のまま） | 公開 URL（Vercel）が 401 なのでリンクを外した |
| `sen` | 掲載（更新） | 画面 4 枚、構成比較 |
| `stella` | 掲載（更新） | 画面 4 枚、構成比較。数値を今の教材の数（教材のある 7 講座・443 トピック）に直した。勤務先で学んだことをもとに個人で作ったものと明記 |
| `typeflow` | 掲載（更新） | 画面 4 枚（手元で遊んだデータ。統計のグラフはデモのスコア）。プリセットの 1 つが寿司打を参考にしたものと明記。type-flow.app は表示されないのでリンクを外した |
| `vouch-workflows` | 掲載（新規） | 開発中・実験的と明記。画面がないので図を出す |
| `zedi` | 掲載（更新） | 作り直し中の版（Cloudflare の Worker 1 つ）の画面 4 枚。zedi-note.app は表示されないのでリンクを外した |
| `zukai` | 掲載（更新） | 画面 4 枚 |

## 2. サイトから外した実績

`src/data/works.ts` の `status` を `'draft'` にした。データは残しているので、`'published'` に戻せば再び載る。

| 実績 | 理由 |
| --- | --- |
| Skill Quest Ai | リポジトリが削除されている（404）。Lovable のプロトタイプ |
| Career Gems | 同上 |
| Robbozle Game | リポジトリ（logic-lab）が削除されている。DevPuzzle に置き換わった |
| Kaki Map Hero | リポジトリが非公開。Lovable で作ったハッカソンの作品 |
| Paper OCR Tool | リポジトリが削除され、公開 URL も DNS が引けない |
| ポートフォリオ・AI チャットボット・見積もり自動化 | リポジトリ（saedgewell-v2）が削除されている。今のサイトに置き換わった |

## 3. 直したリンク

| 実績 | 変更 |
| --- | --- |
| 香典帳アプリ | kouden-app.com（DNS が引けない）→ https://kouden.app |
| 印刷会社 HP・業務システム・W2P | Vercel の URL（401）を外した |
| 菓子製造会社 流通管理システム UI 改善 | 削除されたリポジトリ（fresh-inventory）へのリンクを外した |
| Zedi | zedi-note.app（表示されない）へのリンクを外した |
| TypeFlow | type-flow.app（表示されない）へのリンクを外した |
| DevPuzzle | ログインが要り、URL に他のサービス名が入るので、公開 URL へのリンクを外した |
| 大船渡もくもく会 | 0 章の理由で、公開サイトへのリンクを外した |
| Facette | デモ（https://demo.facette.saedgewell.com ）へのリンクを足した |
| m3-baseui | ドキュメントサイト（https://m3-baseui.pages.dev ）へのリンクを足した |

## 4. 構成図（Cloudflare と AWS）

クローンとして作ったアプリと、Cloudflare の機能を多く使う STELLA の詳細ページに、実際に Cloudflare で動かしている構成と、同じものを AWS で作る場合の構成を、サービスのアイコン付きで並べた。下に観点ごとの違いを表にした。

| 実績 | 参考にしたサービス | Cloudflare | AWS | いちばん大きな違い |
| --- | --- | --- | --- | --- |
| Kaiwa | Slack | 5 サービス | 8 サービス | リアルタイム配信。Durable Object が接続を持って配るか、接続 ID を DynamoDB に置いて接続ごとに API を呼ぶか |
| Sen | Linear | 4 | 8 | 同期の通知と、待機中の接続の費用（WebSocket Hibernation） |
| Facette | カオナビ | 2 | 6 | 画面と API が 1 つのオリジンにあり、本番とデモを設定だけで分けられる |
| Minamo HR | ジョブカン、freee 人事労務 | 4 | 8 | DB への接続（VPC・RDS Proxy が要らない）と、使わない時間の費用 |
| DevPuzzle | RoboZZle | 2 | 6 | 構成の単純さ。一方で Node.js 互換フラグとレート制限の制約がある |
| STELLA | なし（法人向けの LMS） | 4 | 8 | 応答後の処理。waitUntil で続けるか、SQS と別の Lambda を足すか |

- データ: `src/data/works.ts` の `architecture`
- 表示: `src/components/works/ArchitectureComparison.astro`
- サービスの名前とアイコン: `src/data/cloud-services.ts`、`public/icons/cloud/`
  - AWS は AWS Architecture Icons（npm の `aws-icons` 3.3.0 から）
  - Cloudflare は cloudflare-docs の `src/icons`（CC BY 4.0）。色を Cloudflare のオレンジに変えた。クレジットは図の下に出す
- サービスの数は、利用者と外部サービス（Google ログインなど）を除き、同じアイコンのもの（API Gateway の HTTP と WebSocket）は 1 つと数える

## 5. 残っている課題

- スキルのデータ（`src/data/skills/*.ts`）に、削除・非公開のリポジトリへのリンクが残っている: `saedgewell`、`kouden`（非公開）、`skill-quest-ai`、`estimate-agent`、`development-tools`、`gh-activitylog-server`、`lightning-mock`、`review-mcp-server`、`robbozle-game`、`algo-trade`
- 外した実績の画像（`public/images/works/` の skill-quest-ai・career-gems・kaki-map-hero・paper-ocr-tool・robbozle-game・saedgewell・ofunato-mokumoku の旧サムネイル）は残している。再掲載しないと決めたら消す

## 6. 大船渡もくもく会の公開サイトの対応

会を終えている前提の手順。続けている場合は 1 と 2 の代わりに、カレンダーの API キーを直す。

1. 申し込みを止める: 申し込みのページと「参加する」のボタンを外し、トップに「活動は終了しました」と出す。`main` に push すれば Cloudflare Pages に反映される
2. スケジュールを外す: カレンダーの API が 400 を返して空になっているので、スケジュールのページと「次回のもくもく会」を外す
3. 集めた個人情報を片付ける: Firebase のコンソールで Firestore の `signups` を確かめ、要らなければ書き出してから消す。残すなら、セキュリティルールで誰も読めない（書き込みだけ許す、または書き込みも止める）ことを確かめる
4. API キーを絞る: Firebase と Google Calendar の API キーはサイトの JavaScript から読めるので、Google Cloud のコンソールで HTTP リファラーを `ofunato-mokumoku.pages.dev` に限る。使わないキーは無効にする
5. 細かい直し: README を内容に合わせる。届かないお問い合わせのフォームと、開けないレポートのリンクを外す
6. 終わったら、ポートフォリオの実績に公開サイトへのリンクを戻す

## 7. 撮影の方法（撮り直すとき）

- ビューポート 1440x795・DPR 2 で撮り、WebP（幅 1920）にした。実績カードの枠と同じ比率
- ログインが要るアプリは、アプリに用意された開発用ログインか、ローカルの D1 に入れたテスト用のセッションで入った。Google には接続していない
- Windows ではクローン先のパスが長いと、workerd・esbuild・ローカル D1 の SQLite が 260 文字の上限で失敗する。短いパスに置くか、`--persist-to` と `persistState` で状態の保存先を短くする
