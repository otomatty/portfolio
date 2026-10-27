import { TAU, ramp } from './core';
import type { PrimList } from './vector-renderer';

/**
 * Hero の「算額」：シュタイナーの円鎖。
 * 大小2つの円の間を n 個の円が互いに接しながら埋める。一度閉じた円鎖は
 * どこから始めても閉じる（シュタイナーのポリズム）ため、止まらずに回り続けられる。
 */

export interface SceneState {
  /** キャンバスの CSS サイズ */
  width: number;
  height: number;
  /** シーン開始からの秒数 */
  time: number;
  /** カーソル位置（-1..1、なめらかに追従させた値） */
  pointerX: number;
  pointerY: number;
  /** Hero 内でのスクロール量（px） */
  scroll: number;
  compact: boolean;
}

type Circle = readonly [x: number, y: number, r: number];

function circumcircle(a: readonly [number, number], b: readonly [number, number], c: readonly [number, number]): Circle {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  const a2 = a[0] ** 2 + a[1] ** 2, b2 = b[0] ** 2 + b[1] ** 2, c2 = c[0] ** 2 + c[1] ** 2;
  const x = (a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d;
  const y = (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d;
  return [x, y, Math.hypot(a[0] - x, a[1] - y)];
}

/**
 * 同心円の間に等しい円を n 個並べ、単位円板の自己同型 z → (z − a) / (1 − ā z) で写す。
 * 円は円に写るので、写した円周上の3点から外接円を求めればよい。
 */
export function steinerChain(n: number, ar: number, ai: number, phase: number): { inner: Circle; chain: Circle[] } {
  const s = Math.sin(Math.PI / n);
  const rho = (1 - s) / (1 + s);
  const map = (x: number, y: number): [number, number] => {
    const nr = x - ar, ni = y - ai;
    const dr = 1 - (ar * x + ai * y), di = -(ar * y - ai * x);
    const den = dr * dr + di * di;
    return [(nr * dr + ni * di) / den, (ni * dr - nr * di) / den];
  };
  const mapCircle = (x: number, y: number, r: number): Circle =>
    circumcircle(map(x + r, y), map(x - r * 0.5, y + r * 0.8660254), map(x - r * 0.5, y - r * 0.8660254));
  const centre = (1 + rho) / 2, radius = (1 - rho) / 2;
  const chain: Circle[] = [];
  for (let k = 0; k < n; k++) {
    const a = phase + (k * TAU) / n;
    chain.push(mapCircle(Math.cos(a) * centre, Math.sin(a) * centre, radius));
  }
  return { inner: mapCircle(0, 0, rho), chain };
}

function focal(state: SceneState) {
  if (state.compact) return { cx: state.width * 0.5, cy: state.height * 0.23, r: state.width * 0.25 };
  return { cx: state.width * 0.69, cy: state.height * 0.5, r: Math.min(state.height * 0.36, state.width * 0.24) };
}

/** 奥の層ほどカーソルで大きくずれ、スクロールではページより遅れて動く */
function layerOffset(state: SceneState, depth: number, lag: number) {
  return { x: -state.pointerX * 22 * depth, y: -state.pointerY * 14 * depth + state.scroll * lag };
}

export function buildSangaku(state: SceneState, prims: PrimList): void {
  const { cx, cy, r: R } = focal(state);
  const t = state.time;

  // 奥：分度器の目盛りと作図の補助線
  let o = layerOffset(state, 0.35, 0.5);
  const X = cx + o.x, Y = cy + o.y, Rt = R * 1.17;
  const ticks = ramp(t, 0.1, 1.8);
  prims.ring(X, Y, Rt, 1, 0.2, 0, -Math.PI / 2, TAU * ticks);
  for (let k = 0; k < 72 && k / 72 < ticks; k++) {
    const a = -Math.PI / 2 + (k * TAU) / 72, major = k % 6 === 0, len = major ? 11 : 5;
    const c = Math.cos(a), s = Math.sin(a);
    prims.segment(X + c * Rt, Y + s * Rt, X + c * (Rt + len), Y + s * (Rt + len), 1, major ? 0.5 : 0.26, 0);
  }
  const axes = ramp(t, 0.6, 1.4);
  prims.segment(X - Rt * 1.3, Y, X + Rt * 1.3, Y, 1, 0.18, 0, 0.5 - axes / 2, 0.5 + axes / 2, 7);
  prims.segment(X, Y - Rt * 1.3, X, Y + Rt * 1.3, 1, 0.18, 0, 0.5 - axes / 2, 0.5 + axes / 2, 7);

  // 中：円鎖
  o = layerOffset(state, 0.7, 0.36);
  const MX = cx + o.x, MY = cy + o.y;
  const toScreen = (x: number, y: number): [number, number] => [MX + x * R, MY + y * R];
  const n = 9;
  const { inner, chain } = steinerChain(n, -0.34, 0.18, t * 0.11);
  prims.ring(MX, MY, R, 1.1, 0.85, 0, -Math.PI / 2, TAU * ramp(t, 0, 1.4));
  const [ix, iy] = toScreen(inner[0], inner[1]);
  prims.ring(ix, iy, inner[2] * R, 1.1, 0.8, 0, -Math.PI / 2, TAU * ramp(t, 0.3, 1.3));

  // 円鎖の中心は、2つの円の中心を焦点とする楕円の上に並ぶ（点線）
  const ellipse = ramp(t, 1.6, 1.2);
  if (ellipse > 0) {
    const A = (1 + inner[2]) / 2;
    const half = Math.hypot(inner[0], inner[1]) / 2;
    const B = Math.sqrt(Math.max(A * A - half * half, 0));
    const ux = half > 1e-6 ? inner[0] / (2 * half) : 1, uy = half > 1e-6 ? inner[1] / (2 * half) : 0;
    const steps = 120;
    let prev: [number, number] | null = null;
    for (let k = 0; k <= steps; k++) {
      const s = (k / steps) * TAU;
      const ex = inner[0] / 2 + ux * A * Math.cos(s) - uy * B * Math.sin(s);
      const ey = inner[1] / 2 + uy * A * Math.cos(s) + ux * B * Math.sin(s);
      const cur = toScreen(ex, ey);
      if (prev && k % 2 === 0) prims.segment(prev[0], prev[1], cur[0], cur[1], 1, 0.3 * ellipse, 0);
      prev = cur;
    }
  }
  chain.forEach((c, k) => {
    const [x, y] = toScreen(c[0], c[1]);
    const r = c[2] * R;
    const drawn = ramp(t, 0.7 + k * 0.08, 0.9);
    // 頂上を通る円だけを少し明るくして、回っていることを伝える
    const top = Math.pow(Math.max(0, Math.cos(Math.atan2(c[1], c[0]) + Math.PI / 2)), 6);
    prims.ring(x, y, r, 1, 0.6 + 0.35 * top, top > 0.45 ? 1 : 0, -Math.PI / 2, TAU * drawn);
    prims.ring(x, y, r * 0.56, 1, (0.14 + 0.3 * top) * drawn, 0);
  });

  // 円どうし、円鎖と外円・内円が接する点
  const dots = ramp(t, 1.9, 0.8);
  if (dots > 0) {
    chain.forEach((c, k) => {
      const next = chain[(k + 1) % n];
      const f = c[2] / (c[2] + next[2]);
      const d0 = Math.hypot(c[0], c[1]);
      const di = Math.hypot(c[0] - inner[0], c[1] - inner[1]);
      const points: Array<[number, number]> = [
        [c[0] + (next[0] - c[0]) * f, c[1] + (next[1] - c[1]) * f],
        [c[0] / d0, c[1] / d0],
        [inner[0] + ((c[0] - inner[0]) / di) * inner[2], inner[1] + ((c[1] - inner[1]) / di) * inner[2]],
      ];
      for (const [u, v] of points) {
        const [px, py] = toScreen(u, v);
        prims.disc(px, py, 1.7, 0.9 * dots, 2);
      }
    });
  }

  // 手前：構図を縁取る大きな円鎖の影
  if (!state.compact) {
    o = layerOffset(state, 1.35, 0.14);
    const NX = cx + o.x + R * 0.6, NY = cy + o.y + R, NR = R * 2.3;
    const echo = steinerChain(7, 0.3, -0.25, -t * 0.05);
    const alpha = 0.1 * ramp(t, 1.2, 2);
    prims.ring(NX, NY, NR, 1, alpha, 0);
    prims.ring(NX + echo.inner[0] * NR, NY + echo.inner[1] * NR, echo.inner[2] * NR, 1, alpha, 0);
    echo.chain.forEach((c) => prims.ring(NX + c[0] * NR, NY + c[1] * NR, c[2] * NR, 1, alpha, 0));
  }
}
