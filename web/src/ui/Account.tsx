import { useEffect, useState } from 'react';
import { login, loginWithCode, logout, protect, requestCode, useSync, type AccountResult } from '../api/sync';
import { navigate } from '../router';
import { useStore } from '../state/store';
import { Link, TopBar } from './parts';

/**
 * Optional account. Playing never needs it (the case says «без регистрации»). Two ways to continue on another device:
 *  - a one-time 6-digit code from the old device (no password at all);
 *  - a password, if the player chose to set one.
 */

const MESSAGES: Record<Exclude<AccountResult, 'ok'>, string> = {
  bad: 'Неверный ник или пароль.',
  taken: 'Этот ник уже защищён паролем другого игрока. Смени ник на старте или войди в свой аккаунт.',
  limited: 'Слишком много попыток. Подожди минуту.',
  offline: 'Сервер сейчас недоступен. Попробуй позже, а играть можно и так.',
};

function Field({ id, label, big = false, ...rest }: { id: string; label: string; big?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="pn-field">
      <label htmlFor={id} className="pn-label pn-label--text">
        {label}
      </label>
      <input id={id} className="pn-input" style={{ fontSize: big ? 40 : 28, letterSpacing: big ? '0.2em' : undefined }} {...rest} />
    </div>
  );
}

function ErrorLine({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <p className="pn-error" role="alert">
      {text}
    </p>
  );
}

const fmtCode = (c: string) => `${c.slice(0, 3)} ${c.slice(3)}`;
const mmss = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/** On the old device: shows a one-time code and a link for the new device. */
function TransferCard({ nickname }: { nickname: string }) {
  const online = useSync((s) => s.status === 'online');
  const [code, setCode] = useState<{ code: string; expiresAt: number } | null>(null);
  const [left, setLeft] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!code) return;
    const tick = () => setLeft(code.expiresAt - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [code]);

  async function get() {
    setError(null);
    setCopied(false);
    const r = await requestCode();
    if (r === 'offline') return setError(MESSAGES.offline);
    setCode({ code: r.code, expiresAt: Date.parse(r.expiresAt) });
  }

  const expired = !!code && left <= 0;
  const link = code ? `${location.origin}/account?nick=${encodeURIComponent(nickname)}&code=${code.code}` : '';

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }} data-testid="transfer">
      <p className="pn-label pn-label--acc">Без пароля</p>
      <h2 className="pn-h2">Войти на другом устройстве</h2>
      <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
        Получи код и введи его на другом компьютере или телефоне вместе с ником «{nickname}». Код работает один раз и 10 минут.
      </p>
      {code && !expired ? (
        <div className="pn-board" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <span className="pn-label pn-label--text">Код для входа</span>
            <span className="pn-label" aria-live="off">
              ещё {mmss(left)}
            </span>
          </div>
          <p data-testid="transfer-code" style={{ margin: 0, font: '800 72px/1 var(--pn-font-mono)', letterSpacing: '0.12em', color: 'var(--accent)' }}>
            {fmtCode(code.code)}
          </p>
          <p className="pn-hint">
            На другом устройстве: ПрофНавигатор → «Войти» → ник <b style={{ color: 'var(--pn-text)' }}>{nickname}</b> и этот код. Или открой там ссылку:
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <code style={{ font: '400 13px/1.4 var(--pn-font-mono)', color: 'var(--pn-text-2)', wordBreak: 'break-all', flex: '1 1 260px' }}>{link}</code>
            <button
              type="button"
              className="pn-btn pn-btn--ghost pn-btn--sm"
              onClick={() =>
                navigator.clipboard?.writeText(link).then(
                  () => setCopied(true),
                  () => setCopied(false),
                )
              }
            >
              {copied ? 'Скопировано' : 'Скопировать ссылку'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {expired && <p className="pn-hint" style={{ marginBottom: 12 }}>Код истёк. Получи новый.</p>}
          <button className="pn-btn pn-btn--accent pn-btn--lg" type="button" onClick={get} disabled={!online}>
            Получить код
          </button>
        </div>
      )}
      <ErrorLine text={error ?? (online ? null : MESSAGES.offline)} />
    </section>
  );
}

