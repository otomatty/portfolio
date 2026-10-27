/**
 * メールアドレスのコピーボタン。root の中の `[data-email]` を `[data-copy-email]` のボタンでコピーする。
 * クリップボードが使えないときは、文字を選択状態にして手でコピーできるようにする。
 * ボタンの `data-label-copied` / `data-label-selected` を、結果に合わせて一時的に表示する。
 */
export function initCopyEmail(root: ParentNode): void {
  const button = root.querySelector<HTMLButtonElement>('[data-copy-email]');
  const email = root.querySelector<HTMLElement>('[data-email]');
  if (!button || !email) return;
  const label = button.textContent ?? '';
  const select = () => {
    const range = document.createRange();
    range.selectNodeContents(email);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    button.textContent = button.dataset.labelSelected ?? label;
  };
  button.addEventListener('click', () => {
    if (!navigator.clipboard) return select();
    navigator.clipboard.writeText(email.textContent?.trim() ?? '').then(() => {
      button.textContent = button.dataset.labelCopied ?? label;
      window.setTimeout(() => (button.textContent = label), 1800);
    }, select);
  });
}
