import { TAU, clamp01, ramp } from './core';
import { crosshair, glow, protractor } from './marks';
import { steinerChain } from './sangaku';
import { layerOffset, type SceneBuilder, type SceneState } from './scene';
import type { PrimList } from './vector-renderer';

/**
 * 下層ページの見出しに置く作図。どれもコンパスと定規で描ける図形で、
 * トップの算額と同じく「奥：分度器と補助線 / 中：図形 / 手前：大きな影」の3層で動く。
 */

/** 図形の位置。横長では右側、縦長では文字の上に置く */
function focal(state: SceneState) {
  if (state.compact) {
    return { cx: state.width * 0.5, cy: state.height * 0.25, r: Math.min(state.width * 0.24, state.height * 0.17) };
  }
  return { cx: state.width * 0.75, cy: state.height * 0.5, r: Math.min(state.height * 0.3, state.width * 0.15) };
}

/** 奥の層：どの図形にも共通する分度器と補助線 */
function backdrop(state: SceneState, prims: PrimList, cx: number, cy: number, R: number, divisions = 72, majorEvery = 6) {
  const o = layerOffset(state, 0.35, 0.5);
  const Rt = R * 1.17;
  protractor(prims, cx + o.x, cy + o.y, Rt, ramp(state.time, 0.1, 1.8), divisions, majorEvery);
  crosshair(prims, cx + o.x, cy + o.y, Rt * 1.3, ramp(state.time, 0.6, 1.4));
}

const echoAlpha = (state: SceneState) => (state.compact ? 0 : 0.1 * ramp(state.time, 1.2, 2));

/* ── 七宝（種の円）：About ───────────────────────────────── */

/** 中心の円の周上に、同じ半径の円を6つ。コンパスの幅を変えずに描ける最初の模様 */
function seedOfLife(prims: PrimList, X: number, Y: number, r: number, spin: number, t: number) {
  const lit = t * 0.5;
  prims.ring(X, Y, r, 1.1, 0.8, 0, -Math.PI / 2, TAU * ramp(t, 0.3, 1.2));
  for (let k = 0; k < 6; k++) {
    const a = spin - Math.PI / 2 + (k * TAU) / 6;
    const g = glow(a, lit - Math.PI / 2, 8);
    // コンパスの針を周上に置き、中心から描き始める
    prims.ring(X + Math.cos(a) * r, Y + Math.sin(a) * r, r, 1, 0.6 + 0.35 * g, g > 0.45 ? 1 : 0, a + Math.PI, TAU * ramp(t, 0.8 + k * 0.18, 0.9));
  }
}

const seed: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time, r = R / 2, spin = t * 0.035;
  backdrop(state, prims, cx, cy, R);

  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  prims.ring(X, Y, R, 1.1, 0.85, 0, -Math.PI / 2, TAU * ramp(t, 0, 1.4));
  seedOfLife(prims, X, Y, r, spin, t);

  // 花びらの中心を結ぶ六角形（破線）と、円どうしが交わる点
  const hex = ramp(t, 2.2, 1.1), dots = ramp(t, 2.6, 0.8);
  for (let k = 0; k < 6; k++) {
    const a = spin - Math.PI / 2 + (k * TAU) / 6, b = a + TAU / 6;
    prims.segment(X + Math.cos(a) * r, Y + Math.sin(a) * r, X + Math.cos(b) * r, Y + Math.sin(b) * r, 1, 0.3, 0, 0, hex, 5);
    prims.disc(X + Math.cos(a) * R, Y + Math.sin(a) * R, 1.7, 0.9 * dots, 2);
    prims.disc(X + Math.cos(a + TAU / 12) * r * Math.sqrt(3), Y + Math.sin(a + TAU / 12) * r * Math.sqrt(3), 1.5, 0.7 * dots, 2);
  }
  prims.disc(X, Y, 1.7, 0.9 * dots, 2);

  const alpha = echoAlpha(state);
  if (alpha > 0) {
    const n = layerOffset(state, 1.35, 0.14);
    const NX = cx + n.x + R * 0.7, NY = cy + n.y + R * 0.95, NR = R * 1.15;
    prims.ring(NX, NY, NR, 1, alpha, 0);
    for (let k = 0; k < 6; k++) {
      const a = -spin * 0.6 + (k * TAU) / 6;
      prims.ring(NX + Math.cos(a) * NR, NY + Math.sin(a) * NR, NR, 1, alpha, 0);
    }
  }
};

