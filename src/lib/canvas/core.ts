/**
 * Canvas / WebGPU 描画の共通ユーティリティ。
 * DPR の上限、キャンバスのリサイズ、表示状態の監視、CSS 変数からの色の取得をまとめる。
 */

export const TAU = Math.PI * 2;

export const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

export const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

/** `start` 秒から `duration` 秒かけて 0 → 1 に変化する値 */
export const ramp = (t: number, start: number, duration: number): number =>
  easeInOut(clamp01((t - start) / duration));

/** 高密度ディスプレイでの描画コストを抑えるため、DPR は 2 までに制限する */
export const pixelRatio = (): number => Math.min(window.devicePixelRatio || 1, 2);

/** キャンバスの内部解像度を表示サイズ × DPR に合わせる。変わったときは true */
export function fitCanvas(canvas: HTMLCanvasElement): boolean {
  const rect = canvas.getBoundingClientRect();
  const ratio = pixelRatio();
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));
  if (canvas.width === width && canvas.height === height) return false;
  canvas.width = width;
  canvas.height = height;
  return true;
}

export const reducedMotionQuery = (): MediaQueryList =>
  window.matchMedia('(prefers-reduced-motion: reduce)');

/** 要素が画面に入っているかを監視する。画面外では描画を止めるために使う */
export function observeVisibility(
  element: Element,
  callback: (visible: boolean) => void,
  rootMargin = '80px'
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => callback(entry.isIntersecting)),
    { rootMargin }
  );
  observer.observe(element);
  return observer;
}

export type Rgb = readonly [number, number, number];

export interface Color {
  /** Canvas 2D にそのまま渡せる色文字列 */
  css: string;
  /** WebGPU に渡す 0..1 の sRGB 値 */
  rgb: Rgb;
}

let probe: CanvasRenderingContext2D | null = null;

/**
 * CSS 変数を色として読む。shadcn/ui 形式の `136 31% 8%` は hsl() として扱う。
 * 値の正規化はブラウザに任せ、Canvas 2D の fillStyle を経由して #rrggbb に揃える。
 */
export function cssVarColor(name: string, fallback: string): Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const value = /^\d/.test(raw) && raw.includes('%') ? `hsl(${raw})` : raw;
  probe ??= document.createElement('canvas').getContext('2d');
  if (!probe) return { css: value, rgb: [0, 0, 0] };
  probe.fillStyle = '#000000';
  probe.fillStyle = value;
  const normalized = String(probe.fillStyle);
  const hex = /^#([0-9a-f]{6})$/i.exec(normalized);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return { css: normalized, rgb: [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] };
  }
  const parts = normalized.match(/[\d.]+/g)?.slice(0, 3).map((v) => Number(v) / 255) ?? [0, 0, 0];
  return { css: normalized, rgb: [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0] };
}
