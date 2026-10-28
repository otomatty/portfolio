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
    website_url: 'https://printing-erp-system.vercel.app',
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
    github_url: 'https://github.com/otomatty/fresh-inventory',
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
    website_url: 'https://kouden-app.com',
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
    subtitle: '未経験エンジニア向け学習システム',
    description: '教材・クイズ・コード演習・自動採点・AI への質問をまとめた学習システム',
    category: 'personal',
    status: 'published',
    period: { start: '2026-05' },
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'R2', 'VS Code 拡張'],
    github_url: 'https://github.com/otomatty/stella',
    website_url: null,
    goal: '未経験のエンジニアが現場デビューするまでの学習を、ひとつの場所で完結させる。',
    impacts: [
      { label: '教材', value: '35', unit: 'コース', kind: 'measured', note: '533 トピック' },
      nearZeroInfra,
    ],
  },
  {
    slug: 'minamo-hr',
    title: 'Minamo HR',
    subtitle: '人事労務アプリ',
    description: '勤怠・人事労務・給与計算・経費精算・ワークフローを一つにまとめた人事労務アプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1', 'R2', 'Better Auth'],
    github_url: 'https://github.com/otomatty/minamo-hr',
    website_url: null,
    goal: '市販の人事労務 SaaS と同じ業務の流れを、Cloudflare だけで月額ほぼ 0 円で動かす。',
    impacts: [nearZeroInfra],
  },
  {
    slug: 'facette',
    title: 'Facette',
    subtitle: 'タレントマネジメント',
    description: '顔写真で社員を一覧し、評価・配置・1on1 記録までを扱うタレントマネジメント',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    technologies: ['TypeScript', 'React', 'Hono', 'Cloudflare Workers', 'D1'],
    github_url: 'https://github.com/otomatty/facette',
    website_url: null,
    goal: '人材情報・評価・配置をまとめて扱うタレントマネジメントを、Cloudflare だけで月額ほぼ 0 円で動かす。',
    impacts: [nearZeroInfra],
  },
  {
    slug: 'kaiwa',
    title: 'Kaiwa',
    subtitle: 'チームチャット',
    description: 'Slack と同等の操作感を目指したチームチャット',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    technologies: ['TypeScript', 'React', 'Zustand', 'Hono', 'Durable Objects', 'D1', 'R2'],
    github_url: 'https://github.com/otomatty/kaiwa',
    website_url: null,
    goal: 'フロントエンドから API・リアルタイム配信・DB・ファイル保存までを Cloudflare で完結させ、月額ほぼ 0 円で動かす。',
    impacts: [nearZeroInfra],
  },
  {
    slug: 'sen',
    title: 'Sen',
    subtitle: '日本語の課題管理',
    description: 'Linear の設計思想を受け継いだ、日本語 UI の課題管理アプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    technologies: ['TypeScript', 'React', 'Hono', 'Durable Objects', 'IndexedDB', 'PWA'],
    github_url: 'https://github.com/otomatty/sen',
    website_url: null,
    goal: '待ち時間のない操作とキーボード中心の課題管理を、日本語で使えるようにする。',
    impacts: [nearZeroInfra],
  },
  {
    slug: 'aidlc-guide',
    title: 'AIDLC Guide',
    subtitle: 'AI-DLC の進み具合を見る VS Code / Cursor 拡張',
    description: 'AI-DLC の現在地・成果物・次の承認を、エディターの中で確認できる拡張機能',
    category: 'personal',
    status: 'published',
    period: { start: '2026-07' },
    technologies: ['TypeScript', 'VS Code 拡張', 'MCP', 'Bun'],
    github_url: 'https://github.com/otomatty/aidlc-guide',
    website_url: null,
    goal: 'AI-DLC で「今どの工程か」「何を承認すればよいか」「成果物はどこか」を探す時間をなくし、初めての人でも進められるようにする。',
  },
  {
    slug: 'zukai',
    title: 'zukai',
    subtitle: 'AI の原稿から図解資料を作るツール',
    description: 'AI が書いた原稿から、図を中心にした資料を作って各形式に書き出す',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10' },
    technologies: ['TypeScript', 'Node.js', 'Markdown'],
    github_url: 'https://github.com/otomatty/zukai',
    website_url: null,
    goal: '設計書や説明資料を作る時間を減らす。原稿を検査してから HTML・PDF・Word・PowerPoint・Confluence に書き出す。',
  },
  {
    slug: 'm3-baseui',
    title: 'm3-baseui',
    subtitle: 'Material Design 3 のコンポーネントライブラリ',
    description: 'Base UI の上に Material Design 3 を実装し、スタイルの仕組みを差し替えられるようにした',
    category: 'personal',
    status: 'published',
    period: { start: '2026-06' },
    technologies: ['TypeScript', 'React', 'Base UI', 'vanilla-extract', 'Tailwind CSS'],
    github_url: 'https://github.com/otomatty/m3-baseui',
    website_url: null,
  },
  {
    slug: 'dev-puzzle',
    title: 'DevPuzzle',
    subtitle: 'プログラミングパズル',
    description: 'ロボットに命令を並べて星を集める、RoboZZle 型のプログラミングパズル',
    category: 'personal',
    status: 'published',
    period: { start: '2026-10', end: '2026-10' },
    technologies: ['TypeScript', 'Cloudflare Workers', 'D1', 'Playwright'],
    github_url: 'https://github.com/otomatty/dev-puzzle',
    website_url: 'https://robozzle.saedgewell.workers.dev',
  },
  {
    slug: 'skill-quest-ai',
    title: 'Skill Quest Ai',
    description: 'SES 企業に所属するエンジニアのための LXP（Learning Experience Platform）のプロトタイプ',
    category: 'personal',
    status: 'published',
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
    status: 'published',
    period: { start: '2026-01', end: '2026-01' },
    thumbnail: '/images/works/robbozle-game.webp',
    technologies: ['TypeScript', 'CSS', 'JavaScript'],
    github_url: 'https://github.com/otomatty/logic-lab.git',
    website_url: 'https://code-blossom-bot.lovable.app',
  },
  {
    slug: 'zedi',
    title: 'Zedi',
    description: 'AI 時代のメモアプリ。気になることをリンクにし、新たな知識を AI を活用して身につけていける',
    category: 'personal',
    status: 'published',
    period: { start: '2025-12' },
    technologies: ['TypeScript', 'CSS', 'HTML', 'JavaScript'],
    github_url: 'https://github.com/otomatty/zedi',
    website_url: 'https://zedi-note.app',
  },
  {
    slug: 'typeflow',
    title: 'Typeflow',
    description: 'ビルド待ちなどのすき間時間に、技術用語のタイピングを練習できるアプリ',
    category: 'personal',
    status: 'published',
    period: { start: '2025-12' },
    thumbnail: '/images/works/typeflow.webp',
    technologies: ['TypeScript', 'CSS', 'JavaScript', 'Shell', 'HTML'],
    github_url: 'https://github.com/otomatty/typeflow',
    website_url: 'https://type-flow.app',
  },
  {
    slug: 'career-gems',
    title: 'Career Gems',
    description: 'SES 企業のエンジニアのスキル管理ツールのプロトタイプ',
    category: 'personal',
    status: 'published',
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
    status: 'published',
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
    status: 'published',
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
    status: 'published',
    period: { start: '2022-08', end: '2025-06' },
    thumbnail: '/images/works/saedgewell.webp',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github_url: 'https://github.com/otomatty/saedgewell-v2',
    website_url: 'https://saedgewell.com',
    goal: '定型の問い合わせ対応を AI チャットボットに任せ、ヒアリングから概算見積もりを出すまでの時間を縮める。',
  },
  {
    slug: 'ofunato-mokumoku',
    title: 'Ofunato Mokumoku',
    description: '主催していた大船渡もくもく会の公式サイト',
    category: 'personal',
    status: 'published',
    period: { start: '2024-09', end: '2024-09' },
    thumbnail: '/images/works/ofunato-mokumoku.webp',
    technologies: ['TypeScript', 'CSS', 'HTML'],
    github_url: 'https://github.com/otomatty/ofunato-mokumoku',
    website_url: 'https://ofunato-mokumoku.pages.dev/',
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

/**
 * 期間の表示（例: 2026.07 – 2026.10、2026.09 –、2026.10）
 */
export const formatWorkPeriod = (period: Work['period']): string => {
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