/* ── 黄金螺旋：Story ───────────────────────────────────── */

const PHI = (1 + Math.sqrt(5)) / 2;

interface GoldenStep {
  /** 正方形の中にある四分円の中心と半径、描き始めの角度 */
  cx: number;
  cy: number;
  r: number;
  start: number;
  /** 正方形と残りの長方形を分ける線 */
  line: [number, number, number, number];
}

/** 黄金長方形から正方形を左・上・右・下の順に切り取り、各正方形に四分円を入れる */
function goldenSteps(x: number, y: number, w: number, n: number): GoldenStep[] {
  let h = w / PHI;
  const steps: GoldenStep[] = [];
  for (let k = 0; k < n; k++) {
    const dir = k % 4;
    if (dir === 0) {
      const s = h;
      steps.push({ cx: x + s, cy: y + s, r: s, start: Math.PI, line: [x + s, y, x + s, y + s] });
      x += s;
      w -= s;
    } else if (dir === 1) {
      const s = w;
      steps.push({ cx: x, cy: y + s, r: s, start: Math.PI * 1.5, line: [x, y + s, x + s, y + s] });
      y += s;
      h -= s;
    } else if (dir === 2) {
      const s = h;
      steps.push({ cx: x + w - s, cy: y, r: s, start: 0, line: [x + w - s, y, x + w - s, y + s] });
      w -= s;
    } else {
      const s = w;
      steps.push({ cx: x + s, cy: y + h - s, r: s, start: Math.PI * 0.5, line: [x, y + h - s, x + s, y + h - s] });
      h -= s;
    }
  }
  return steps;
}

const arcPoint = (step: GoldenStep, f: number): [number, number] => {
  const a = step.start + (f * Math.PI) / 2;
  return [step.cx + Math.cos(a) * step.r, step.cy + Math.sin(a) * step.r];
};

