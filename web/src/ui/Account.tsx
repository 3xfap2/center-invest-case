import { useState } from 'react';
import { login, loginWithKey, logout, protect, replaceKey, useSync, type AccountResult } from '../api/sync';
import { navigate } from '../router';
import { useStore } from '../state/store';
import { KeyCard } from './KeyCard';
import { Link, TopBar } from './parts';

/**
 * Optional account. Playing never needs it (the case says «без регистрации»).
 * Another device: the secret login key the server made for the player (main way), or a password (optional).
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
      <input id={id} className="pn-input" style={{ fontSize: big ? 36 : 28, letterSpacing: big ? '0.08em' : undefined }} {...rest} />
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

function LoginForm() {
  const [mode, setMode] = useState<'key' | 'password'>('key');
  const [nickname, setNickname] = useState('');
  const [secret, setSecret] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = mode === 'key' ? await loginWithKey(secret) : await login(nickname, secret);
    setBusy(false);
    if (r === 'ok') navigate('/games');
    else setError(r === 'bad' ? (mode === 'key' ? 'Неверный ключ входа. Проверь, как он записан.' : MESSAGES.bad) : MESSAGES[r]);
  }

  const switchTo = (m: 'key' | 'password') => {
    setMode(m);
    setSecret('');
    setError(null);
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }} data-testid="login-form">
      <div className="pn-actions" role="group" aria-label="Способ входа">
        <button type="button" className={`pn-btn pn-btn--sm ${mode === 'key' ? 'pn-btn--green' : 'pn-btn--ghost'}`} aria-pressed={mode === 'key'} onClick={() => switchTo('key')}>
          По ключу
        </button>
        <button type="button" className={`pn-btn pn-btn--sm ${mode === 'password' ? 'pn-btn--green' : 'pn-btn--ghost'}`} aria-pressed={mode === 'password'} onClick={() => switchTo('password')}>
          По паролю
        </button>
      </div>
      {mode === 'key' ? (
        <Field
          id="login-key"
          label="Ключ входа"
          big
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="XXXX-XXXX-XXXX"
          value={secret}
          onChange={(e) => setSecret(e.target.value.slice(0, 20))}
          required
        />
      ) : (
        <>
          <Field id="login-nick" label="Ник" autoComplete="username" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} required />
          <Field id="login-pass" label="Пароль" type="password" autoComplete="current-password" value={secret} onChange={(e) => setSecret(e.target.value)} maxLength={64} required />
        </>
      )}
      <ErrorLine text={error} />
      <div>
        <button className="pn-btn pn-btn--accent pn-btn--lg" type="submit" disabled={busy || !secret.trim() || (mode === 'password' && !nickname.trim())}>
          Войти
        </button>
      </div>
    </form>
  );
}

/** The player's own key on this device, or a way to make one. */
function MyKey() {
  const key = useStore((s) => s.player?.key ?? null);
  const online = useSync((s) => s.status === 'online');
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function renew() {
    setError(null);
    const r = await replaceKey();
    setConfirm(false);
    if (r === 'offline') setError(MESSAGES.offline);
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }} data-testid="my-key">
      <h2 className="pn-h2">Войти на другом устройстве</h2>
      <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
        На другом компьютере или телефоне: «Войти» → ключ входа. Ник и пароль не нужны.
      </p>
      {key ? <KeyCard value={key} hidden /> : <p className="pn-empty-note">У тебя ещё нет ключа входа. Создай его и запиши.</p>}
      {key && !confirm && (
        <div>
          <button type="button" className="pn-btn pn-btn--ghost pn-btn--sm" onClick={() => setConfirm(true)} disabled={!online}>
            Потерял ключ? Сделать новый
          </button>
        </div>
      )}
      {(confirm || !key) && (
        <div className="pn-actions">
          {key && <span className="pn-hint">Старый ключ перестанет работать.</span>}
          <button type="button" className="pn-btn pn-btn--accent pn-btn--sm" onClick={renew} disabled={!online}>
            {key ? 'Да, новый ключ' : 'Создать ключ'}
          </button>
          {key && (
            <button type="button" className="pn-btn pn-btn--ghost pn-btn--sm" onClick={() => setConfirm(false)}>
              Отмена
            </button>
          )}
        </div>
      )}
      <ErrorLine text={error ?? (online ? null : MESSAGES.offline)} />
    </section>
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

export function Account() {
  const player = useStore((s) => s.player);

  return (
    <div className="pn-screen" style={{ position: 'relative' }}>
      <div className="pn-grid-bg" aria-hidden="true" />
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="pn-start" style={{ gap: 64 }}>
          {player && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }} data-testid={player.hasPassword ? 'account-on' : 'account-guest'}>
              <p className="pn-label pn-label--acc">Аккаунт</p>
              <h1 className="pn-h1">{player.nickname}</h1>
              <p className="pn-hint" style={{ fontSize: 18, maxWidth: '52ch' }}>
                Прогресс сохраняется на сервере. В этом браузере ты входишь автоматически.
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
              <p className="pn-hint">После выхода прогресс на этом устройстве сотрётся. На сервере он останется, вернуться можно по ключу входа.</p>
            </section>
          )}
          {player && (
            <div style={divider}>
              <MyKey />
            </div>
          )}
          {player && !player.hasPassword && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: 18, ...divider }}>
              <p className="pn-label pn-label--acc">Необязательно</p>
              <h2 className="pn-h2">Пароль</h2>
              <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
                Если удобнее пароль, чем ключ: с паролем войти можно по нику «{player.nickname}» и паролю.
              </p>
              <ProtectForm />
            </section>
          )}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 18, ...(player ? divider : {}) }}>
            <p className="pn-label pn-label--acc">{player ? 'Другой аккаунт?' : 'Аккаунт'}</p>
            {player ? <h2 className="pn-h2">Войти</h2> : <h1 className="pn-h1">Войти</h1>}
            <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
              {player ? 'Прогресс из аккаунта добавится к тому, что уже есть на этом устройстве.' : 'Введи ключ входа, который ты записал, когда выбирал ник. Без аккаунта тоже можно: '}
              {!player && <Link to="/start">начать с ником</Link>}
            </p>
            <LoginForm />
          </section>
        </div>
      </main>
    </div>
  );
}
