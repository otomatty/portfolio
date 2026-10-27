/**
 * スクロールに合わせたパララックス。
 * - `data-parallax="0.12"`: 親要素の中心が画面の中心からずれた量に係数を掛けて縦に動かす。
 *   正の値はページより遅れて（奥に）、負の値は先に（手前に）動く。
 * - `data-parallax-fade`: Hero の文字。スクロールに合わせて少し速く上へ流れ、薄くなる。
 * prefers-reduced-motion では動かさない。変形には transform だけを使う。
 */
export function initParallax(root: ParentNode = document): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'));
  const fades = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax-fade]'));
  let queued = false;

  const update = () => {
    queued = false;
    if (reduced.matches) {
      [...layers, ...fades].forEach((el) => {
        el.style.transform = '';
        el.style.opacity = '';
      });
      return;
    }
    const viewport = window.innerHeight;
    for (const el of layers) {
      const parent = el.parentElement;
      if (!parent || !el.getClientRects().length) continue;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > viewport + 300) continue;
      const factor = Number(el.dataset.parallax) || 0;
      const offset = -(rect.top + rect.height / 2 - viewport / 2) * factor;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    const scrolled = Math.min(Math.max(window.scrollY, 0), viewport);
    for (const el of fades) {
      el.style.transform = `translate3d(0, ${(-scrolled * 0.18).toFixed(1)}px, 0)`;
      el.style.opacity = String(1 - Math.min(1, scrolled / (viewport * 0.8)) * 0.75);
    }
  };
  const request = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  reduced.addEventListener('change', request);
  request();
}