const spiral: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time;
  const W = R * 2.7, H = W / PHI;
  const n = 11;
  const steps = goldenSteps(-W / 2, -H / 2, W, n + 12);
  const eye = arcPoint(steps[steps.length - 1], 1);

  // 奥：外枠と、渦の目を通る補助線・目盛り
  let o = layerOffset(state, 0.35, 0.5);
  let X = cx + o.x, Y = cy + o.y;
  const frame = ramp(t, 0.1, 1.6);
  const corners: Array<[number, number]> = [[-W / 2, -H / 2], [W / 2, -H / 2], [W / 2, H / 2], [-W / 2, H / 2]];
  corners.forEach(([x0, y0], k) => {
    const [x1, y1] = corners[(k + 1) % 4];
    prims.segment(X + x0, Y + y0, X + x1, Y + y1, 1, 0.22, 0, 0, frame, 6);
  });
  crosshair(prims, X + eye[0], Y + eye[1], W * 0.62, ramp(t, 0.6, 1.4));
  protractor(prims, X + eye[0], Y + eye[1], R * 0.26, ramp(t, 0.4, 1.6), 36, 9);

  // 中：正方形の区切りと四分円
  o = layerOffset(state, 0.7, 0.36);
  X = cx + o.x;
  Y = cy + o.y;
  corners.forEach(([x0, y0], k) => {
    const [x1, y1] = corners[(k + 1) % 4];
    prims.segment(X + x0, Y + y0, X + x1, Y + y1, 1, 0.6, 0, 0, ramp(t, 0, 1.2));
  });
  // 外から内へ1つずつ描き、描き終えたあとは光が渦の目から外へ向かって進む
  const travel = t > 4 ? ((t - 4) / 7) % 1 : -1;
  const u = (1 - travel) * n;
  steps.slice(0, n).forEach((step, k) => {
    const drawn = ramp(t, 0.9 + k * 0.22, 0.7);
    const [x0, y0, x1, y1] = step.line;
    prims.segment(X + x0, Y + y0, X + x1, Y + y1, 1, 0.38, 0, 0, drawn);
    const lit = travel < 0 ? 0 : clamp01(1 - Math.abs(u - (k + 0.5)) / 1.2);
    prims.ring(X + step.cx, Y + step.cy, step.r, 1.1, 0.8 + 0.2 * lit, lit > 0.5 ? 1 : 0, step.start, (Math.PI / 2) * drawn);
    const [px, py] = arcPoint(step, 0);
    prims.disc(X + px, Y + py, 1.6, 0.8 * ramp(t, 1.3 + k * 0.22, 0.5), 2);
  });
  if (travel >= 0) {
    const k = Math.min(n - 1, Math.floor(u));
    const [px, py] = arcPoint(steps[k], u - k);
    prims.disc(X + px, Y + py, 2.2, 0.95 * Math.sin(Math.PI * travel), 2);
  }
  prims.disc(X + eye[0], Y + eye[1], 1.8, 0.9 * ramp(t, 3.4, 0.6), 2);

  // 手前：大きく描いた同じ螺旋の外側
  const alpha = echoAlpha(state);
  if (alpha > 0) {
    const n2 = layerOffset(state, 1.35, 0.14);
    const NW = W * 2.2;
    for (const step of goldenSteps(-NW / 2, -NW / PHI / 2, NW, 5)) {
      prims.ring(cx + n2.x + R * 0.7 + step.cx, cy + n2.y + R * 0.9 + step.cy, step.r, 1, alpha, 0, step.start, Math.PI / 2);
    }
  }
};

/* ── 正五角形の作図：Skills ────────────────────────────── */

