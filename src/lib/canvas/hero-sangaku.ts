import { cssVarColor, observeVisibility, reducedMotionQuery } from './core';
import { buildSangaku, type SceneState } from './sangaku';
import {
  PrimList,
  createCanvas2dRenderer,
  createWebGpuRenderer,
  type VectorPalette,
  type VectorRenderer,
} from './vector-renderer';

/**
 * Hero の円鎖を描画する。WebGPU を優先し、使えないときや GPU を失ったときは Canvas 2D に切り替える。
 * 画面外・タブ非表示では止め、prefers-reduced-motion では完成形の1フレームだけを描く。
 */
export function mountHeroSangaku(section: HTMLElement, initialCanvas: HTMLCanvasElement): void {
  const reduced = reducedMotionQuery();
  const palette: VectorPalette = {
    background: cssVarColor('--background', '#0e1b11'),
    tones: [cssVarColor('--gold-dim', '#987d00'), cssVarColor('--gold', '#d0a900'), cssVarColor('--gold-hi', '#f1d46a')],
  };
  const state: SceneState = { width: 1, height: 1, time: 0, pointerX: 0, pointerY: 0, scroll: 0, compact: false };
  const target = { x: 0, y: 0 };
  const prims = new PrimList();
  let canvas = initialCanvas;
  let renderer: VectorRenderer | null = null;
  let frameId = 0;
  let last = 0;
  let visible = true;

  const measure = () => {
    const rect = section.getBoundingClientRect();
    state.width = rect.width;
    state.height = rect.height;
    state.compact = rect.width / Math.max(1, rect.height) < 1.1;
  };
  const render = () => {
    if (!renderer) return;
    prims.reset();
    buildSangaku(state, prims);
    renderer.frame(prims);
  };
  const canRun = () => renderer !== null && visible && !document.hidden && !reduced.matches;

  const tick = (now: number) => {
    frameId = 0;
    if (!canRun()) return;
    const dt = Math.min(1 / 20, Math.max(1 / 240, (now - last) / 1000));
    last = now;
    state.time += dt;
    const follow = 1 - Math.exp(-dt * 3);
    state.pointerX += (target.x - state.pointerX) * follow;
    state.pointerY += (target.y - state.pointerY) * follow;
    state.scroll = Math.min(Math.max(window.scrollY, 0), state.height);
    render();
    frameId = requestAnimationFrame(tick);
  };
  const resume = () => {
    if (frameId || !canRun()) return;
    last = performance.now();
    frameId = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  };
  const still = () => {
    state.time = 9;
    state.pointerX = 0;
    state.pointerY = 0;
    state.scroll = 0;
    render();
  };

  // WebGPU のコンテキストを取得したキャンバスは 2D に使えないため、切り替え時は作り直す
  const replaceCanvas = () => {
    const next = canvas.cloneNode(false) as HTMLCanvasElement;
    canvas.replaceWith(next);
    canvas = next;
    return next;
  };
  const switchToCanvas2d = () => {
    renderer?.destroy();
    renderer = createCanvas2dRenderer(replaceCanvas(), palette);
  };
  const start = async () => {
    measure();
    try {
      const gpu = await createWebGpuRenderer(canvas, palette, () => {
        if (renderer === gpu) {
          stop();
          switchToCanvas2d();
          if (reduced.matches) still();
          else resume();
        }
      });
      renderer = gpu;
    } catch {
      switchToCanvas2d();
    }
    section.dataset.renderer = renderer?.kind ?? '';
    if (reduced.matches) still();
    else resume();
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch') return;
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
  new ResizeObserver(() => {
    measure();
    if (reduced.matches) still();
    else if (!frameId) render();
  }).observe(section);
  observeVisibility(section, (isVisible) => {
    visible = isVisible;
    if (isVisible) resume();
    else stop();
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : resume()));
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      stop();
      still();
    } else {
      resume();
    }
  });

  void start();
}
