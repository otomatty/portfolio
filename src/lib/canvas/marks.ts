import { TAU } from './core';
import type { PrimList } from './vector-renderer';

/**
 * 作図の図形に共通する補助の印。どの図形も奥の層にこれを置き、同じ道具で描いたように揃える。
 */

/** 分度器の目盛り。真上から時計回りに progress（0..1）まで描き進める */
export function protractor(
  prims: PrimList,
  x: number,
  y: number,
  r: number,
  progress: number,
  divisions = 72,
  majorEvery = 6
): void {
  prims.ring(x, y, r, 1, 0.2, 0, -Math.PI / 2, TAU * progress);
  for (let k = 0; k < divisions && k / divisions < progress; k++) {
    const a = -Math.PI / 2 + (k * TAU) / divisions, major = k % majorEvery === 0, len = major ? 11 : 5;
    const c = Math.cos(a), s = Math.sin(a);
    prims.segment(x + c * r, y + s * r, x + c * (r + len), y + s * (r + len), 1, major ? 0.5 : 0.26, 0);
  }
}

/** 中心を通る縦横の補助線（破線）。中央から両側へ伸ばす */
export function crosshair(prims: PrimList, x: number, y: number, half: number, progress: number, alpha = 0.18): void {
  const f0 = 0.5 - progress / 2, f1 = 0.5 + progress / 2;
  prims.segment(x - half, y, x + half, y, 1, alpha, 0, f0, f1, 7);
  prims.segment(x, y - half, x, y + half, 1, alpha, 0, f0, f1, 7);
}

/** 光が通り過ぎる強さ。phase と角度 angle が揃うほど 1 に近づく */
export const glow = (angle: number, phase: number, sharpness = 6): number =>
  Math.pow(Math.max(0, Math.cos(angle - phase)), sharpness);