const pentagon: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time;
  backdrop(state, prims, cx, cy, R, 60, 12);

  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  const vertex = (k: number): [number, number] => {
    const a = -Math.PI / 2 + (k * TAU) / 5;
    return [X + Math.cos(a) * R, Y + Math.sin(a) * R];
  };
  prims.ring(X, Y, R, 1.1, 0.85, 0, -Math.PI / 2, TAU * ramp(t, 0, 1.4));

  // 右の半径の中点 M から頂点 A までの長さで横軸を切ると、AN が一辺の長さになる
  const Mx = X + R / 2, A = vertex(0), Nx = X - (R * (Math.sqrt(5) - 1)) / 2;
  const mr = (R * Math.sqrt(5)) / 2;
  prims.disc(Mx, Y, 1.8, 0.9 * ramp(t, 1.0, 0.4), 2);
  prims.ring(Mx, Y, mr, 1, 0.22, 0, Math.PI - 0.12, (Math.atan2(2, 1) + 0.24) * ramp(t, 1.2, 0.9));
  prims.disc(Nx, Y, 1.8, 0.9 * ramp(t, 2.0, 0.4), 2);
  prims.segment(A[0], A[1], Nx, Y, 1, 0.75, 1, 0, ramp(t, 2.1, 0.6));

  // A から AN の幅で円を切り、残りの頂点を順に求める
  const side = Math.hypot(A[0] - Nx, A[1] - Y);
  const cuts: Array<[number, number]> = [[0, 1], [0, 4], [1, 2], [4, 3]];
  cuts.forEach(([from, to], k) => {
    const p = vertex(from), q = vertex(to);
    const a = Math.atan2(q[1] - p[1], q[0] - p[0]);
    prims.ring(p[0], p[1], side, 1, 0.4, 0, a - 0.16, 0.32 * ramp(t, 2.5 + k * 0.25, 0.5));
  });

  // 辺と星形。星形の対角線は互いを黄金比に分ける
  const lit = (t * 0.35) % 5;
  for (let k = 0; k < 5; k++) {
    const p = vertex(k), q = vertex(k + 1), s = vertex(k + 2);
    const g = clamp01(1 - Math.abs(((lit - k + 5) % 5) - 0.5) * 1.4);
    prims.segment(p[0], p[1], q[0], q[1], 1.1, 0.75 + 0.25 * g, g > 0.5 ? 1 : 0, 0, ramp(t, 3.3 + k * 0.15, 0.6));
    prims.segment(p[0], p[1], s[0], s[1], 1, 0.3, 0, 0, ramp(t, 4.1 + k * 0.15, 0.7));
    prims.disc(p[0], p[1], 1.9, 0.95 * ramp(t, 2.7 + k * 0.2, 0.4), 2);
  }
  const inner = R * (Math.cos(TAU / 5) / Math.cos(TAU / 10));
  const golden = ramp(t, 5.1, 0.7);
  for (let k = 0; k < 5; k++) {
    const a = Math.PI / 2 + (k * TAU) / 5;
    prims.disc(X + Math.cos(a) * inner, Y + Math.sin(a) * inner, 1.5, 0.8 * golden, 2);
  }
  prims.ring(X, Y, inner, 1, 0.3 * golden, 0);

  // 手前：ゆっくり逆向きに回る大きな五角形
  const alpha = echoAlpha(state);
  if (alpha > 0) {
    const n = layerOffset(state, 1.35, 0.14);
    const NX = cx + n.x + R * 0.8, NY = cy + n.y + R * 1.1, NR = R * 2.1, spin = -t * 0.02;
    for (let k = 0; k < 5; k++) {
      const a = spin + (k * TAU) / 5, b = a + TAU / 5;
      prims.segment(NX + Math.cos(a) * NR, NY + Math.sin(a) * NR, NX + Math.cos(b) * NR, NY + Math.sin(b) * NR, 1, alpha, 0);
    }
    prims.ring(NX, NY, NR, 1, alpha * 0.8, 0);
  }
};

/* ── アポロニウスの窓：Works ───────────────────────────── */

interface Disk {
  /** 曲率（半径の逆数）。外側の円だけ負になる */
  k: number;
  x: number;
  y: number;
  generation: number;
}

let gasketCache: Disk[] | null = null;

/**
 * 互いに接する3つの円には、接する円がちょうど2つある（デカルトの円定理）。
 * 一方がわかれば、もう一方は k' = 2(k1 + k2 + k3) − k で求まり、中心も同じ形の式で求まる。
 */
function gasket(maxCurvature = 100): Disk[] {
  if (gasketCache) return gasketCache;
  const outer: Disk = { k: -1, x: 0, y: 0, generation: 0 };
  const a: Disk = { k: 2, x: -0.5, y: 0, generation: 0 };
  const b: Disk = { k: 2, x: 0.5, y: 0, generation: 0 };
  const c: Disk = { k: 3, x: 0, y: 2 / 3, generation: 1 };
  const d: Disk = { k: 3, x: 0, y: -2 / 3, generation: 1 };
  const disks = [a, b, c, d];
  const fill = (p: Disk, q: Disk, s: Disk, opposite: Disk, generation: number) => {
    const k = 2 * (p.k + q.k + s.k) - opposite.k;
    if (k > maxCurvature) return;
    const next: Disk = {
      k,
      x: (2 * (p.k * p.x + q.k * q.x + s.k * s.x) - opposite.k * opposite.x) / k,
      y: (2 * (p.k * p.y + q.k * q.y + s.k * s.y) - opposite.k * opposite.y) / k,
      generation,
    };
    disks.push(next);
    fill(p, q, next, s, generation + 1);
    fill(p, s, next, q, generation + 1);
    fill(q, s, next, p, generation + 1);
  };
  fill(outer, a, c, b, 2);
  fill(outer, b, c, a, 2);
  fill(outer, a, d, b, 2);
  fill(outer, b, d, a, 2);
  fill(a, b, c, outer, 2);
  fill(a, b, d, outer, 2);
  gasketCache = disks;
  return disks;
}

