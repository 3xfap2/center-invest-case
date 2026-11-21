import { useState } from 'react';

/** The secret login key, big and easy to copy by hand: «K7MX-2QPA-9RTD». */
export function KeyCard({ value, hidden = false }: { value: string; hidden?: boolean }) {
  const [show, setShow] = useState(!hidden);
  const [copied, setCopied] = useState(false);
  return (
    <div className="pn-board" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span className="pn-label pn-label--text">Ключ входа</span>
      <p data-testid="login-key" style={{ margin: 0, font: '800 clamp(36px, 6vw, 60px)/1.1 var(--pn-font-mono)', letterSpacing: '0.08em', color: 'var(--accent)', wordBreak: 'break-all' }}>
        {show ? value : '••••-••••-••••'}
      </p>
      <div className="pn-actions">
        {hidden && (
          <button type="button" className="pn-btn pn-btn--ghost pn-btn--sm" onClick={() => setShow((s) => !s)} aria-pressed={show}>
            {show ? 'Скрыть' : 'Показать'}
          </button>
        )}
        <button
          type="button"
          className="pn-btn pn-btn--ghost pn-btn--sm"
          onClick={() =>
            navigator.clipboard?.writeText(value).then(
              () => setCopied(true),
              () => setCopied(false),
            )
          }
        >
          {copied ? 'Скопировано' : 'Скопировать'}
        </button>
      </div>
      <p className="pn-hint">Не показывай ключ другим: с ним можно войти в твою игру. Ник виден всем, ключ знаешь только ты.</p>
    </div>
  );
}