function LoginForm({ initialNick, initialCode }: { initialNick: string | null; initialCode: string | null }) {
  const [mode, setMode] = useState<'code' | 'password'>('code');
  const [nickname, setNickname] = useState(initialNick ?? '');
  const [secret, setSecret] = useState(initialCode ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = mode === 'code' ? await loginWithCode(nickname, secret) : await login(nickname, secret);
    setBusy(false);
    if (r === 'ok') navigate('/games');
    else setError(r === 'bad' ? (mode === 'code' ? 'Неверный ник или код. Попроси новый код на старом устройстве.' : MESSAGES.bad) : MESSAGES[r]);
  }

  const switchTo = (m: 'code' | 'password') => {
    setMode(m);
    setSecret('');
    setError(null);
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }} data-testid="login-form">
      <div className="pn-actions" role="group" aria-label="Способ входа">
        <button type="button" className={`pn-btn pn-btn--sm ${mode === 'code' ? 'pn-btn--green' : 'pn-btn--ghost'}`} aria-pressed={mode === 'code'} onClick={() => switchTo('code')}>
          По коду
        </button>
        <button type="button" className={`pn-btn pn-btn--sm ${mode === 'password' ? 'pn-btn--green' : 'pn-btn--ghost'}`} aria-pressed={mode === 'password'} onClick={() => switchTo('password')}>
          По паролю
        </button>
      </div>
      <Field id="login-nick" label="Ник" autoComplete="username" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} required />
      {mode === 'code' ? (
        <Field
          id="login-code"
          label="Код с другого устройства"
          big
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000 000"
          value={secret}
          onChange={(e) => setSecret(e.target.value.replace(/[^\d ]/g, '').slice(0, 7))}
          required
        />
      ) : (
        <Field id="login-pass" label="Пароль" type="password" autoComplete="current-password" value={secret} onChange={(e) => setSecret(e.target.value)} maxLength={64} required />
      )}
      <ErrorLine text={error} />
      <div>
        <button className="pn-btn pn-btn--accent pn-btn--lg" type="submit" disabled={busy || !nickname.trim() || !secret.trim()}>
          Войти
        </button>
      </div>
    </form>
  );
}

function ProtectForm() {
  const online = useSync((s) => s.status === 'online');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if ([...password].length < 6) return setError('Пароль: хотя бы 6 символов.');
    if (password !== repeat) return setError('Пароли не совпадают.');
    setBusy(true);
    setError(null);
    const r = await protect(password);
    setBusy(false);
    if (r !== 'ok') setError(r === 'bad' ? 'Пароль: от 6 до 64 символов.' : MESSAGES[r]);
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }} data-testid="protect-form">
      <Field id="new-pass" label="Пароль" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={64} />
      <Field id="new-pass-2" label="Ещё раз" type="password" autoComplete="new-password" value={repeat} onChange={(e) => setRepeat(e.target.value)} maxLength={64} />
      <ErrorLine text={error ?? (online ? null : MESSAGES.offline)} />
      <div>
        <button className="pn-btn pn-btn--ghost pn-btn--lg" type="submit" disabled={busy || !online || !password}>
          Защитить паролем
        </button>
      </div>
    </form>
  );
}

const divider = { paddingTop: 40, borderTop: '1px solid var(--pn-line)' } as const;

export function Account({ nick, code }: { nick: string | null; code: string | null }) {
  const player = useStore((s) => s.player);
  // Arriving by a link with a code: show the login form first, even if this device has another player.
  const viaLink = !!code;

  const loginSection = (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 18, ...(player && !viaLink ? divider : {}) }}>
      <p className="pn-label pn-label--acc">{player && !viaLink ? 'Уже играл на другом устройстве?' : 'Аккаунт'}</p>
      {player && !viaLink ? <h2 className="pn-h2">Войти</h2> : <h1 className="pn-h1">Войти</h1>}
      <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
        {player
          ? 'Прогресс из аккаунта добавится к тому, что уже есть на этом устройстве.'
          : 'Возьми код на устройстве, где ты уже играл: «Аккаунт» → «Войти на другом устройстве». Без аккаунта тоже можно: '}
        {!player && <Link to="/start">начать с ником</Link>}
      </p>
      <LoginForm initialNick={nick} initialCode={code} />
    </section>
  );

  return (
    <div className="pn-screen" style={{ position: 'relative' }}>
      <div className="pn-grid-bg" aria-hidden="true" />
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="pn-start" style={{ gap: 64 }}>
          {viaLink && loginSection}
          {player && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: 18, ...(viaLink ? divider : {}) }} data-testid={player.hasPassword ? 'account-on' : 'account-guest'}>
              <p className="pn-label pn-label--acc">Аккаунт</p>
              {viaLink ? <h2 className="pn-h2">{player.nickname}</h2> : <h1 className="pn-h1">{player.nickname}</h1>}
              <p className="pn-hint" style={{ fontSize: 18, maxWidth: '52ch' }}>
                {player.hasPassword
                  ? 'Ник защищён паролем. Войти можно с любого устройства по паролю или по коду.'
                  : 'Прогресс сохраняется на сервере. Здесь, в этом браузере, ты войдёшь автоматически.'}
              </p>
              <div className="pn-actions" style={{ marginTop: 8 }}>
                <Link to="/games" className="pn-btn pn-btn--accent pn-btn--lg">
                  К играм <span className="pn-arrow" aria-hidden="true">→</span>
                </Link>
                <button
                  className="pn-btn pn-btn--ghost pn-btn--lg"
                  type="button"
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                >
                  Выйти
                </button>
              </div>
              <p className="pn-hint">После выхода прогресс на этом устройстве сотрётся. На сервере он останется.</p>
            </section>
          )}
          {player && (
            <div style={divider}>
              <TransferCard nickname={player.nickname} />
            </div>
          )}
          {player && !player.hasPassword && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: 18, ...divider }}>
              <p className="pn-label pn-label--acc">Необязательно</p>
              <h2 className="pn-h2">Пароль</h2>
              <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
                С паролем ник «{player.nickname}» откроется на любом устройстве, даже если старое устройство недоступно.
              </p>
              <ProtectForm />
            </section>
          )}
          {!viaLink && loginSection}
        </div>
      </main>
    </div>
  );
}