const apollonian: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time, spin = t * 0.025, phase = t * 0.45;
  const cos = Math.cos(spin), sin = Math.sin(spin);
  backdrop(state, prims, cx, cy, R);

  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  prims.ring(X, Y, R, 1.1, 0.85, 0, -Math.PI / 2, TAU * ramp(t, 0, 1.4));
  for (const disk of gasket()) {
    const r = R / disk.k;
    if (r < 1.5) continue;
    const x = X + (disk.x * cos - disk.y * sin) * R;
    const y = Y + (disk.x * sin + disk.y * cos) * R;
    const drawn = ramp(t, 0.5 + disk.generation * 0.32, 0.9);
    const size = clamp01((r - 2) / 36);
    const g = glow(Math.atan2(y - Y, x - X), phase, 10) * size;
    prims.ring(x, y, r, 1, (0.28 + 0.55 * size + 0.25 * g) * Math.min(1, drawn * 1.6), g > 0.4 ? 1 : 0, Math.atan2(Y - y, X - x), TAU * drawn);
    if (disk.generation < 2) prims.ring(x, y, r * 0.56, 1, 0.14 * drawn, 0);
  }

  // 最初の4つの円どうし、外の円との接点
  const dots = ramp(t, 2.4, 0.8);
  if (dots > 0) {
    const points: Array<[number, number]> = [[0, 0], [-1, 0], [1, 0], [0, 1], [0, -1], [-0.2, 0.4], [0.2, 0.4], [-0.2, -0.4], [0.2, -0.4]];
    for (const [u, v] of points) prims.disc(X + (u * cos - v * sin) * R, Y + (u * sin + v * cos) * R, 1.7, 0.9 * dots, 2);
  }

  const alpha = echoAlpha(state);
  if (alpha > 0) {
    const n = layerOffset(state, 1.35, 0.14);
    const NX = cx + n.x + R * 0.6, NY = cy + n.y + R, NR = R * 2.3;
    const c2 = Math.cos(-spin * 0.6), s2 = Math.sin(-spin * 0.6);
    prims.ring(NX, NY, NR, 1, alpha, 0);
    for (const disk of gasket().slice(0, 12)) {
      prims.ring(NX + (disk.x * c2 - disk.y * s2) * NR, NY + (disk.x * s2 + disk.y * c2) * NR, NR / disk.k, 1, alpha, 0);
    }
  }
};

/* ── ヴェシカ（ユークリッド原論 第1巻 命題1）：Contact ───────── */

