import type { Impact, ImpactKind, Work, WorkCategory } from '@/types/works';

/**
 * 区分の表示ラベル（並びは絞り込みのタブの順）
 */
export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  client: '客先案件',
  internal: '社内ツール',
  training: '人材育成',
  contract: '受託',
  personal: '個人開発',
};

export const WORK_CATEGORIES = Object.keys(WORK_CATEGORY_LABELS) as WorkCategory[];

/**
 * 数値の種類の表示ラベルと説明
 */
export const IMPACT_KIND_LABELS: Record<ImpactKind, { label: string; description: string }> = {
  measured: { label: '実測', description: '実際に測った値' },
  estimated: { label: '試算', description: '単価や人数から計算した見込み' },
  target: { label: '目標', description: '計画時に置いた値' },
};

/** Cloudflare だけで動かしているアプリのインフラ費 */
const nearZeroInfra: Impact = { label: 'インフラ費', value: '≈0', unit: '円/月', kind: 'measured', note: 'Cloudflare で運用' };

/**
 * 実績データ
 *
 * 客先案件は NDA に配慮し、企業名を「業界＋規模」で表す（masked: true）。
 * 数値は実測・試算・目標のどれかを kind で必ず示す。値が分からないものは載せない。
 */
export const works: Work[] = [
  // 客先案件
  {
    slug: 'telecom-ai-dlc',
    title: '大手通信事業会社 AI-DLC 導入推進',
    description: '2 チームの AI 活用を共通の進め方にそろえ、4ヶ月で本番導入から引継ぎまで完遂',
    category: 'client',
    status: 'published',
    period: { start: '2026-07', end: '2026-10' },
    industry: '情報通信（電力サービス開発）',
    role: 'AI-DLC 導入リード',
    team: '2 チーム 11 名（開発 7・PO 3・SM 1）／推進は 1 名',
    masked: true,
    technologies: ['Claude Code', 'GitHub Copilot', 'AWS AI-DLC', 'VS Code 拡張', 'MCP（Jira / Confluence）', 'GitHub Actions', 'Python', 'AWS'],
    github_url: null,
    website_url: null,
    featured: 1,
    goal: '各自バラバラだった AI 活用を 2 チーム共通の進め方にそろえ、通常開発を止めずに生産性を上げる。試験導入で終わらせず本番運用まで持っていき、自分がいなくても回る状態で引き継ぐ。',
    challenges: [
      'AI の使い方と成果がメンバーごとにバラバラだった',
      'AI-DLC の公式ワークフローが英語で手順も多く、そのままではチームで使いにくかった',
      '新しい進め方への心理的な抵抗があった',
      'AI 活用の効果を測る指標がなかった',
      'リリース工程に手作業が残っていた',
      '導入・運用を担えるのが自分だけだった',
    ],
    approach: [
      { title: '導入計画とロードマップを作り、2 チーム並行で導入できる体制を整えた', detail: 'PO と開発サイクルを合意し、スクラムに AI-DLC を組み込む進め方を設計' },
      { title: 'モブプログラミングで伴走し、段階的に定着させた', detail: '参加基準をはっきりさせ、抵抗感を下げる' },
      { title: '公式ワークフローをチームで使える形にする VS Code 拡張を開発した', detail: 'AI の利用コストを見える化する拡張もあわせて開発' },
      { title: 'KPI を決めて計測を自動化し、スプリントごとに改善を決める流れを作った', detail: '測る → 振り返る → 見つける → 直す' },
      { title: 'Jira・Confluence を MCP でつなぎ、既存の情報を AI から参照できるようにした' },
      { title: 'デプロイまでを自動化する CI/CD を作り、業務代替の Skill とナレッジで引き継いだ' },
    ],
    impacts: [
      { label: 'AI-DLC の適用範囲', before: '40.8%', value: '100', unit: '%', kind: 'measured', note: '3ヶ月', bars: [40.8, 100] },
      { label: 'ベロシティ', value: '2', unit: '倍', kind: 'measured', note: 'タスクによる最大値' },
      { label: '本番導入した人数', value: '11', unit: '名', kind: 'measured', note: '2 チーム' },
      { label: '引継ぎ用のナレッジ', value: '127', unit: 'ページ', kind: 'measured', note: '更新 568 回' },
    ],
    basis: [
      { label: '適用範囲', method: 'スプリントのタスクのうち AI-DLC で進めた割合。KPI 計測を自動化して毎スプリント集計' },
      { label: 'ベロシティ', method: '導入前後のスプリントのポイント。タスクの種類による最大値' },
      { label: 'ナレッジ', method: 'Confluence のページ数と更新履歴' },
    ],
  },
  {
    slug: 'sd-llm-sales-analysis',
    title: 'システムダイナミクス × LLM 営業分析アプリ',
    description: '専門知識がない営業担当でも、分析結果を意思決定に使えるようにする',
    category: 'client',
    status: 'published',
    period: { start: '2026-05', end: '2026-06' },
    industry: '営業分析',
    role: 'システムエンジニア',
    team: '5 名',
    masked: true,
    technologies: ['Python', 'LLM'],
    github_url: null,
    website_url: null,
    goal: 'システムダイナミクスの専門知識がない営業担当でも、分析結果を読み解いて意思決定に使えるようにする。',
    challenges: [
      'システムダイナミクスはモデルの構築・解釈に専門知識が要り、営業担当がそのまま使うのは難しい',
      '過去の推論結果と現在の分析結果が分断され、判断に要る文脈が途切れていた',
      '推論結果の参照・統合の流れに、設計上の課題が残ったままだった',
    ],
    approach: [
      { title: '分析結果を自然言語で解釈・提示する構成を設計した' },
      { title: '過去の推論結果を参照しながら、現在の分析結果に統合する AI エージェント機能を実装した' },
    ],
    impacts: [
      { label: '参画から AI エージェント機能のリリースまで', value: '2', unit: '週間', kind: 'measured', note: '期間 2ヶ月のうち 1/4' },
    ],
  },
  {
    slug: 'automotive-adas-tool',
    title: 'OSS ベース 自動運転（AD/ADAS）開発支援ツール',
    description: '高頻度で更新される OSS への追随コストを下げ、チームの手を独自機能の開発に回す',
    category: 'client',
    status: 'published',
    period: { start: '2025-07', end: '2026-03' },
    industry: '製造業（自動車）',
    role: 'システムエンジニア（フルスタック）',
    team: '全体 数百名／担当チーム 約 10 名',
    masked: true,
    technologies: ['Next.js', 'React', 'Electron', 'Python', 'Node.js', 'AWS CDK', 'GitHub Actions'],
    github_url: null,
    website_url: null,
    goal: '高頻度でリリースされる OSS への追随コストを下げ、約 10 名のチームの手を独自機能の開発に回す。',
    challenges: [
      'ベースの OSS のリリースが多く、独自機能とのマージ・追随に工数がかかっていた',
      '走行データ表示アプリ（OSS）と独自のデータ管理アプリが分かれ、作業の導線が途切れていた',
      '大規模プロジェクトのため、デプロイと環境構築の再現性が欠かせなかった',
    ],
    approach: [
      { title: 'OSS の更新を取り込みながら独自機能を保てるブランチ戦略と CI/CD を設計した' },
      { title: 'GitHub Actions と AWS CDK で、マージ・テスト・ビルド・デプロイを自動化した' },
      { title: '走行データ表示アプリを Electron ベースのデータ管理アプリに統合した' },
      { title: '新機能の画面はプロトタイプで先に合意し、手戻りを減らした' },
    ],
    impacts: [
      { label: '計画に対する開発期間', value: '1/2', kind: 'measured' },
      { label: '担当範囲を保ったままの業務量', value: '1/3', kind: 'measured', note: 'CI/CD 自動化による' },
    ],
  },

  // 社内ツール
  {
    slug: 'agora',
    title: 'Agora',
    subtitle: '仮想オフィス（oVice の代替）',
    description: '事業部で契約している oVice を自社開発に置き換える仮想オフィス',
    category: 'internal',
    status: 'published',
    period: { start: '2026-09' },
    industry: 'アーシャルデザイン 社内',
    role: '設計・開発',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'Durable Objects', 'D1', 'GitHub Actions'],
    github_url: null,
    website_url: null,
    featured: 2,
    goal: '事業部で契約している oVice を自社開発に置き換えて費用をなくし、客先常駐で生まれにくい社員どうしの接点を作る。',
    approach: [
      { title: '2.5D のオフィスマップで移動・在席確認・近接音声の通話・チャットができるようにした', detail: '人が出会いやすいよう、各エリアを縮めたマップにした' },
      { title: '勤怠の打刻と、監査ログ・不審なログインを確認できる管理画面を用意した' },
      { title: 'Cloudflare Workers と Durable Objects でリアルタイム通信を処理し、インフラ費をほぼ 0 にした' },
      { title: 'staging で検証してから本番へ反映する CI/CD を作った' },
    ],
    impacts: [
      nearZeroInfra,
      { label: 'oVice からの置き換え', value: '2027.05', kind: 'target', note: '開発ラボ G で並行稼働を経て' },
    ],
  },
  {
    slug: 'tb-palette',
    title: 'TB パレット',
    subtitle: '要員管理ツールのリプレイス',
    description: 'GAS 製の要員管理システムを作り直し、面談・フォロー・アサインを一元管理',
    category: 'internal',
    status: 'published',
    period: { start: '2026-06' },
    industry: 'アーシャルデザイン 社内',
    role: '設計・開発',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'Drizzle ORM', 'Better Auth', 'MCP'],
    github_url: null,
    website_url: null,
    goal: '研修生・エンジニアの面談記録・フォロー・案件アサイン・休職履歴を一元管理し、離職リスクの早期検知とフォロー漏れの防止につなげる。',
    approach: [
      { title: 'GAS 製の旧システムを、React・Hono・D1 の構成で作り直した' },
      { title: '旧データ（Firestore）から差分だけを定期的に取り込む移行の仕組みを作った' },
      { title: 'Google ログインと権限、面談記録を登録する MCP 連携を用意した' },
    ],
    impacts: [nearZeroInfra],
  },
  {
    slug: 'tb-force',
    title: 'TB Force',
    subtitle: 'SES 営業の名刺管理・架電',
    description: '名刺の撮影・読み取りから架電・フォローまでをつなぐ営業向けツール',
    category: 'internal',
    status: 'published',
    period: { start: '2026-07' },
    industry: 'アーシャルデザイン 社内',
    role: '設計・開発',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'Claude API', 'Gmail API'],
    github_url: null,
    website_url: null,
    goal: '名刺の入力と、架電・フォローの管理にかかる営業の手間を減らし、連絡漏れをなくす。',
    approach: [
      { title: 'スマートフォンで名刺を撮影し、生成 AI で読み取って確認・保存できるようにした' },
      { title: 'PC とスマートフォンを連動させた架電モードと、次回連絡日のカレンダー登録を用意した' },
      { title: '非エンジニアでも「いつ・もし・なにをする」を選んで作業を自動化できるようにした' },
    ],
  },
  {
    slug: 'falcon-auto-review',
    title: 'Falcon Auto Review',
    subtitle: '研修課題の自動レビュー',
    description: '研修課題の提出物を、評価基準とお手本コードに基づいて LLM でレビュー',
    category: 'internal',
    status: 'published',
    period: { start: '2026-05' },
    industry: 'アーシャルデザイン 社内',
    role: '設計・開発',
    technologies: ['TypeScript', 'React', 'Cloudflare Workers', 'Hono', 'Claude API', 'IndexedDB'],
    github_url: null,
    website_url: null,
    goal: 'エンジニア養成カリキュラム（FALCON）で、講師が提出課題をレビューする時間を減らし、フィードバックを早く返す。',
    approach: [
      { title: '提出された zip を置くだけで、評価基準とお手本コードに基づく LLM レビューを実行できるようにした' },
      { title: 'レビュー結果からチャットに貼るコメントまで作れるようにした' },
      { title: 'API キーをサーバー側で扱い、講師は Google ログインだけで使えるようにした' },
    ],
  },

  // 人材育成
  {
    slug: 'internal-oss',
    title: '社内 OSS',
    description: '社内で使うツールを、OSS の進め方でチーム開発する育成の取り組み',
    category: 'training',
    status: 'published',
    period: { start: '2026-04', end: '2026-08' },
    industry: 'アーシャルデザイン 社内',
    role: '推進・レビュー',
    team: '4 名',
    technologies: ['GitHub', 'TypeScript', 'React', 'Supabase'],
    github_url: null,
    website_url: null,
    featured: 3,
    goal: '客先常駐では得にくい「チームで設計し、レビューを受けて本番で使う」経験を、社内で積めるようにする。',
    approach: [
      { title: '社内で使うツールを題材に、Issue・PR・レビューの流れでチーム開発した' },
      { title: '週 1 回の定例を軸に、要件定義からインフラまで一通りの工程を経験できる形にした' },
      { title: '振り返りで見えた課題（作業の偏り・使う人がいない・完成の基準がない）を、次の開発ラボ G の設計に反映した' },
    ],
    impacts: [
      { label: 'マージした PR', value: '42', unit: '件', kind: 'measured', note: '3.5ヶ月' },
      { label: '参加者の継続率', value: '100', unit: '%', kind: 'measured', note: '4 名' },
      { label: '定例', value: '16', unit: '回', kind: 'measured', note: 'ほぼ週 1 回' },
      { label: '稼働した社内ツール', value: '1', unit: '件', kind: 'measured', note: '日程調整アプリ' },
    ],
  },
  {
    slug: 'development-lab',
    title: '開発ラボ G',
    description: '事業部で使うツールを題材に、実案件に近い経験を積む育成の場',
    category: 'training',
    status: 'published',
    period: { start: '2026-12' },
    industry: 'アーシャルデザイン 社内',
    role: '運営・メンター',
    technologies: ['TypeScript', 'Cloudflare', 'モブワーク'],
    github_url: null,
    website_url: null,
    goal: '事業部で実際に使うツールを題材に、実案件に近い経験を積む育成の場を作る。工程を一周できる人を安定して増やす。',
    approach: [
      { title: '題材を Agora（oVice の代替）に決め、5 つの段階とクリア条件、6ヶ月の計画を設計した' },
      { title: 'サバイバル TypeScript に沿った事前課題で、参加に要る基礎をそろえる' },
      { title: 'モブワークで手本を見せ、ドライバー役を段階的にメンバーへ渡す' },
    ],
    impacts: [
      { label: 'oVice からの置き換えと運用の引継ぎ', value: '2027.05', kind: 'target', note: '第 1 期' },
    ],
  },

  // 受託（フリーランス）
  {
    slug: 'printing-erp',
    title: '印刷会社 HP・業務システム・W2P',
    description: 'LLM による自動見積もり・CMS 付き ERP・決済付き入稿アプリを一体で開発',
    category: 'contract',
    status: 'published',
    period: { start: '2025-03', end: '2025-06' },
    industry: '製造業（印刷）',
    role: '要件定義〜保守（1 名）',
    thumbnail: '/images/works/printing-erp.webp',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'RAG', 'GCP Translation API', 'PayPay API', 'Resend'],
    github_url: 'https://github.com/otomatty/printing-erp',
    website_url: null,
    goal: '見積もり対応と入稿の手間を減らし、HP から受注までをひとつながりにする。',
    approach: [
      { title: 'RAG とプロンプトの調整で、LLM による自動見積もりを作った' },
      { title: 'CMS 機能を含む ERP と、PayPay 決済付きの顧客向け入稿アプリを一体で開発した' },
      { title: 'AI 駆動開発で、要件定義から 1 週間で公開までこぎつけた' },
    ],
    impacts: [
      { label: '要件定義から 35 ページの公開まで', value: '1', unit: '週間', kind: 'measured' },
      { label: '初期投入までの工数', value: '約90', unit: '%削減', kind: 'measured', note: '予定比' },
    ],
  },
  {
    slug: 'farm-shift',
    title: '農業テーマパーク LINE 連携シフト管理',
    description: 'LINE と口頭で集めていたシフト希望を、Web アプリと LINE 通知に一元化',
    category: 'contract',
    status: 'published',
    period: { start: '2025-03', end: '2025-06' },
    industry: '小売・サービス',
    role: '要件定義〜保守（1 名）',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'LINE Messaging API'],
    github_url: null,
    website_url: null,
    goal: 'LINE のグループや口頭で集めていたシフト希望をなくし、運営側の集計と連絡の漏れを減らす。',
    approach: [
      { title: 'シフト希望をテンプレート化し、Web アプリで集めるようにした' },
      { title: 'シフトの変更を LINE へ自動で通知するようにした' },
    ],
  },
  {
    slug: 'construction-progress',
    title: '建設会社 案件進捗・請求管理',
    description: 'Excel 運用の案件進捗・請求管理を Web アプリへ移行',
    category: 'contract',
    status: 'published',
    period: { start: '2024-11', end: '2024-12' },
    industry: '建設',
    role: '要件定義〜保守（1 名）',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Figma', 'Google Sheets API'],
    github_url: null,
    website_url: null,
    goal: 'Excel 運用の属人化をなくし、進捗確認と請求の手間を減らす。',
    approach: [
      { title: '案件進捗・請求管理を Web アプリへ移した' },
      { title: 'スプレッドシートと双方向に同期し、既存の勤怠の運用を崩さずにデジタル化した' },
      { title: 'ダッシュボードで進捗を見える化した' },
    ],
  },
  {
    slug: 'fresh-inventory',
    title: '菓子製造会社 流通管理システム UI 改善',
    description: '20 拠点の流通管理システムの操作導線を作り直し、注文時間を短縮',
    category: 'contract',
    status: 'published',
    period: { start: '2024-09', end: '2025-01' },
    industry: '製造業（食品）',
    role: '要件定義〜運用（1 名）',
    thumbnail: '/images/works/fresh-inventory.webp',
    technologies: ['Next.js', 'TypeScript', 'Blueprint.js'],
    github_url: null,
    website_url: 'https://sweet-stock-guard.lovable.app',
    featured: 4,
    goal: '直営店・工場・倉庫の 20 拠点で毎日発生する注文作業を速くする。',
    approach: [
      { title: '業務の流れに沿って操作導線を設計し直した' },
      { title: '件数の多い一覧に仮想スクロールを入れた' },
    ],
    impacts: [
      { label: '1 回の注文時間（平均）', before: '5分', value: '1', unit: '分', kind: 'measured', note: '約 80% 短縮', bars: [5, 1] },
    ],
  },
  {
    slug: 'materials-hp-prototype',
    title: '建設資材商社 HP リニューアル プロトタイプ',
    description: '複数のヘッドレス CMS をプロトタイプで比べ、HP リニューアルの技術選定を支援',
    category: 'contract',
    status: 'published',
    period: { start: '2024-09', end: '2024-12' },
    industry: '商社',
    role: '要件定義〜プロトタイプ（1 名）',
    technologies: ['Solid.js', 'Remix', 'Tailwind CSS', 'microCMS', 'Newt', 'Kuroco'],
    github_url: null,
    website_url: null,
    goal: '作る前に技術選定の失敗リスクを下げる。',
    approach: [
      { title: '複数のヘッドレス CMS とフレームワークを、プロトタイプで比べた' },
      { title: 'note の RSS から自社ブログを自動で更新する仕組みも作った' },
      { title: '検証レポートとプロトタイプを納品した' },
    ],
  },
  {
    slug: 'lms-planning',
    title: '教材共有・チャット Web アプリ 企画・設計',
    description: '要件定義を主導し、投資対効果に見合う範囲に開発スコープを絞った',
    category: 'contract',
    status: 'published',
    period: { start: '2024-08', end: '2024-10' },
    industry: '教育',
    role: 'PM 兼エンジニア（1 名）',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    github_url: null,
    website_url: null,
    goal: '投資対効果に見合う範囲に開発スコープを絞り、次のフェーズに進める状態を作る。',
    approach: [
      { title: '要件定義の打ち合わせを主導し、ROI の試算で優先順位を付けた' },
      { title: 'API 仕様書・画面遷移図・DB 設計書を一式納品した' },
    ],
  },
  {
    slug: 'cram-school-system',
    title: '学習塾 CMS・勤務記録システム',
    description: '講師の勤怠集計・給与計算と教材準備の手間をなくした',
    category: 'contract',
    status: 'published',
    period: { start: '2023-04', end: '2024-04' },
    industry: '教育',
    role: '要件定義〜実装（1 名）',
    technologies: ['React', 'TypeScript', 'Hono', 'styled-components', 'Firebase', 'Google Apps Script'],
    github_url: null,
    website_url: null,
    goal: '講師の勤怠集計・給与計算と教材準備にかかる手間をなくす。',
    approach: [
      { title: 'お知らせを配信する CMS の API を Hono で作った' },
      { title: '勤務記録の画面を作り、集計と給与計算を自動化した' },
      { title: 'GAS で既存の問題データから問題プリントを自動で作れるようにした' },
    ],
    impacts: [
      { label: '勤怠集計・給与計算の作業時間', before: '月20時間', value: '1', unit: '時間未満', kind: 'measured', bars: [20, 1] },
      { label: '作業時間の削減率', value: '95', unit: '%以上削減', kind: 'measured' },
    ],
  },
  {
    slug: 'website-production',
    title: 'Web サイト制作（学習塾・製パン店ほか）',
    description: 'ヒアリングから設計・実装・運用アドバイスまで一貫して対応',
    category: 'contract',
    status: 'published',
    period: { start: '2020-11', end: '2022-09' },
    industry: '教育、小売・サービス ほか',
    role: '要件定義〜運用（1 名）',
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'jQuery', 'WordPress'],
    github_url: null,
    website_url: null,
    goal: 'クライアントが自分でサイトを更新できる体制を作る。',
    approach: [
      { title: 'WordPress の REST API で動的にコンテンツを配信した' },
      { title: 'クライアントが自分で更新できる CMS の運用の流れを作った' },
      { title: 'セマンティックな HTML とレスポンシブ対応で SEO の土台を整えた' },
    ],
  },

  // 個人開発
  {
    slug: 'kouden',
    title: '香典帳アプリ',
    description: '香典の記帳・集計・香典返しをまとめて管理できるアプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2025-01' },
    thumbnail: '/images/works/kouden-thumbnail.webp',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    github_url: null,
    website_url: 'https://kouden.app',
    goal: '葬儀後の香典の記帳・集計・香典返しの手間を減らす。葬儀会社 2 社とギフトショップとの共同開発として始め、権利が戻ってからは個人のプロダクトとして改善を続けている。',
    approach: [
      { title: '3 社の業務の流れをまとめるデータモデルと、Supabase の RLS による権限制御を作った' },
      { title: '香典帳のデータを使ったギフトのおすすめと、Stripe の決済を入れた' },
    ],
    impacts: [
      { label: '試験運用で「とても使いやすかった」', value: '93', unit: '%', kind: 'measured' },
    ],
  },
  {
    slug: 'stella',
    title: 'STELLA',
    subtitle: '未経験エンジニア向けの研修 LMS',
    description: '教材・確認クイズ・VS Code での課題と AI の一次レビューをまとめた研修 LMS',
    category: 'personal',
    status: 'published',
    period: { start: '2026-05' },
    thumbnail: '/images/works/stella-1.webp',
    screenshots: [
      { src: '/images/works/stella-1.webp', caption: '受講者のホーム。講座を星で並べたスキルツリーと「次にやること」の案内' },
      { src: '/images/works/stella-2.webp', caption: '講座の詳細。課題を VS Code で開き、手元で合格 → AI が確認中 → 合格と進む' },
      { src: '/images/works/stella-3.webp', caption: 'スライドの教材。左に講座の進み具合とレッスンの一覧' },
      { src: '/images/works/stella-4.webp', caption: '確認クイズの採点結果。選んだ答えと正解、解説を並べる' },
    ],
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'R2', 'Drizzle ORM', 'Claude API'],
    github_url: 'https://github.com/otomatty/stella',
    website_url: null,
    goal: '未経験から現場に出るエンジニアの研修を、教材・演習・採点・レビュー・修了まで 1 つの仕組みで回す。講師が必ず見るのは AI が人に回した提出だけにして、人の時間をつまずきの解消に使う。勤務先での研修や育成の経験から学んだことをもとに、個人の開発として一から作った。',
    features: [
      '講座を星で並べたスキルツリーのホーム。修了すると次の星が開き、先の講座は霧で隠す',
      'トピックごとのスライドとまとめ、配布 PDF。Windows と macOS で違う手順はタブで切り替える',
      'レッスンごとの確認クイズと、間隔を空けて出し直すデイリー復習',
      'VS Code 拡張で課題を手元に配り、テストと lint を手元で実行してから提出する',
      '提出を Claude がルーブリックで一次レビューし、確信度が低いものだけ講師に回す',
      '招待制のユーザー管理、成績台帳の CSV、修了証の自動発行と公開検証、監査ログ',
    ],
    highlights: [
      { title: 'サーバーでは受講者のコードを実行しない', detail: '合否の材料は受講者の手元での実行結果にし、拡張は課題ごとに決めた手順だけを、信頼したフォルダーでだけ動かす' },
      { title: 'AI に任せる範囲を、確信度のしきい値で決める', detail: 'API キーが無い・時間切れ・形式の誤りのときは自動で合格にせず、人に回す' },
      { title: '講師の確認を待つあいだは、AI の所見を受講者に見せない' },
      { title: '教材はリポジトリの Markdown を正本にする', detail: '導入前の用語を使うとビルドが落ちる検査を通してから、D1 に入れる' },
      { title: 'つまずきを講師に知らせる', detail: '手元の失敗が続く・数日進まないなどを 15 分ごとに検知して通知する。AI には集計値だけを渡し、名前やコードは渡さない' },
    ],
    techFeatures: [
      { title: 'Web・API・VS Code 拡張が、課題の型と採点の規則を共有するモノレポ' },
      { title: 'JavaScript と SQL の演習を、ブラウザーと拡張の中で採点する', detail: 'QuickJS（WASM）と sql.js を使う。基本情報の擬似言語も JavaScript に変換して同じ仕組みで動かす' },
      { title: 'D1 の制約に合わせて書き込む', detail: '進捗は batch で 1 回にまとめて書き、デプロイごとの教材の投入は内容が変わった行だけを書く' },
      { title: 'Web の Worker が /api/* を Service Bindings で API の Worker に中継し、ログインの Cookie を同じオリジンで持つ' },
    ],
    impacts: [
      nearZeroInfra,
      { label: '教材のある講座', value: '7', unit: '講座', kind: 'measured', note: '443 トピック' },
      { label: 'D1 のマイグレーション', value: '67', unit: '本', kind: 'measured' },
    ],
    basis: [
      { label: '講座', method: '教材のフォルダーの数から、案内だけの「準備中」23 講座を除いた。トピックはスライドのファイルの数' },
    ],
    architecture: {
      cloudflare: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面と VS Code 拡張' }] },
          { label: '配信・API', zone: 'エッジ', nodes: [{ service: 'cloudflare-workers', role: '画面の配信と Hono の API。2 つの Worker を Service Bindings でつなぐ' }] },
          {
            label: 'データ・ファイル',
            nodes: [
              { service: 'cloudflare-d1', role: '受講・進捗・提出・レビュー・監査ログ' },
              { service: 'cloudflare-r2', role: '教材・提出物・本棚の PDF（バケット 3 つ）' },
            ],
          },
          { label: '定期処理', nodes: [{ service: 'cloudflare-cron', role: '15 分ごとに、残りのレビューとつまずきの検知' }] },
          { label: '外部', nodes: [{ service: 'llm', role: 'Claude。呼び出しは AI Gateway を通す' }] },
        ],
        note: '提出を受けたら応答を返してから、waitUntil で AI の一次レビューを続ける。取りこぼしは 15 分ごとの Cron が拾う。',
      },
      aws: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面と VS Code 拡張' }] },
          {
            label: '配信',
            zone: 'エッジ',
            nodes: [
              { service: 'aws-cloudfront', role: '画面と教材の配信、/api/* の振り分け' },
              { service: 'aws-s3', role: '画面と教材' },
            ],
          },
          {
            label: 'API',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-api-gateway', role: 'HTTP API' },
              { service: 'aws-lambda', role: 'Hono の API と AI レビュー' },
            ],
          },
          {
            label: 'データ・ファイル',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-aurora', role: '受講・進捗・提出。RDS Proxy 経由でつなぐ' },
              { service: 'aws-s3', role: '提出物と本棚（非公開のバケット）' },
            ],
          },
          {
            label: '非同期・定期処理',
            nodes: [
              { service: 'aws-sqs', role: '提出を受けたあとの AI レビューを積む' },
              { service: 'aws-eventbridge', role: '15 分ごとの定期処理を起動' },
            ],
          },
          { label: 'AI', nodes: [{ service: 'aws-bedrock', role: 'Claude' }] },
        ],
        note: 'Lambda は応答を返したあとに処理を続けられないので、キューと別の Lambda を足す。',
      },
      differences: [
        {
          aspect: '応答後の処理',
          cloudflare: 'waitUntil で、応答を返したあとに AI レビューを続ける。キューを足さずに済む',
          aws: 'SQS に積み、別の Lambda で処理する',
        },
        {
          aspect: '同じオリジンの API',
          cloudflare: 'Web の Worker が Service Bindings で API の Worker に中継する',
          aws: 'CloudFront のパス別のオリジンで、/api/* を API Gateway に振り分ける',
        },
        {
          aspect: '費用と制約',
          cloudflare: 'D1 の無料枠の書き込み上限に合わせ、教材の投入は変わった行だけを書く。対話的なトランザクションが無いので batch で書く',
          aws: 'Aurora の容量の課金と、Lambda からの接続の管理が要る',
        },
        {
          aspect: 'レート制限',
          cloudflare: 'Rate Limiting のバインディングを 4 種類、コードから呼ぶ',
          aws: 'WAF のレートベースルールと API Gateway のスロットリングを組み合わせる',
        },
        {
          aspect: 'AI の呼び出し',
          cloudflare: 'AI Gateway を通し、呼び出しのログと上限を Cloudflare で見る',
          aws: 'Bedrock で Claude を呼び、ログは CloudWatch で見る',
        },
      ],
    },
  },
  {
    slug: 'minamo-hr',
    title: 'Minamo HR',
    subtitle: '人事労務アプリ',
    description: '勤怠・人事・給与計算・経費精算・ワークフローを 1 つにまとめた人事労務アプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    thumbnail: '/images/works/minamo-hr-1.webp',
    screenshots: [
      { src: '/images/works/minamo-hr-1.webp', caption: 'ホーム。打刻と今日のタイムライン、今月の勤務、有給の残り、承認待ち、最新の給与明細を 1 画面にまとめる' },
      { src: '/images/works/minamo-hr-2.webp', caption: '月次の勤怠表。日ごとの勤務を 24 時間のルーラーで描き、残業・深夜・遅刻を自動で集計する' },
      { src: '/images/works/minamo-hr-3.webp', caption: '経費精算の多段承認。上長の承認とコメントのあと、人事労務の承認を待っている' },
      { src: '/images/works/minamo-hr-4.webp', caption: 'Web 給与明細。勤怠に連動した割増賃金と、社会保険料・源泉所得税・住民税の控除' },
    ],
    cloneOf: 'ジョブカン、freee 人事労務 などの人事労務 SaaS',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'R2', 'Cron Triggers', 'Better Auth'],
    github_url: 'https://github.com/otomatty/minamo-hr',
    website_url: null,
    goal: '打刻から勤怠の締め・給与計算・明細の公開まで、申請から多段承認までという人事労務の流れを、Cloudflare の 1 つの Worker だけで動かす。社会保険料と源泉所得税は令和 8 年度の料率と税額表で計算する。',
    features: [
      'Web 打刻と月次の勤怠表。法定内・法定外の残業、深夜、法定休日を自動で集計し、36 協定の上限に近づくと色で知らせる',
      '有給休暇の自動付与（比例付与・2 年で失効）と、年 5 日の取得義務の管理',
      '従業員 DB。部署の階層と組織図、扶養家族、入社から退職までの人事履歴、書類の保管',
      '給与計算。割増賃金と欠勤控除、社会保険料、源泉所得税（甲欄・乙欄）、住民税。確定した明細は Web で本人が見られる',
      '多段承認のワークフロー（承認・差戻し・代理承認・一括承認）と、ノーコードで作れる申請フォーム',
      '経費精算。インボイス登録番号や交通費の区間、領収書の添付、仕訳 CSV',
    ],
    highlights: [
      { title: '勤怠・有休・社会保険・源泉所得税の計算を純粋関数にまとめ、画面と API で共有する', detail: '国税庁や協会けんぽの表の値と突き合わせるテストを 36 件書いた' },
      { title: '法令の細かい場合分けまで実装した', detail: '同月得喪、日割りの月の欠勤控除、法定休日にまたがる深夜勤務、厚生年金の上限の段階的な引き上げ。料率は適用開始月ごとに画面から足せる' },
      { title: '給与を確定する前に「要確認」を出す', detail: '退勤の打刻漏れや標準報酬月額の未設定がある明細に、印と理由を付ける' },
      { title: 'ログインできるのは、管理者が登録した従業員の Google アカウントだけにした', detail: '会社の登録前は、デプロイした人が指名したアカウントしか入れない。URL に先にたどり着いた人が管理者になるのを防ぐ' },
    ],
    techFeatures: [
      { title: '1 つの Worker で画面と API を配信する', detail: 'React の画面は静的アセット、/api/* だけ Hono に回す' },
      { title: 'D1 と R2 は初回のデプロイで自動で作られ、マイグレーションは最初のリクエストで流れる', detail: '初期構築は「シークレットを入れて deploy する」だけで済む' },
      { title: '有休の付与と在籍ステータスの更新を、Cron Triggers で毎日回す' },
      { title: 'R2 のファイルは、Worker で権限を確かめてから返す', detail: '領収書は本人・管理者・その申請の承認者だけが見られる。画像と PDF 以外は添付ファイルとして返す' },
    ],
    impacts: [
      nearZeroInfra,
      { label: 'API', value: '113', unit: '本', kind: 'measured' },
      { label: '計算ロジックのテスト', value: '36', unit: '件', kind: 'measured', note: '公的な表の値と突き合わせ' },
    ],
    basis: [
      { label: 'API', method: 'Hono のルートのハンドラーの数（認証ライブラリのものを除く）' },
      { label: '計算ロジックのテスト', method: '勤怠・社会保険・源泉所得税・給与の計算のテストの件数' },
    ],
    architecture: {
      cloudflare: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面。給与明細の PDF はブラウザの印刷で作る' }] },
          { label: '配信・API', zone: 'エッジ', nodes: [{ service: 'cloudflare-workers', role: '画面の配信と Hono の API。勤怠の集計・給与計算・CSV' }] },
          {
            label: 'データ・ファイル',
            nodes: [
              { service: 'cloudflare-d1', role: '従業員・勤怠・給与など 36 テーブルとセッション' },
              { service: 'cloudflare-r2', role: '領収書と従業員の書類' },
            ],
          },
          { label: '定期処理', nodes: [{ service: 'cloudflare-cron', role: '毎日 0:05 に有休の付与と在籍ステータスの更新' }] },
          { label: '外部', nodes: [{ service: 'google', role: 'ログイン' }] },
        ],
        note: 'D1 と R2 はバインディングで Worker から直接呼べる。VPC や DB の接続数を考えなくてよい。',
      },
      aws: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面' }] },
          {
            label: '配信',
            zone: 'エッジ',
            nodes: [
              { service: 'aws-cloudfront', role: '画面の配信' },
              { service: 'aws-s3', role: '画面' },
            ],
          },
          {
            label: 'API',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-api-gateway', role: 'HTTP API' },
              { service: 'aws-lambda', role: 'Hono の API と給与計算' },
            ],
          },
          {
            label: 'データ・ファイル',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-aurora', role: '従業員・勤怠・給与。RDS Proxy 経由でつなぐ' },
              { service: 'aws-s3', role: '領収書と書類' },
            ],
          },
          {
            label: '定期処理・認証',
            nodes: [
              { service: 'aws-eventbridge', role: '有休の付与と在籍ステータスの更新を起動' },
              { service: 'aws-cognito', role: 'Google をつなぎ、登録済みの人だけ通す' },
              { service: 'aws-secrets-manager', role: '認証の秘密鍵と Google のクライアント情報' },
            ],
          },
        ],
        note: 'Lambda から Aurora へつなぐため、VPC と RDS Proxy（または Data API）の設定も要る。',
      },
      differences: [
        {
          aspect: '部品の数と設定',
          cloudflare: 'Worker 1 つと wrangler.jsonc 1 つ',
          aws: '配信・API・DB・ファイル・スケジューラー・シークレットを別々に用意し、IAM でつなぐ',
        },
        {
          aspect: 'DB への接続',
          cloudflare: 'D1 をバインディングで直接呼ぶ',
          aws: 'Lambda から Aurora へは VPC の中で、RDS Proxy か Data API を通す',
        },
        {
          aspect: '使わない時間の費用',
          cloudflare: '社内の数十人が日中に打刻する程度なら、常にかかる費用はほぼない',
          aws: 'Aurora は止めない限り容量の課金が続く。0 まで下げると、再開の待ち時間が出る',
        },
        {
          aspect: '初期構築',
          cloudflare: 'D1・R2 は初回のデプロイで作られ、マイグレーションは起動時に流れる',
          aws: 'CDK などで VPC・DB・バケット・スケジューラーを作り、マイグレーションを別に流す',
        },
        {
          aspect: '手元の開発',
          cloudflare: 'Vite の dev サーバーの中で workerd・D1・R2 が動く',
          aws: 'DB とストレージのエミュレーターを組み合わせて用意する',
        },
      ],
    },
  },
  {
    slug: 'facette',
    title: 'Facette',
    subtitle: 'タレントマネジメント',
    description: '顔写真で社員を一覧し、評価・配置・サーベイをまとめて扱う人材管理アプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    thumbnail: '/images/works/facette-1.webp',
    screenshots: [
      { src: '/images/works/facette-1.webp', caption: '社員を顔のタイルで一覧し、氏名・部署・詳細条件で絞り込む' },
      { src: '/images/works/facette-2.webp', caption: '配置シミュレーション。組織図の上で顔を動かして異動案をつくり、部署ごとの増減を見る' },
      { src: '/images/works/facette-3.webp', caption: '配置バランス図。パフォーマンスとポテンシャルの 2 軸に社員を顔で並べる' },
      { src: '/images/works/facette-4.webp', caption: '評価期間の運用管理。ステップごとの進捗、ランク分布、評価シートの一覧' },
    ],
    cloneOf: 'カオナビ',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'Better Auth', 'TanStack Query', 'Playwright'],
    github_url: 'https://github.com/otomatty/facette',
    website_url: 'https://demo.facette.saedgewell.com',
    goal: '社員を名前ではなく顔で探せるようにし、人材情報・評価・配置・サーベイを 1 つのアプリで扱う。ロールごとの権限と匿名性を API 側で必ず検査する、業務で使える形を Workers と D1 だけで作る。',
    features: [
      '顔写真で一覧する人材データベース。検索・絞り込み・CSV の出力と取り込み、評価や 1on1・異動の履歴をまとめたプロフィールブック',
      '項目と、ロールごとの閲覧・編集の権限を管理画面で決めるシート。本人の変更申請を人事が承認する',
      '組織図の上で顔をドラッグして異動案をつくる配置シミュレーションと、2 軸に顔を並べる配置バランス図',
      '目標設定から最終確定までの評価ワークフロー。差し戻し、進捗、ランク分布',
      '匿名で集計するアンケートとパルスサーベイ、社員データのクロス集計とダッシュボード',
    ],
    highlights: [
      { title: '社員を出す場所には、必ず顔を添える', detail: '写真が無い社員には、シード値から決まるイラストのアバターを SVG で描く。実在の写真が無くてもデモが成り立つ' },
      { title: '本人に非公開の情報は、人事やマネージャーでも自分の分は見られない', detail: '検索・CSV・変更申請の審査まで含めて、API 側で除外する' },
      { title: '匿名アンケートは、個人を特定できない集計に限る', detail: '回答者を保存せず、回答 3 件未満の結果と少人数の部署の内訳は伏せる' },
      { title: '誰でも触れるデモを、本番と分けて公開する', detail: 'デモは 4 つのロールにワンクリックで入れ、毎日データを入れ直す。本番でデモ用のログインが拒否されることを CI で確かめる' },
    ],
    techFeatures: [
      { title: '画面と API を 1 つの Worker から配信する', detail: 'React の画面は静的アセット、/api/* だけ Worker を先に通す。開発中も Vite のプラグインで workerd と D1 の上で動く' },
      { title: '権限の判定を 1 か所にまとめ、API で必ず検査する', detail: '4 つのロールと、マネージャーの管轄（自部署の配下）を共通の関数で判定する。画面はボタンを出し分けるだけ' },
      { title: '複数行の更新は D1 の batch で原子的に行う', detail: '配置の反映や評価の確定など約 20 か所。途中で失敗しても中途半端な状態を残さない' },
      { title: 'D1 を含む API の結合テストを、Workers のランタイム上で回す', detail: 'API テスト 92 件と Playwright の E2E を GitHub Actions で通してからデプロイする' },
    ],
    impacts: [
      nearZeroInfra,
      { label: 'API', value: '141', unit: '本', kind: 'measured' },
      { label: 'テスト', value: '147', unit: '件', kind: 'measured', note: 'API 92・単体 34・E2E 21' },
    ],
    basis: [
      { label: 'API', method: 'Hono のルート定義の数（認証ライブラリのものを除く）' },
      { label: 'テスト', method: 'Workers のランタイムで動く API テスト、単体テスト、Playwright の E2E の件数' },
    ],
    architecture: {
      cloudflare: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面' }] },
          { label: '配信・API', zone: 'エッジ', nodes: [{ service: 'cloudflare-workers', role: '画面の配信と Hono の API。権限の検査と CSRF 対策' }] },
          { label: 'データ', nodes: [{ service: 'cloudflare-d1', role: '社員・評価など 45 テーブル、顔写真、ログインのセッション' }] },
          { label: '外部', nodes: [{ service: 'google', role: 'ログイン' }] },
        ],
        note: '画面と API が 1 つのオリジンにある。本番とデモは、Worker と D1 を wrangler.jsonc の環境で分けるだけ。',
      },
      aws: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面' }] },
          {
            label: '配信',
            zone: 'エッジ',
            nodes: [
              { service: 'aws-cloudfront', role: '画面の配信と、/api/* の振り分け' },
              { service: 'aws-s3', role: '画面' },
            ],
          },
          {
            label: 'API',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-api-gateway', role: 'HTTP API' },
              { service: 'aws-lambda', role: 'Hono の API と集計' },
            ],
          },
          {
            label: 'データ',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-aurora', role: '社員・評価など。検索は pg_trgm' },
              { service: 'aws-s3', role: '顔写真。署名付き URL で配信' },
            ],
          },
          { label: '認証', nodes: [{ service: 'aws-cognito', role: 'Google のフェデレーション' }] },
        ],
        note: '本番とデモで、CloudFront・API Gateway・Aurora・証明書のスタックをそれぞれ用意する。',
      },
      differences: [
        {
          aspect: 'オリジンとセキュリティ',
          cloudflare: '画面と API が 1 つのオリジン。Cookie のセッションと同一オリジン前提の CSRF 対策がそのまま成り立つ',
          aws: 'CloudFront で /api/* を API Gateway に振り分け、オリジンをそろえる設定が要る',
        },
        {
          aspect: 'DB と手元の開発',
          cloudflare: 'D1 は SQLite。開発・API テスト・E2E を手元の D1 で回し、デモデータを何度でも作り直せる',
          aws: '手元に PostgreSQL を用意し、Lambda からの接続は RDS Proxy か Data API で管理する',
        },
        {
          aspect: '本番とデモの分離',
          cloudflare: 'Worker と D1 を環境の設定で分けるだけ',
          aws: '環境ごとに CloudFront・API Gateway・Aurora・証明書をそろえる',
        },
        {
          aspect: '顔写真',
          cloudflare: 'D1 に BLOB で置き、更新日時を付けた URL で長期キャッシュする。規模が大きくなれば R2 に移す',
          aws: 'S3 に置き、CloudFront の署名付き URL で配信する',
        },
        {
          aspect: '認証',
          cloudflare: 'Better Auth を Worker の中で動かし、ユーザーとセッションも D1 に置く',
          aws: 'Cognito で Google をつなぐ。登録済みの人だけ通すには、トリガーの Lambda を書く',
        },
      ],
    },
  },
  {
    slug: 'kaiwa',
    title: 'Kaiwa',
    subtitle: 'チームチャット',
    description: 'Slack と同じ操作感を目指し、Cloudflare だけで動かすチームチャット',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    thumbnail: '/images/works/kaiwa-1.webp',
    screenshots: [
      { src: '/images/works/kaiwa-1.webp', caption: 'チャンネルの会話とスレッド。返信を右に開き、ほかのメンバーの入力中をリアルタイムに表示する' },
      { src: '/images/works/kaiwa-2.webp', caption: '日本語の全文検索。チャンネルと DM をまたいで、一致した語を強調する' },
      { src: '/images/works/kaiwa-3.webp', caption: '1 対 1 の DM。相手の在席（緑の点）と入力中の表示' },
      { src: '/images/works/kaiwa-4.webp', caption: 'ダークモード。コードブロック、未読の「新着」ライン、自分へのメンションの強調' },
    ],
    cloneOf: 'Slack',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'Durable Objects', 'D1', 'R2', 'Tailwind CSS'],
    github_url: 'https://github.com/otomatty/kaiwa',
    website_url: null,
    goal: 'Slack の主な操作（チャンネル、DM、スレッド、リアクション、検索、未読の管理）を再現し、画面の配信から API・リアルタイム配信・DB・ファイル保存までを Cloudflare の上で完結させる。',
    features: [
      'パブリック・プライベートのチャンネルと、1 対 1・グループの DM。ピン留め、ブックマーク、ミュート、アーカイブ',
      '記法・メンション・リアクション・ファイル添付付きのメッセージと、スレッド',
      '新着・編集・リアクション・入力中・在席状況のリアルタイムな反映',
      'チャンネルごとの未読数とメンション数、「新着」ライン、すべての未読ビュー',
      'チャンネルや送信者で絞り込める日本語の全文検索',
      '予約送信、リマインダー、カスタム絵文字、リンクのプレビュー、スラッシュコマンド 12 個',
    ],
    highlights: [
      { title: 'ワークスペースごとに 1 つの Durable Object で接続を束ねる', detail: '接続にユーザー ID のタグを付け、在席の状態は接続ごとに持たせる。接続の一覧を外部の表に書かずに済む' },
      { title: 'API の応答を配信で待たせない', detail: 'D1 に書いたあと、waitUntil の中で Durable Object の publish を呼ぶ。宛先はチャンネルのメンバーに絞る' },
      { title: '接続が切れても取りこぼさない', detail: '指数バックオフで再接続し、つながり直したら差分を取り直す' },
      { title: '日本語の部分一致で検索できる', detail: 'D1 の FTS5 を trigram で作り、3 文字以上は全文検索、2 文字以下は LIKE に切り替える' },
      { title: 'Google ログインを手元とテストで再現する', detail: 'OAuth をローカルのモックに差し替え、2 人が同時に操作する E2E を Google アカウントなしで回す' },
    ],
    techFeatures: [
      { title: 'WebSocket Hibernation と ping の自動応答で、待機中の接続のあいだ Durable Object を起こさない' },
      { title: '画面と API を 1 つの Worker で配信する', detail: 'React の画面は静的アセット、/api/* だけ Hono に回す' },
      { title: '添付ファイルは権限を確かめてから R2 から返す', detail: '画像・動画・PDF 以外はダウンロード扱いにし、CSP の sandbox で保存型 XSS を防ぐ' },
      { title: '予約送信とリマインダーを Cron Triggers で毎分配る' },
      { title: 'API と WebSocket 配信の統合テストを、本番と同じ workerd の上で走らせる', detail: 'CI で単体・統合・E2E を通してから、D1 のマイグレーションとデプロイをする' },
    ],
    impacts: [
      nearZeroInfra,
      { label: 'API', value: '69', unit: '本', kind: 'measured' },
      { label: 'テスト', value: '115', unit: '件', kind: 'measured', note: '単体 43・統合 49・E2E 23' },
    ],
    basis: [
      { label: 'API', method: 'Hono のルート定義を、メソッドとパスの組で数えた' },
      { label: 'テスト', method: '単体テスト、workerd 上の統合テスト、Playwright の E2E の件数' },
    ],
    architecture: {
      cloudflare: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面。WebSocket で 1 本つなぐ' }] },
          { label: '配信・API', zone: 'エッジ', nodes: [{ service: 'cloudflare-workers', role: '画面の配信と Hono の API。セッションと権限の確認' }] },
          {
            label: 'リアルタイム',
            zone: 'エッジ',
            nodes: [{ service: 'cloudflare-durable-objects', role: 'ワークスペースごとに接続を束ね、新着・在席・入力中をメンバーに配る' }],
          },
          {
            label: 'データ・ファイル',
            nodes: [
              { service: 'cloudflare-d1', role: '17 テーブルと全文検索（FTS5）' },
              { service: 'cloudflare-r2', role: '添付ファイル、プロフィール写真、絵文字' },
            ],
          },
          { label: '定期処理', nodes: [{ service: 'cloudflare-cron', role: '予約送信とリマインダーを毎分配る' }] },
        ],
        note: '接続の保持・在席の集計・宛先の絞り込みを、Durable Object のクラス 1 つ（約 200 行）に収めた。',
      },
      aws: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面' }] },
          {
            label: '配信',
            zone: 'エッジ',
            nodes: [
              { service: 'aws-cloudfront', role: '画面の配信' },
              { service: 'aws-s3', role: '画面' },
            ],
          },
          {
            label: 'API・リアルタイム',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-api-gateway', role: 'HTTP API' },
              { service: 'aws-api-gateway-websocket', role: '接続の保持。最長 2 時間・無通信 10 分で切れる' },
              { service: 'aws-lambda', role: 'API と、接続ごとの PostToConnection' },
            ],
          },
          {
            label: 'データ・ファイル',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-aurora', role: 'メッセージなど。日本語検索は pg_trgm' },
              { service: 'aws-dynamodb', role: '接続 ID・ユーザー・離席状態の表' },
              { service: 'aws-s3', role: '添付ファイル' },
            ],
          },
          {
            label: '定期処理・認証',
            nodes: [
              { service: 'aws-eventbridge', role: '予約送信とリマインダーを毎分起動' },
              { service: 'aws-cognito', role: 'Google を外部 IdP にしたログイン' },
            ],
          },
        ],
        note: '在席状況は接続の表を集計するか、DynamoDB Streams で変化を拾って配る仕組みを別に作る。',
      },
      differences: [
        {
          aspect: '接続の管理',
          cloudflare: 'Durable Object が接続そのものを持ち、ユーザー ID のタグで引く',
          aws: '接続 ID を DynamoDB に書き、切断が届かなかった行は TTL と 410 Gone の掃除で消す',
        },
        {
          aspect: '配信',
          cloudflare: 'API から publish を 1 回呼ぶと、Durable Object が宛先の接続にまとめて送る',
          aws: '宛先の接続を DynamoDB から引き、接続ごとに PostToConnection を呼ぶ。人数が増えるほど API 呼び出しが増える',
        },
        {
          aspect: '在席と入力中',
          cloudflare: '同じユーザーの全接続から在席を決め、変わったときだけ配る。入力中のメンバーは 30 秒キャッシュする',
          aws: '入力中を送るたびに Lambda が起動する。在席の集計も別に作る',
        },
        {
          aspect: 'ハートビートと費用',
          cloudflare: 'ping に自動で pong を返し、待機中の Durable Object を起こさない。R2 は転送量の料金がかからない',
          aws: '無通信 10 分で切れないよう ping を送る。ルートに Lambda をつなぐと、そのたびに起動する',
        },
        {
          aspect: '制約',
          cloudflare: 'D1 は 1 データベースの容量に上限がある。1 ワークスペースの配信は 1 つのインスタンスに集まる',
          aws: '部品は多いが、接続数や DB の容量は個別に伸ばせる',
        },
      ],
    },
  },
  {
    slug: 'sen',
    title: 'Sen',
    subtitle: '日本語の課題管理',
    description: 'Linear の考え方を受け継いだ、待ち時間のない日本語の課題管理アプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    thumbnail: '/images/works/sen-1.webp',
    screenshots: [
      { src: '/images/works/sen-1.webp', caption: 'チームの課題一覧。状態ごとにまとめ、優先度・ラベル・プロジェクト・期日・担当を 1 行に並べる' },
      { src: '/images/works/sen-2.webp', caption: 'ボード表示。状態の列にカードを並べ、ドラッグで動かす' },
      { src: '/images/works/sen-3.webp', caption: '課題の詳細。本文はリッチエディタ、右に属性、下に変更履歴とコメント' },
      { src: '/images/works/sen-4.webp', caption: 'Ctrl+K のコマンドパレット。選んでいる課題への操作をショートカットと一緒に出す' },
    ],
    cloneOf: 'Linear',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'Durable Objects', 'Better Auth', 'Playwright'],
    github_url: 'https://github.com/otomatty/sen',
    website_url: null,
    goal: '画面をすべて手元のデータから描いて操作の待ち時間をなくし、課題の作成から整理までをキーボードだけで終えられるようにする。',
    features: [
      'チームごとの連番 ID（ENG-12）を持つ課題。状態・優先度・担当・ラベル・プロジェクト・サイクル・期日・親子関係を扱う',
      'リストとボードを Ctrl+B で切り替え、グループ分け・並び順・フィルターを画面ごとに保存する',
      'Ctrl+K のコマンドパレットと 43 個のショートカット。Ctrl+Z で直前の操作を戻せる',
      'リッチエディタの本文、サブ課題、変更履歴、メンション付きのコメント',
      '受信トレイ、プロジェクトの進捗、サイクルの完了の推移のグラフ',
    ],
    highlights: [
      { title: '画面の状態を「確定値＋未送信の変更」で作る', detail: 'サーバーの差分が届くたびに未送信の変更を重ね直すので、他人の変更と重なっても表示が崩れない。失敗した変更は巻き戻して知らせる' },
      { title: 'Durable Object は「新しい変更がある」ことだけを送る', detail: '中身は WebSocket で送らず、クライアントが連番の同期ログから差分を取りに行く。接続が切れても取りこぼさない' },
      { title: 'IndexedDB のキャッシュで、2 回目以降の起動を速くする', detail: '確定済みのデータと最後に受け取った番号を保存し、キャッシュで描いてから差分だけを取る' },
      { title: '14 本の使い方動画を、Playwright がシナリオどおりに操作して撮る', detail: '操作の結果を確かめながら撮るので、画面が壊れていれば収録が失敗する' },
    ],
    techFeatures: [
      { title: '変更はすべて D1 の同期ログに連番付きで書き、差分の API は番号の続きから返す', detail: '30 日より古いログは Cron で消し、それより古いキャッシュを持つ端末には全体の読み込み直しを指示する' },
      { title: 'WebSocket Hibernation で、待機中の接続のあいだ Durable Object を起こさない', detail: 'ワークスペースごとに 1 つの Durable Object が接続を束ね、ping/pong は自動で返す' },
      { title: 'Cloudflare の Vite プラグインで、Worker・D1・Durable Object を手元でも本番と同じランタイムで動かす', detail: 'E2E テスト 37 件と動画の収録は、毎回まっさらな DB で走る' },
      { title: 'Better Auth を D1 の上で動かし、ログインは Google だけにした', detail: '開発用のログインは開発時だけ有効にし、本番の成果物からは取り除く' },
    ],
    impacts: [
      nearZeroInfra,
      { label: 'キーボードショートカット', value: '43', unit: '個', kind: 'measured' },
      { label: 'E2E テスト', value: '37', unit: '件', kind: 'measured' },
    ],
    basis: [
      { label: 'ショートカット', method: 'ヘルプに載せているショートカットの一覧の項目数' },
      { label: 'E2E テスト', method: 'Playwright のテストの件数（6 ファイル）' },
    ],
    architecture: {
      cloudflare: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面と IndexedDB のキャッシュ' }] },
          { label: '配信・API', zone: 'エッジ', nodes: [{ service: 'cloudflare-workers', role: '画面・使い方動画の配信と Hono の API、Better Auth' }] },
          { label: 'リアルタイム', zone: 'エッジ', nodes: [{ service: 'cloudflare-durable-objects', role: 'ワークスペースごとに WebSocket を束ね、新しい変更の番号を送る' }] },
          {
            label: 'データ・定期処理',
            nodes: [
              { service: 'cloudflare-d1', role: '課題など 18 テーブルと、連番の同期ログ' },
              { service: 'cloudflare-cron', role: '30 日より古い同期ログを毎日消す' },
            ],
          },
          { label: '外部', nodes: [{ service: 'google', role: 'ログイン' }] },
        ],
        note: '静的配信・API・WebSocket・Cron を 1 つの Worker にまとめ、設定は wrangler.jsonc 1 枚で済む。',
      },
      aws: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面と IndexedDB のキャッシュ' }] },
          {
            label: '配信',
            zone: 'エッジ',
            nodes: [
              { service: 'aws-cloudfront', role: '画面の配信。SPA の 404 を index.html に書き換える' },
              { service: 'aws-s3', role: '画面と使い方動画' },
            ],
          },
          {
            label: 'API・リアルタイム',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-api-gateway', role: 'HTTP API' },
              { service: 'aws-api-gateway-websocket', role: '接続の受け付けと切断' },
              { service: 'aws-lambda', role: 'Hono の API と、接続ごとの通知の送信' },
            ],
          },
          {
            label: 'データ・定期処理',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-aurora', role: '課題と同期ログ（identity 列で連番）' },
              { service: 'aws-dynamodb', role: 'WebSocket の接続 ID の保存と掃除' },
              { service: 'aws-eventbridge', role: '同期ログの掃除を毎日起動する' },
            ],
          },
          { label: '認証', nodes: [{ service: 'aws-cognito', role: 'Google を外部 IdP にしたログイン' }] },
        ],
        note: '通知のたびに接続 ID を DynamoDB から読み、接続ごとに PostToConnection を呼ぶ。切断済みの ID の掃除も自分で書く。',
      },
      differences: [
        {
          aspect: 'リアルタイム通知',
          cloudflare: 'ワークスペースごとの Durable Object が接続を持ち、メモリ上のループで全員に送る',
          aws: '接続 ID を DynamoDB に保存し、通知のたびに読み出して接続ごとに API を呼ぶ',
        },
        {
          aspect: '待機中の接続の費用',
          cloudflare: 'Hibernation で、待機中は Durable Object を起こさない',
          aws: 'WebSocket API は接続している時間にも課金される。開きっぱなしの課題管理の画面では差が出やすい',
        },
        {
          aspect: '同期ログの連番',
          cloudflare: 'D1 の AUTOINCREMENT で決まる。書き込みは 1 つのプライマリーに集まる',
          aws: 'Aurora なら identity 列。DynamoDB にするなら、カウンターとトランザクションで自分で採番する',
        },
        {
          aspect: '構成と設定',
          cloudflare: '1 つの Worker と wrangler.jsonc 1 枚',
          aws: '8 つのサービスを CDK などの IaC で束ねる',
        },
        {
          aspect: '手元での開発',
          cloudflare: 'Worker・D1・Durable Object を手元の workerd で動かし、E2E を毎回まっさらな DB で回せる',
          aws: 'WebSocket API と DB をまとめて手元で再現するには、エミュレーターか開発用の環境が要る',
        },
      ],
    },
  },
  {
    slug: 'andon-for-aidlc',
    title: 'Andon for AI-DLC',
    subtitle: 'AI-DLC の進み具合を見る VS Code / Cursor 拡張（旧 AIDLC Guide）',
    description: 'AI-DLC の現在地・成果物・次の承認を、エディターの中で確かめる拡張機能',
    category: 'personal',
    status: 'published',
    period: { start: '2026-07' },
    thumbnail: '/images/works/andon-for-aidlc-1.webp',
    screenshots: [
      { src: '/images/works/andon-for-aidlc-1.webp', caption: 'ステージ一覧。現在のステージ、5 フェーズの完了数、Unit × ステージの成果物マトリクス' },
      { src: '/images/works/andon-for-aidlc-2.webp', caption: '成果物ビューア。AI が書いた設計書を、Unit とファイルのタブで切り替えて読む' },
      { src: '/images/works/andon-for-aidlc-3.webp', caption: '効果測定。案件をまたいで、完了までの時間・承認待ち・差し戻し・品質チェックを集計する' },
      { src: '/images/works/andon-for-aidlc-4.webp', caption: '同梱のドキュメント。読む順の案内と、AI に質問する入口' },
    ],
    technologies: ['TypeScript', 'React', 'VS Code 拡張', 'MCP', 'Bun', 'Mantine', 'Vitest'],
    github_url: 'https://github.com/otomatty/andon-for-aidlc',
    website_url: null,
    goal: 'AI-DLC で「今どの工程か」「何を承認すればよいか」「成果物はどこか」を、記録ファイルを開かずにエディターの中で一目で分かるようにする。名前のとおり、人の判断が要るときに人を呼ぶ表示灯を目指した。勤務先で AI-DLC の導入に携わって学んだことをもとに、個人の開発として一から作った。',
    features: [
      '5 フェーズ・33 ステージの状態と、現在のステージ、次の承認までの時間',
      'Unit × ステージの成果物マトリクスと、Markdown・Mermaid・SVG を整形して読む成果物ビューア',
      '監査ログから、完了までの時間・承認待ち・差し戻しを集計する効果測定',
      '同梱した公式ドキュメントを読み、手元の AI CLI に根拠付きで質問する',
      'Claude Code・Cursor から状態や成果物を引ける、読み取り専用の MCP サーバー（ツール 5 つ）',
    ],
    highlights: [
      { title: '読み取りを基本にした', detail: 'AI-DLC の記録は読むだけにし、書き込みは利用者が明示した操作に限った。本体のワークフローには手を入れない' },
      { title: '対応する版を 1 つに固定し、食い違いを検出する', detail: 'プロジェクト・ツール・エンジンの版を照合し、合わないあいだは閲覧と更新だけを使える。戻し方のコマンドも示す' },
      { title: '承認待ちと中断を、作業時間から分けて数える', detail: '20 分を超える空白は作業に数えない。「未記録」と「0」も区別する' },
      { title: '自分の開発も AI-DLC で進め、その記録を README と撮影に使った' },
    ],
    techFeatures: [
      { title: '1 つの画面を 2 つの経路で動かす', detail: 'React の画面を、拡張の中では postMessage、開発用サーバーでは HTTP で動かし、どちらも同じハンドラーを通す' },
      { title: '10 のパッケージの依存の向きを一方向に決め、構造テストで守る', detail: '読み取りの層が React や MCP SDK を import しないことを強制する' },
      { title: '上流のワークフローの新しい版を毎日確かめ、同期の PR を自動で作る', detail: '3 つの OS で互換性を検査し、main へのマージで VSIX をリリースに添付する' },
      { title: 'lint・型・カバレッジ付きテスト・依存の脆弱性までを 1 コマンドで検査する' },
    ],
    impacts: [
      { label: 'テスト', value: '3,291', unit: '件', kind: 'measured', note: '273 ファイル' },
      { label: 'MCP のツール', value: '5', unit: 'つ', kind: 'measured' },
    ],
    basis: [{ label: 'テスト', method: 'テストファイルの it / test の数をソースから数えた' }],
  },
  {
    slug: 'zukai',
    title: 'zukai',
    subtitle: 'AI の原稿から図解の資料を作る CLI',
    description: 'AI が書いた Markdown を検査し、図が主役の日本語の資料にする CLI',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    thumbnail: '/images/works/zukai-1.webp',
    screenshots: [
      { src: '/images/works/zukai-1.webp', caption: '操作画面。原稿の一覧、図の入ったプレビュー、検査の結果、書き出しと Confluence への公開' },
      { src: '/images/works/zukai-2.webp', caption: '書き出した HTML。AWS のアイコンを使った構成図' },
      { src: '/images/works/zukai-3.webp', caption: '書き出した HTML。ログイン要求の行き先を示すサンキー図' },
      { src: '/images/works/zukai-4.webp', caption: '悪い例の原稿。型の名前の誤りやラベルの長さを、行番号付きで指摘する' },
    ],
    technologies: ['TypeScript', 'Node.js', 'textlint', 'markdown-it', 'ECharts', 'resvg', 'Playwright'],
    github_url: 'https://github.com/otomatty/zukai',
    website_url: null,
    goal: 'AI に書かせた設計書や説明資料が、図の詰め込みや言い回しのぶれで読みにくくなるのを、AI を使わない検査で止める。AI が書くときのルールと検査のルールを同じ定義から作り、AI が指摘を読んで直せるようにする。',
    features: [
      'フロー・シーケンス・状態・スイムレーン・ガント・サンキーなど 24 種類の図。原稿には型と箱の名前・関係だけを書く',
      '構成・図の項目数と文字の収まり・文章・用語の統一を検査し、誤りがあれば終了コード 1 を返す',
      'HTML・Markdown・PDF・Word・PowerPoint・Confluence・SVG・PNG の 8 形式への書き出し',
      '資料の一覧・プレビュー・検査・書き出しをブラウザで操作する画面',
      'Claude Code・Codex・Cursor にスキルを入れ、AI の説明を図解の資料として出させる',
    ],
    highlights: [
      { title: '書くルールと検査のルールを、同じ定義ファイルからそろえた', detail: '文字数や図の要素数の上限を 1 か所に置き、AI への指示と検査が同じ値を読む' },
      { title: 'AI への指示を段階的に渡し、短く保つ', detail: '最初は図の型の一覧だけを渡し、型が決まってから詳しい書き方を渡す' },
      { title: '検査に AI を使わない', detail: '同じ原稿なら毎回同じ結果になり、CI でも使える。ルールが狙いどおりに働くかを、良い例と悪い例の原稿で確かめる' },
      { title: '原本は Markdown のまま残す', detail: 'HTML に原稿を埋め込み、受け取った人が取り出して直せる' },
    ],
    techFeatures: [
      { title: 'ビルドなしの TypeScript', detail: 'Node.js 24 の型の除去でソースをそのまま動かし、tsc は型検査だけに使う' },
      { title: '図はブラウザなしで SVG を組んで描く', detail: 'グラフは ECharts、PNG は resvg。Chromium が要るのは PDF と動画だけ' },
      { title: 'ラベルの幅を全角換算で数え、はみ出しを描く前に止める' },
      { title: '操作画面は 127.0.0.1 だけで待ち受け、起動ごとの合言葉と CSP の nonce で守る' },
    ],
    impacts: [
      { label: '図の種類', value: '24', unit: '種', kind: 'measured' },
      { label: '書き出しの形式', value: '8', unit: '種', kind: 'measured' },
    ],
  },
  {
    slug: 'vouch-workflows',
    title: 'Vouch',
    subtitle: 'AI エージェント向けの開発ワークフロー（開発中）',
    description: 'AI エージェントの開発を、人の承認と監査ログで仕組みとして守るワークフロー',
    category: 'personal',
    status: 'published',
    period: { start: '2026-09', end: '2026-10' },
    technologies: ['TypeScript', 'Node.js', 'Claude Code', 'Codex CLI', 'Cursor', 'JSON Schema', 'GitHub Actions'],
    github_url: 'https://github.com/otomatty/vouch-workflows',
    website_url: null,
    goal: '判断はモデルに任せ、検査・記録・遮断はフックで機械的に行い、人が見るのを「目的の承認」と「PR のマージ」の 2 回に絞る。前の版で約 10.5 万行まで膨らんだエンジンを持たず、利用者の手元は Node.js と Git だけで動かす。',
    features: [
      'Claude Code・Codex CLI・Cursor への導入・更新・削除と診断。版は digest で固定する',
      '監査ログ・フックの設定・承認済みの成果物への書き込みと、承認前の実装、main への push を止めるガード',
      '27 種類のイベントを、フックだけが追記する監査ログ',
      '目的・設計・実装・検証の 4 段階の Skill と、実装・レビュー・調査の 3 つのエージェント、日英の成果物のひな形',
      '中断した作業の再開と、現在地の表示',
    ],
    highlights: [
      { title: '判断と機械的な処理を分けた', detail: 'モデルは Skill の指示で判断し、フックは検査・記録・遮断だけをする。状態機械やルーティングのエンジンは持たない' },
      { title: '承認は、人が明示的に入力したときだけ記録する', detail: '確認点がそろったときに、はじめて承認済みにする' },
      { title: '確かめたことと、まだ確かめていないことを分けて書いた', detail: 'Cursor の IDE での実機検証と、モデルが Skill に従うかの評価は未実施と明記している' },
      { title: '既存の設定を壊さずに導入する', detail: '利用者が手を入れたファイルは更新・削除を止め、無関係なフックは上書きしない' },
    ],
    techFeatures: [
      { title: '利用者の手元は依存ゼロ', detail: 'TypeScript で書き、配る JavaScript は Node.js の組み込みモジュールだけで動く' },
      { title: '1 つの正典から、3 つのツール向けの 449 ファイルを生成する', detail: '生成物が正典と一致しているかをテストで検査する' },
      { title: 'レジストリとフックの入出力を、30 個の JSON Schema で定義した' },
      { title: 'フックの時間の予算を決め、Windows と Ubuntu × Node 22 / 24 の CI で測る' },
    ],
  },
  {
    slug: 'portfolio',
    title: 'Saedgewell',
    subtitle: 'このポートフォリオサイト',
    description: '実績を「目指したこと」と「数値」で見せる、Astro 製のポートフォリオ',
    category: 'personal',
    status: 'published',
    period: { start: '2026-01' },
    thumbnail: '/images/works/portfolio-1.webp',
    screenshots: [
      { src: '/images/works/portfolio-1.webp', caption: 'トップ。シュタイナーの円鎖（算額）を WebGPU で描く' },
      { src: '/images/works/portfolio-2.webp', caption: '実績一覧。区分と「実測の数値がある実績だけ」で絞り込める' },
      { src: '/images/works/portfolio-3.webp', caption: '実績の詳細。背面に開始年を置き、本文と速さを変えて動かす' },
      { src: '/images/works/portfolio-4.webp', caption: 'スキル。ページごとに内容に合わせた作図を置く' },
    ],
    technologies: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'WebGPU', 'Cloudflare Workers'],
    github_url: 'https://github.com/otomatty/portfolio',
    website_url: 'https://saedgewell.com',
    goal: '作ったものの一覧ではなく、何を目指し、どれだけ変わったかで仕事を伝える。数値は実績データの 1 か所にだけ書き、トップ・経歴・スキルシートはそこから引く。',
    highlights: [
      { title: '数値に「実測・試算・目標」の種類を必ず付け、値が分からない数値は載せない', detail: '種類は塗った円・輪・破線の輪で示し、凡例を一覧に置いた' },
      { title: '実績のデータを 1 つのファイルにまとめ、トップ・経歴・スキルシートはそこを参照する', detail: '同じ数値を複数の場所に書かないので、更新漏れが起きない' },
      { title: 'ページごとに、内容に合った幾何学の作図を置いた', detail: 'トップは算額（シュタイナーの円鎖）、実績一覧はアポロニウスの窓、経歴は円と正方形の入れ子' },
    ],
    techFeatures: [
      { title: '線・円・点を WebGPU のインスタンス描画で描き、距離関数でアンチエイリアスする', detail: 'WebGPU が使えない環境では、同じ図形データを Canvas 2D で描く' },
      { title: '全ページを静的に生成し、Cloudflare Workers の静的アセットとして配信する', detail: '画像はビルド時に最適化し、存在しないパスには事前に生成した 404 ページを返す' },
      { title: 'スクロールとカーソルに合わせたパララックスを、transform だけで動かす', detail: 'prefers-reduced-motion のときはすべて止める' },
      { title: 'Workers Builds で main を本番、ほかのブランチをプレビューとして自動でデプロイする' },
    ],
  },
  {
    slug: 'm3-baseui',
    title: 'm3-baseui',
    subtitle: 'Material Design 3 のコンポーネントライブラリ',
    description: 'Base UI の上に Material Design 3 を実装し、Tailwind CSS と vanilla-extract で配る React の部品集',
    category: 'personal',
    status: 'published',
    period: { start: '2026-06' },
    thumbnail: '/images/works/m3-baseui-1.webp',
    screenshots: [
      { src: '/images/works/m3-baseui-1.webp', caption: 'ドキュメントサイトのコンポーネント索引。各部品のプレビューと説明' },
      { src: '/images/works/m3-baseui-2.webp', caption: 'Storybook。vanilla-extract 版・ダークモードの TimePicker。配色の種と方式を切り替えられる' },
      { src: '/images/works/m3-baseui-3.webp', caption: 'Button のページ。ライブデモ、import、使用例' },
      { src: '/images/works/m3-baseui-4.webp', caption: 'ナビゲーション系の部品。NavigationBar・Rail・Drawer・TopAppBar' },
    ],
    technologies: ['TypeScript', 'React', 'Base UI', 'Tailwind CSS', 'vanilla-extract', 'Astro', 'Storybook', 'Playwright'],
    github_url: 'https://github.com/otomatty/m3-baseui',
    website_url: 'https://m3-baseui.pages.dev',
    goal: '振る舞いとアクセシビリティは Base UI に任せ、見た目だけを Material Design 3 に合わせる。スタイルの方式を Tailwind CSS v4 と vanilla-extract から選べ、どちらでも同じ DOM になるようにする。',
    features: [
      'Button・TextField・DatePicker・NavigationDrawer・Carousel など 38 種類のコンポーネント',
      'Tailwind CSS 版と vanilla-extract 版が同じ API・同じ DOM を出すので、差し替えるだけで移れる',
      '種の色から Material Design 3 の配色を作る動的配色（方式 6 種・コントラスト 3 段階・ライト / ダーク）',
      'Material Symbols をインライン SVG で描くアイコン',
      'ドキュメントサイトと Storybook。npm に 5 つのパッケージを公開',
    ],
    highlights: [
      { title: 'ロジックは 1 か所にまとめ、スタイルの方式ごとにはクラスを決める関数だけを差し替える', detail: '2 つの方式で同じ処理を二重に書かない' },
      { title: '色を「R G B」の 3 つの値で持つ', detail: '透明度の指定や color-mix、押したときの重ね色を組み合わせやすくした' },
      { title: '状態の見た目は、Base UI が付ける data-* 属性に寄せた', detail: 'リップルは自前で用意し、prefers-reduced-motion に従う' },
      { title: '部品を足す手順を 7 段に決め、テストを先に書く' },
    ],
    techFeatures: [
      { title: '差し替えられることを E2E で確かめる', detail: '同じ画面を 2 つの方式で動かし、操作・アクセシビリティ・見た目の回帰（ベースライン 24 枚）のテストを両方に流す' },
      { title: 'デザイントークンを 1 つの定義から、CSS 変数・vanilla-extract の契約・Tailwind のテーマに生成する' },
      { title: 'npm への公開は OIDC の trusted publishing で行い、長く使うトークンを持たない' },
      { title: 'ドキュメントは Astro の静的 HTML にし、ライブデモだけを React で動かす', detail: 'Cloudflare Pages に配り、PR ごとにプレビューを出す' },
    ],
    impacts: [
      { label: 'コンポーネント', value: '38', unit: '種', kind: 'measured' },
      { label: 'ユニットテスト', value: '463', unit: '件', kind: 'measured', note: 'すべて合格' },
    ],
  },
  {
    slug: 'dev-puzzle',
    title: 'DevPuzzle',
    subtitle: 'プログラミングパズル',
    description: 'ロボットに命令と関数を並べて盤面の星を集める、RoboZZle 型のパズル',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10', end: '2026-10' },
    thumbnail: '/images/works/dev-puzzle-1.webp',
    screenshots: [
      { src: '/images/works/dev-puzzle-1.webp', caption: 'プログラムを実行しているところ。条件付きの命令を F1〜F3 に並べ、いま実行中の命令を枠で示す' },
      { src: '/images/works/dev-puzzle-2.webp', caption: 'ステージ一覧。盤面のサムネイル、難しさ、クリア済みの印を並べる' },
      { src: '/images/works/dev-puzzle-3.webp', caption: 'クリアしたところ。ペンキで床の色を変えて目印にする' },
      { src: '/images/works/dev-puzzle-4.webp', caption: 'ダークモードで「色を形でも表示」をオンにした編集画面。床と命令に三角・丸・四角の印が付く' },
    ],
    cloneOf: 'RoboZZle（ステージと画面は独自）',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'Better Auth', 'Vitest', 'Playwright'],
    github_url: 'https://github.com/otomatty/dev-puzzle',
    website_url: null,
    goal: '条件付きの命令と関数の呼び出しでロボットを動かすパズルを、ブラウザと Worker で同じゲームエンジンを使って動かす。クリア人数は、サーバーが解答を実行し直して確かめたものだけを数える。',
    features: [
      '難しさ 1〜5 の 14 ステージ。盤面のサムネイルとクリア人数を一覧に出す',
      '関数 F1〜F5 のマスに、前進・回転・関数の呼び出し・ペンキを置くエディター。命令ごとに「この色の床のときだけ」の条件を付けられる',
      '実行・1 手ずつ進める・一時停止・最初に戻す。いま実行している命令を枠で示す',
      '床から落ちる、星を残して命令が尽きる、手数の上限を超えるなどの失敗の判定と説明',
      'ライト・ダークモード、「色を形でも表示」、スマートフォンでの操作',
    ],
    highlights: [
      { title: 'クリアの報告はサーバーで確かめる', detail: '送られたプログラムを Worker が同じエンジンで最後まで実行し、星を全部集めたときだけクリア人数を増やす' },
      { title: '色だけに頼らない表示を用意した', detail: '赤は三角・緑は丸・青は四角の印を、床と命令に重ねられる' },
      { title: '模範解答はテストにだけ置き、サイトには配信しない', detail: '全 14 ステージが解けることを Vitest で確かめる' },
      { title: 'ステージの定義から SQL を作り、CI でずれを見つける', detail: '本番への反映は upsert なので、クリア人数は消えない' },
    ],
    techFeatures: [
      { title: 'ゲームエンジンを「次の状態を返す」純粋な関数にした', detail: '画面は 1 手ずつ、Worker は最後まで一気に実行する。同じコードを両方で使う' },
      { title: '実行し終えた呼び出しを畳んでから次を呼ぶので、関数の最後で自分を呼ぶくり返しでもスタックが伸びない', detail: '1000 手・深さ 100 で止める' },
      { title: '1 つの Worker で画面と API を配信する', detail: 'React の画面は静的アセット、/api/* だけ Hono で処理する' },
      { title: 'main へのマージで、テスト・D1 のマイグレーション・ステージの反映・デプロイまでを自動で行う' },
    ],
    impacts: [
      nearZeroInfra,
      { label: 'ステージ', value: '14', unit: '問', kind: 'measured', note: '難しさ 1〜5' },
    ],
    architecture: {
      cloudflare: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面とゲームエンジン' }] },
          { label: '配信・API', zone: 'エッジ', nodes: [{ service: 'cloudflare-workers', role: '画面の配信と Hono の API。解答を同じエンジンで実行し直す' }] },
          { label: 'データ', nodes: [{ service: 'cloudflare-d1', role: 'ステージの定義、クリア人数、ログインのセッション' }] },
          { label: '外部', nodes: [{ service: 'google', role: 'ログイン' }] },
        ],
      },
      aws: {
        tiers: [
          { label: '利用者', nodes: [{ service: 'browser', role: 'React の画面とゲームエンジン' }] },
          {
            label: '配信',
            zone: 'エッジ',
            nodes: [
              { service: 'aws-cloudfront', role: '画面の配信と /api/* の振り分け' },
              { service: 'aws-s3', role: '画面' },
            ],
          },
          {
            label: 'API',
            zone: '東京リージョン',
            nodes: [
              { service: 'aws-api-gateway', role: 'HTTP API' },
              { service: 'aws-lambda', role: '解答の実行とクリアの記録' },
            ],
          },
          { label: 'データ', zone: '東京リージョン', nodes: [{ service: 'aws-aurora', role: 'ステージの定義とクリア人数' }] },
          { label: '認証', nodes: [{ service: 'aws-cognito', role: 'Google を外部 IdP にしたログイン' }] },
        ],
      },
      differences: [
        {
          aspect: '構成',
          cloudflare: '1 つの Worker と wrangler.jsonc 1 枚',
          aws: 'S3・CloudFront・API Gateway・Lambda を別々に用意し、CloudFront でパスを振り分ける',
        },
        {
          aspect: 'DB への接続',
          cloudflare: 'D1 をバインディングで直接呼ぶ',
          aws: 'Lambda から Aurora へは RDS Proxy か Data API を通す',
        },
        {
          aspect: 'テスト',
          cloudflare: 'Vitest も E2E も、本番と同じ workerd の上で走る',
          aws: 'Lambda と DB を手元で再現する仕組みを別に用意する',
        },
        {
          aspect: '制約',
          cloudflare: 'Better Auth のために Node.js 互換フラグが要り、組み込みのレート制限は効かない。Cloudflare のレート制限ルールで補う',
          aws: 'Lambda は Node.js そのものなので互換の心配はない。レート制限は WAF で設定する',
        },
      ],
    },
  },
  {
    slug: 'zedi',
    title: 'Zedi',
    subtitle: 'リンクでつなぐナレッジノート（作り直し中）',
    description: 'フォルダを作らず、WikiLink でページをつないで知識を育てる共同編集のメモアプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2025-12' },
    thumbnail: '/images/works/zedi-1.webp',
    screenshots: [
      { src: '/images/works/zedi-1.webp', caption: '設計メモのページ。WikiLink で他のページにつなぎ、まだないページへのリンクは点線で残す' },
      { src: '/images/works/zedi-2.webp', caption: 'ノートの一覧。本文の冒頭と更新日時を並べる' },
      { src: '/images/works/zedi-3.webp', caption: '[[ と打つと、既存のページを検索してリンク先の候補を出す' },
      { src: '/images/works/zedi-4.webp', caption: '2 人で同じページを編集しているところ。相手のカーソルと入力がそのまま見える' },
    ],
    technologies: ['TypeScript', 'Hono', 'Cloudflare Workers', 'D1', 'Durable Objects', 'Better Auth', 'Tiptap', 'Y.js'],
    github_url: 'https://github.com/otomatty/zedi',
    website_url: null,
    goal: '書くことと整理することの負担を減らし、フォルダの代わりにリンクで知識を育てる。作り直しでは、画面・API・認証・共同編集を Cloudflare の Worker 1 つにまとめ、最初の読み込みを軽くする。',
    features: [
      '[[ で既存のページを検索してリンクを入れる WikiLink。まだないページへのリンクは「種」として残す',
      'ページごとの共同編集。相手のカーソルも表示し、閲覧者は書き込めない',
      '日本語の全文検索（Ctrl+K）',
      'ノートの共有。権限がない相手には、API でも WebSocket でもページの存在を見せない',
      'オフラインでの閲覧と作成。作ったページは再接続したときに送る',
      'Google でのサインインのあと、パスキーか認証アプリの 2 段階認証を必須にする',
    ],
    highlights: [
      { title: '依存を減らし、最初に読み込む JavaScript を小さくした', detail: '画面を hono/jsx/dom と自作のルーターで組み、エディタは必要になってから読み込む' },
      { title: 'カーソルの共有を自前で軽くした', detail: '入力が止まってから自分の位置を送り、長い文書での入力の遅れを、エディタの標準の仕組みより減らした' },
      { title: 'オフラインで作ったページが消えない', detail: 'ページの ID を端末で作り、作成の API を何度送っても同じ結果になるようにした' },
      { title: 'AI の返答の Markdown を、流れてくる途中から描く', detail: '確定したブロックは一度だけ描いて固定し、末尾だけを描き直す。innerHTML を使わない' },
    ],
    techFeatures: [
      { title: '画面・API・認証・D1・共同編集を、Worker 1 つの同じオリジンで配信する', detail: 'CORS とサードパーティ Cookie が要らない。作り直し前の、常駐の API サーバーと共同編集サーバーをなくした' },
      { title: 'ページごとの Durable Object が Y.js の更新を中継し、保存時に本文を D1 に書き戻して全文検索に載せる' },
      { title: 'D1 の読み取り行数を抑える', detail: '一覧はキーセット方式で読み、件数はトリガーで持つ。COUNT(*) と OFFSET を使わない' },
      { title: 'Google の代わりをするテスト用の認証サーバーを別の Worker にし、本番には置かないことをテストで確かめる' },
    ],
    impacts: [
      { label: '最初に読み込む JavaScript', before: '1.31MB', value: '30.8', unit: 'KB', kind: 'measured', note: '作り直し前の React 版との比較', bars: [1310, 30.8] },
      { label: '2,000 段落の文書での入力の遅れ（中央値）', before: '467ms', value: '176', unit: 'ms', kind: 'measured', note: 'CPU を 4 倍遅くして計測', bars: [467, 176] },
    ],
    basis: [
      { label: '最初の JavaScript', method: 'リポジトリの検証記録にある、作り直し前後のビルドの比較（gzip）' },
      { label: '入力の遅れ', method: '2,000 段落の文書に入力し、カーソル共有をエディタの標準の仕組みにした場合と比べた中央値（手元の計測）' },
    ],
  },
  {
    slug: 'typeflow',
    title: 'TypeFlow',
    subtitle: '技術用語のタイピング練習',
    description: 'ビルド待ちのすき間に、技術用語をローマ字で打つタイムアタック型のタイピング練習',
    category: 'personal',
    status: 'published',
    period: { start: '2025-12', end: '2026-06' },
    thumbnail: '/images/works/typeflow-1.webp',
    screenshots: [
      { src: '/images/works/typeflow-1.webp', caption: '練習中の画面。単語と読みを見てローマ字で打つ。下のゲージが単語ごとの残り時間' },
      { src: '/images/works/typeflow-2.webp', caption: 'ゲームの結果。打鍵の速さ・正確さ・打ち始めの速さと、単語ごとの結果を並べる' },
      { src: '/images/works/typeflow-3.webp', caption: '統計の画面。打鍵の速さと正確さの推移をゲームごとに追う（デモのデータ）' },
      { src: '/images/works/typeflow-4.webp', caption: '小さなウィンドウで切り替わるミニマルモード。エディタのような見た目で、仕事中でも目立たない' },
    ],
    cloneOf: '寿司打（プリセットの 1 つ）',
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'Cloudflare Pages', 'Turso', 'Clerk', 'Tauri'],
    github_url: 'https://github.com/otomatty/typeflow',
    website_url: null,
    goal: 'エンジニアがビルドやテストの待ち時間に、ふだん使う技術用語で打鍵の速さと正確さを鍛える。苦手なキーと単語を記録し、次の出題と制限時間に反映する。',
    features: [
      '単語ごとの制限時間を、直近 10 ゲームの打鍵の速さと難易度から決めるタイムアタック',
      '失敗した単語の復習と、1 単語に絞った練習',
      '単語ごとの正確さと次の復習日から出題の順を決める',
      '打鍵の速さの推移、キーボードのヒートマップ、キーからキーへの遷移ごとの統計',
      '漢字と読みを入れるとローマ字を自動で作る単語の管理と、4 種類のプリセット（うち 1 つは寿司打のコースを参考にした）',
    ],
    highlights: [
      { title: '自分の速さに合わせて、制限時間が厳しくなる', detail: '目標の打鍵の速さを直近 10 ゲームの平均の 1.3〜1.65 倍にし、単語の打鍵数から制限時間を出す' },
      { title: 'ローマ字の打ち方の揺れを受け付ける', detail: '「し」の si と shi のような複数の打ち方を許し、どの打ち方で進んでいるかから次のキーを決める' },
      { title: '仕事中でも目立たない', detail: '小さいウィンドウではエディタ風の表示に切り替え、ターミナル版はビルドのログのように見せる' },
      { title: 'ミスの中身まで記録する', detail: '打ち始めの時間、最初のキーの正否、直前のキーとの組み合わせを記録し、ヒートマップと出題に使う' },
    ],
    techFeatures: [
      { title: '同じ Hono の API を、手元は Bun、本番は Cloudflare Workers で動かす' },
      { title: '手元は SQLite のファイル、本番は Turso を、同じ libSQL のクライアントで扱う', detail: '本番で設定が抜けたときに、手元の DB へ黙って切り替わらないようにした' },
      { title: 'Clerk の JWT を検証し、すべてのクエリをユーザーで絞る' },
      { title: '同じ React の画面を、Tauri 2 でデスクトップアプリにする' },
    ],
  },
  {
    slug: 'ofunato-mokumoku',
    title: 'Ofunato Mokumoku',
    description: '主催していた大船渡もくもく会の公式サイト。日程の案内と参加の申し込みを受け付ける',
    category: 'personal',
    status: 'published',
    period: { start: '2024-09', end: '2024-09' },
    thumbnail: '/images/works/ofunato-mokumoku-1.webp',
    screenshots: [
      { src: '/images/works/ofunato-mokumoku-1.webp', caption: 'トップページ。会のロゴと紹介' },
      { src: '/images/works/ofunato-mokumoku-2.webp', caption: '取り組めるテーマ。12 分類をカードで並べる' },
    ],
    technologies: ['TypeScript', 'SolidJS', 'Vite', 'Firestore', 'Google Calendar API', 'Cloudflare Pages'],
    github_url: 'https://github.com/otomatty/ofunato-mokumoku',
    website_url: null,
    goal: '地域の勉強会の案内と参加の申し込みを 1 つのサイトにまとめる。開催日は Google カレンダーから読み、申し込みは Firestore に保存して、サーバーを持たずに運営する。',
    features: [
      '会の紹介、取り組めるテーマ（12 分類・98 項目）、当日の流れ、週 2 回の開催曜日',
      'Google カレンダーから直近の予定を読み、会場の写真付きで並べるスケジュール',
      '8 ステップの参加申し込みフォーム。参加日はカレンダーの予定から選ぶ',
      'カテゴリ別のよくある質問（25 問）',
    ],
    highlights: [
      { title: '申し込みの入力の途中を残す', detail: '入力のたびにブラウザに保存し、ページを離れても続きから入力できる' },
      { title: '予定の場所から、会場の写真を自動で出し分ける' },
    ],
    techFeatures: [
      { title: '静的サイトから Google Calendar API と Firestore を直接呼び、配信は Cloudflare Pages だけで済ませた' },
      { title: 'Accordion・Modal・Tabs など 19 種類の UI 部品を、ライブラリを使わずに作った' },
    ],
  },

  // 非公開にしたもの（docs/02_research/2026_11/github-repos-inventory.md）。
  // リポジトリを消した・非公開にした・後継に置き換えたため、サイトには出さない
  {
    slug: 'skill-quest-ai',
    title: 'Skill Quest Ai',
    description: 'SES 企業に所属するエンジニアのための LXP（Learning Experience Platform）のプロトタイプ',
    category: 'personal',
    status: 'draft',
    period: { start: '2026-01', end: '2026-01' },
    thumbnail: '/images/works/skill-quest-ai-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/skill-quest-ai',
    website_url: 'https://growthquest-hub.lovable.app',
  },
  {
    slug: 'robbozle-game',
    title: 'Robbozle Game',
    description: 'Robbozle を Web アプリとして再現したもの',
    category: 'personal',
    status: 'draft',
    period: { start: '2026-01', end: '2026-01' },
    thumbnail: '/images/works/robbozle-game.webp',
    technologies: ['TypeScript', 'CSS', 'JavaScript'],
    github_url: 'https://github.com/otomatty/logic-lab.git',
    website_url: 'https://code-blossom-bot.lovable.app',
  },
  {
    slug: 'career-gems',
    title: 'Career Gems',
    description: 'SES 企業のエンジニアのスキル管理ツールのプロトタイプ',
    category: 'personal',
    status: 'draft',
    period: { start: '2025-12', end: '2025-12' },
    thumbnail: '/images/works/career-gems-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/career-gems',
    website_url: 'https://gemini-gems-notes.lovable.app',
  },
  {
    slug: 'kaki-map-hero',
    title: 'Kaki Map Hero',
    description: 'Snano ハッカソンで開発した柿取りマッチングアプリ',
    category: 'personal',
    status: 'draft',
    period: { start: '2025-12', end: '2025-12' },
    thumbnail: '/images/works/kaki-map-hero-thumbnail.webp',
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript', 'Lovable'],
    github_url: 'https://github.com/otomatty/kaki-map-hero',
    website_url: 'https://kaki-map-hero.lovable.app',
  },
  {
    slug: 'paper-ocr-tool',
    title: 'Paper OCR Tool',
    description: '紙を簡単に文字起こしして、さまざまなシステムに貼り付けるためのアプリ',
    category: 'personal',
    status: 'draft',
    period: { start: '2025-11', end: '2025-11' },
    thumbnail: '/images/works/paper-ocr-tool.webp',
    technologies: ['HTML', 'TypeScript', 'CSS', 'JavaScript'],
    github_url: 'https://github.com/otomatty/paper-ocr-tool',
    website_url: 'https://paper-ocr-tool.pages.dev/',
  },
  {
    slug: 'saedgewell',
    title: 'ポートフォリオ・AI チャットボット・見積もり自動化',
    description: 'フリーランスの営業導線として、問い合わせ対応と概算見積もりを自動化',
    category: 'personal',
    status: 'draft',
    period: { start: '2022-08', end: '2025-06' },
    thumbnail: '/images/works/saedgewell.webp',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github_url: 'https://github.com/otomatty/saedgewell-v2',
    website_url: 'https://saedgewell.com',
    goal: '定型の問い合わせ対応を AI チャットボットに任せ、ヒアリングから概算見積もりを出すまでの時間を縮める。',
  },
];

