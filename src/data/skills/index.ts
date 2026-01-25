/**
 * スキルデータの集約
 *
 * カテゴリ別に分割されたスキルデータを統合してエクスポートします。
 *
 * ファイル構成:
 * - frontend-core.ts: HTML/CSS, JavaScript, TypeScript, React, Next.js, Astro
 * - frontend-styling.ts: CSS フレームワーク, CSS-in-JS, UIライブラリ
 * - frontend-ecosystem.ts: 状態管理, フォーム, アニメーション, テスト
 * - backend-infra.ts: Node.js, データベース, クラウド, インフラ
 */
import type { SkillRecord } from '@/types/skill';

import { frontendCoreSkills } from './frontend-core';
import { frontendStylingSkills } from './frontend-styling';
import { frontendEcosystemSkills } from './frontend-ecosystem';
import { backendInfraSkills } from './backend-infra';

export const skills: SkillRecord[] = [
  ...frontendCoreSkills,
  ...frontendStylingSkills,
  ...frontendEcosystemSkills,
  ...backendInfraSkills,
];

// 個別エクスポート（必要に応じて使用）
export {
  frontendCoreSkills,
  frontendStylingSkills,
  frontendEcosystemSkills,
  backendInfraSkills,
};