const vesica: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time;
  backdrop(state, prims, cx, cy, R);

  // 線分 AB を半径とする円を A と B から描くと、交点 C と ABC が正三角形になる
  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  const r = R * 0.62, h = (r * Math.sqrt(3)) / 2;
  const A: [number, number] = [X - r / 2, Y], B: [number, number] = [X + r / 2, Y];
  const C: [number, number] = [X, Y - h], D: [number, number] = [X, Y + h];
  prims.segment(A[0], A[1], B[0], B[1], 1.1, 0.75, 0, 0, ramp(t, 0.2, 0.8));
  prims.ring(A[0], A[1], r, 1.1, 0.85, 0, 0, TAU * ramp(t, 0.6, 1.4));
  prims.ring(B[0], B[1], r, 1.1, 0.85, 0, Math.PI, TAU * ramp(t, 0.9, 1.4));
  const tri = ramp(t, 2.4, 0.8);
  prims.segment(A[0], A[1], C[0], C[1], 1, 0.6, 1, 0, tri);
  prims.segment(B[0], B[1], C[0], C[1], 1, 0.6, 1, 0, tri);
  prims.segment(A[0], A[1], D[0], D[1], 1, 0.3, 0, 0, ramp(t, 2.8, 0.8), 5);
  prims.segment(B[0], B[1], D[0], D[1], 1, 0.3, 0, 0, ramp(t, 2.8, 0.8), 5);
  prims.segment(C[0], C[1] - r * 0.5, D[0], D[1] + r * 0.5, 1, 0.3, 0, 0, ramp(t, 3.2, 1), 7);
  // 両端の円を広げた、次の作図の円
  const next = ramp(t, 3.6, 1.4);
  prims.ring(A[0], A[1], r * 2, 1, 0.16, 0, 0, TAU * next);
  prims.ring(B[0], B[1], r * 2, 1, 0.16, 0, Math.PI, TAU * next);

  for (const [px, py] of [A, B]) prims.disc(px, py, 1.9, 0.95 * ramp(t, 0.2, 0.4), 2);
  for (const [px, py] of [C, D]) prims.disc(px, py, 1.9, 0.95 * ramp(t, 2.2, 0.6), 2);

  // 2つの円が重なる部分（ヴェシカ）の縁を、光が一周する
  if (t > 3) {
    const u = ((t - 3) / 6) % 1;
    const onA = u < 0.5, f = onA ? u * 2 : (u - 0.5) * 2;
    const centre = onA ? A : B, start = onA ? -Math.PI / 3 : (2 * Math.PI) / 3;
    const a = start + f * ((2 * Math.PI) / 3);
    const tail = Math.max(start, a - 0.5);
    prims.ring(centre[0], centre[1], r, 1.4, 0.9, 1, tail, a - tail);
    prims.disc(centre[0] + Math.cos(a) * r, centre[1] + Math.sin(a) * r, 2.2, 0.95, 2);
  }

  const alpha = echoAlpha(state);
  if (alpha > 0) {
    const n = layerOffset(state, 1.35, 0.14);
    const NX = cx + n.x + R * 0.5, NY = cy + n.y + R * 1.2, NR = R * 1.6;
    prims.ring(NX - NR / 2, NY, NR, 1, alpha, 0);
    prims.ring(NX + NR / 2, NY, NR, 1, alpha, 0);
  }
};

/* ── 入れ子の円と正方形（年輪）：Career ────────────────────── */

const nested: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time;
  backdrop(state, prims, cx, cy, R);

  // 円に内接する正方形、その正方形に内接する円…と半径が 1/√2 ずつ縮む。
  // 正方形はそれぞれ違う速さで回るが、頂点は外の円の上、辺は内の円に接したまま
  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  const levels = 7;
  let r = R;
  for (let k = 0; k < levels; k++) {
    const circle = ramp(t, k * 0.35, 1.1), square = ramp(t, 0.5 + k * 0.35, 0.9);
    const fade = 1 - k * 0.07;
    prims.ring(X, Y, r, 1.1, 0.85 * fade, 0, -Math.PI / 2, TAU * circle);
    const turn = Math.PI / 4 * k + t * 0.04 * (k % 2 === 0 ? 1 : -1) * (1 + k * 0.25);
    for (let j = 0; j < 4; j++) {
      const a = turn + (j * TAU) / 4, b = a + TAU / 4;
      const lit = glow(a, t * 0.6 - k * 0.5, 12);
      prims.segment(X + Math.cos(a) * r, Y + Math.sin(a) * r, X + Math.cos(b) * r, Y + Math.sin(b) * r, 1, 0.5 * fade, 0, 0, square);
      prims.disc(X + Math.cos(a) * r, Y + Math.sin(a) * r, 1.6 + lit * 0.8, (0.7 + 0.3 * lit) * square, 2);
    }
    r /= Math.SQRT2;
  }

  const alpha = echoAlpha(state);
  if (alpha > 0) {
    const n = layerOffset(state, 1.35, 0.14);
    const NX = cx + n.x + R * 0.7, NY = cy + n.y + R * 1.05, NR = R * 2.2, turn = -t * 0.015;
    prims.ring(NX, NY, NR, 1, alpha, 0);
    for (let j = 0; j < 4; j++) {
      const a = turn + (j * TAU) / 4, b = a + TAU / 4;
      prims.segment(NX + Math.cos(a) * NR, NY + Math.sin(a) * NR, NX + Math.cos(b) * NR, NY + Math.sin(b) * NR, 1, alpha, 0);
    }
  }
};