/** 開始月の新しい順（同じ月はデータの並び順） */
function sortWorks(items: Work[]): Work[] {
  return items
    .map((work, index) => ({ work, index }))
    .sort((a, b) => b.work.period.start.localeCompare(a.work.period.start) || a.index - b.index)
    .map(({ work }) => work);
}

/**
 * 公開中の実績（開始月の新しい順）
 */
export function getAllWorks(): Work[] {
  return sortWorks(works.filter((w) => w.status === 'published'));
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((w) => w.slug === slug);
}

export function getWorksByCategory(category: WorkCategory): Work[] {
  return getAllWorks().filter((w) => w.category === category);
}

/**
 * 区分の順（客先案件 → 社内ツール → 人材育成 → 受託 → 個人開発）に並べ直す。同じ区分は元の順を保つ
 */
export function sortByCategory(items: Work[]): Work[] {
  return [...items].sort((a, b) => WORK_CATEGORIES.indexOf(a.category) - WORK_CATEGORIES.indexOf(b.category));
}

/**
 * トップの展示室に並べる実績（featured の順）
 */
export function getFeaturedWorks(): Work[] {
  return getAllWorks()
    .filter((w) => w.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}

/**
 * 開始月の古い順に振った通し番号（No.01, No.02, ...）
 */
export function getWorkNumbers(): Record<string, number> {
  return Object.fromEntries(
    [...getAllWorks()].reverse().map((work, i) => [work.slug, i + 1])
  );
}

/**
 * Format a work number as a two-digit label, e.g. "No.07".
 */
export const formatWorkNumber = (value: number | undefined): string =>
  `No.${String(value ?? 0).padStart(2, '0')}`;

const formatMonth = (value: string) => value.replace('-', '.');

/** 今月（YYYY-MM）。静的サイトなので、ビルドした時点の月になる */
const currentMonth = () => new Date().toISOString().slice(0, 7);

/**
 * 期間の表示（例: 2026.07 – 2026.10、2026.09 –、2026.10、2026.12 開始予定）
 */
export const formatWorkPeriod = (period: Work['period']): string => {
  if (period.start > currentMonth()) return `${formatMonth(period.start)} 開始予定`;
  if (!period.end) return `${formatMonth(period.start)} –`;
  if (period.end === period.start) return formatMonth(period.start);
  return `${formatMonth(period.start)} – ${formatMonth(period.end)}`;
};

/** 一覧・カードの見出しにする数値 */
export const getHeadlineImpact = (work: Work): Impact | undefined => work.impacts?.[0];

/** 実測の数値を持っているか */
export const hasMeasuredImpact = (work: Work): boolean =>
  (work.impacts ?? []).some((impact) => impact.kind === 'measured');

/** 値と単位をつないだ表示（例: 1分、≈0円/月） */
export const formatImpactValue = (impact: Impact): string => `${impact.value}${impact.unit ?? ''}`;

/** 比較元も含めた1行の表示（例: 5分 → 1分） */
export const formatImpactText = (impact: Impact): string =>
  `${impact.before ? `${impact.before} → ` : ''}${formatImpactValue(impact)}`;

/**
 * 実績の数値を slug と impacts の位置で引く。トップや経歴の代表的な数値はこれで参照する
 */
export const getImpactOf = (slug: string, index: number): Impact => {
  const impact = getWorkBySlug(slug)?.impacts?.[index];
  if (!impact) {
    throw new Error(`実績 ${slug} に impacts[${index}] がありません`);
  }
  return impact;
};
