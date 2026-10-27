import { TAU, cssVarColor, fitCanvas, observeVisibility, pixelRatio, reducedMotionQuery } from './core';

/**
 * Canvas 2D で描く和柄。どちらも円だけで作図する。
 * 画面外・タブ非表示・prefers-reduced-motion では描画を止める。
 */

function animate(target: Element, draw: (now: number) => void): void {
  const reduced = reducedMotionQuery();
  let frameId = 0;
  let visible = false;
  let last = 0;
  const loop = (now: number) => {
    frameId = 0;
    if (!visible || reduced.matches || document.hidden) return;
    // 30fps で十分なので1フレームおきに描く
    if (now - last > 32) {
      draw(now);
      last = now;
    }
    frameId = requestAnimationFrame(loop);
  };
  const start = () => {
    if (!frameId && visible && !reduced.matches && !document.hidden) frameId = requestAnimationFrame(loop);
  };
  observeVisibility(target, (isVisible) => {
    visible = isVisible;
    start();
  });
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', () => {
    draw(performance.now());
    start();
  });
  new ResizeObserver(() => draw(performance.now())).observe(target);
  draw(performance.now());
}

/** 丸窓の中で、七宝つなぎ（半径 r の円を i + j が偶数の格子点 (i·r, j·r) に置いた模様）がゆっくり回る */
export function mountShippoWindow(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = reducedMotionQuery();
  const gold = cssVarColor('--gold', '#d0a900').css;
  const goldDim = cssVarColor('--gold-dim', '#987d00').css;
  const startedAt = performance.now();
  let hover: { x: number; y: number } | null = null;

  const draw = (now: number) => {
    fitCanvas(canvas);
    const ratio = pixelRatio();
    const size = canvas.width / ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const c = size / 2, windowR = size * 0.46, r = windowR / 4.2;
    const rotation = 0.3 + (reduced.matches ? 0 : ((now - startedAt) / 1000) * (TAU / 240));
    let hx = Infinity, hy = Infinity;
    if (hover) {
      const dx = hover.x - c, dy = hover.y - c;
      hx = dx * Math.cos(-rotation) - dy * Math.sin(-rotation);
      hy = dx * Math.sin(-rotation) + dy * Math.cos(-rotation);
    }
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, windowR, 0, TAU);
    ctx.clip();
    ctx.translate(c, c);
    ctx.rotate(rotation);
    ctx.lineWidth = 1;
    const n = Math.ceil(windowR / r) + 2;
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        if ((i + j) & 1) continue;
        const x = i * r, y = j * r;
        const fromCentre = Math.hypot(x, y);
        if (fromCentre > windowR + r) continue;
        const glow = Math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * (1.5 * r) ** 2));
        ctx.globalAlpha = 0.34 + 0.6 * glow - 0.18 * (fromCentre / windowR);
        ctx.strokeStyle = glow > 0.3 ? gold : goldDim;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.stroke();
      }
    }
    ctx.restore();
    ctx.strokeStyle = goldDim;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(c, c, windowR, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.arc(c, c, windowR + 7, 0, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  canvas.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const rect = canvas.getBoundingClientRect();
    hover = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (reduced.matches) draw(performance.now());
  });
  canvas.addEventListener('pointerleave', () => {
    hover = null;
    if (reduced.matches) draw(performance.now());
  });
  animate(canvas, draw);
}

/** 青海波。光の輪がゆっくり通り過ぎ、クリックした位置からも波紋が広がる */
export function mountSeigaiha(canvas: HTMLCanvasElement, clickArea: HTMLElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = reducedMotionQuery();
  const background = cssVarColor('--background', '#0e1b11').css;
  const gold = cssVarColor('--gold', '#d0a900').css;
  const goldDim = cssVarColor('--gold-dim', '#987d00').css;
  const speed = 110;
  const lead = 160;
  let wave: { x: number | null; y: number | null; startedAt: number } = { x: null, y: null, startedAt: performance.now() };

  const draw = (now: number) => {
    fitCanvas(canvas);
    const ratio = pixelRatio();
    const W = canvas.width / ratio, H = canvas.height / ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, W, H);
    const R = W < 640 ? 24 : 34;
    const ox = wave.x ?? W * 0.84, oy = wave.y ?? H * 0.55;
    const span = Math.hypot(W, H) + 360;
    const travelled = ((now - wave.startedAt) / 1000) * speed;
    const front = reduced.matches ? -1e5 : (wave.x === null ? travelled % span : travelled) - lead;
    ctx.lineWidth = 1;
    // 上の段から順に、背景色で塗った円を重ねて下の段が上の段を隠すようにする
    for (let row = -1; row * R * 0.5 <= H + R; row++) {
      const y = row * R * 0.5;
      const shift = row & 1 ? R : 0;
      for (let x = -2 * R + shift; x <= W + 2 * R; x += 2 * R) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = background;
        ctx.beginPath();
        ctx.arc(x, y, R, 0, TAU);
        ctx.fill();
        const glow = Math.exp(-((Math.hypot(x - ox, y - oy) - front) ** 2) / (2 * 70 * 70));
        ctx.globalAlpha = 0.24 + 0.6 * glow;
        ctx.strokeStyle = glow > 0.35 ? gold : goldDim;
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          const rr = R * (1 - k * 0.22);
          ctx.moveTo(x + rr, y);
          ctx.arc(x, y, rr, 0, TAU);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    if (wave.x !== null && travelled - lead > span) wave = { x: null, y: null, startedAt: now };
  };

  clickArea.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    const rect = canvas.getBoundingClientRect();
    wave = { x: event.clientX - rect.left, y: event.clientY - rect.top, startedAt: performance.now() - (lead / speed) * 1000 };
  });
  animate(clickArea, draw);
}