/* ── 目盛りと円だけの静かな図：規約などの文書ページ ───────────── */

const ticks: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time;
  backdrop(state, prims, cx, cy, R);

  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  prims.ring(X, Y, R, 1.1, 0.7, 0, -Math.PI / 2, TAU * ramp(t, 0, 1.4));
  prims.ring(X, Y, R / PHI, 1, 0.3, 0, -Math.PI / 2, TAU * ramp(t, 0.5, 1.4), 6);
  // コンパスの脚のように、半径が一定の速さで回る
  const a = -Math.PI / 2 + t * 0.12, reach = ramp(t, 1.2, 0.8);
  prims.segment(X, Y, X + Math.cos(a) * R, Y + Math.sin(a) * R, 1, 0.55, 1, 0, reach);
  prims.ring(X, Y, R, 1.4, 0.9 * reach, 1, a - 0.6, 0.6);
  prims.disc(X + Math.cos(a) * R, Y + Math.sin(a) * R, 2, 0.95 * reach, 2);
  prims.disc(X, Y, 1.8, 0.9 * reach, 2);
};

/* ── 1つ欠けた円鎖：404 ──────────────────────────────── */

const gap: SceneBuilder = (state, prims) => {
  const { cx, cy, r: R } = focal(state);
  const t = state.time, n = 9;
  backdrop(state, prims, cx, cy, R);

  const o = layerOffset(state, 0.7, 0.36);
  const X = cx + o.x, Y = cy + o.y;
  const { inner, chain } = steinerChain(n, -0.3, 0.16, t * 0.09 + 0.6);
  prims.ring(X, Y, R, 1.1, 0.85, 0, -Math.PI / 2, TAU * ramp(t, 0, 1.4));
  prims.ring(X + inner[0] * R, Y + inner[1] * R, inner[2] * R, 1.1, 0.8, 0, -Math.PI / 2, TAU * ramp(t, 0.3, 1.3));
  const missing = 0;
  chain.forEach((c, k) => {
    const x = X + c[0] * R, y = Y + c[1] * R, r = c[2] * R;
    if (k === missing) {
      // 本来あるはずの円は破線だけで示し、ゆっくり明滅させる
      const pulse = 0.25 + 0.2 * Math.sin(t * 1.6);
      prims.ring(x, y, r, 1, pulse * ramp(t, 1.6, 0.8), 1, 0, TAU, 6);
      return;
    }
    const drawn = ramp(t, 0.7 + k * 0.08, 0.9);
    prims.ring(x, y, r, 1, 0.7, 0, -Math.PI / 2, TAU * drawn);
    prims.ring(x, y, r * 0.56, 1, 0.16 * drawn, 0);
  });
  // 欠けた円に触れない接点だけを打つ
  const dots = ramp(t, 1.9, 0.8);
  chain.forEach((c, k) => {
    const next = (k + 1) % n;
    if (k === missing || next === missing) return;
    const d = chain[next], f = c[2] / (c[2] + d[2]);
    prims.disc(X + (c[0] + (d[0] - c[0]) * f) * R, Y + (c[1] + (d[1] - c[1]) * f) * R, 1.7, 0.9 * dots, 2);
  });
};

export const pageFigures = { seed, spiral, pentagon, apollonian, vesica, nested, ticks, gap } satisfies Record<string, SceneBuilder>;

export type PageFigure = keyof typeof pageFigures;
