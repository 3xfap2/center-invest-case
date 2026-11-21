import { useState } from 'react';
import { login, logout, protect, useSync, type AccountResult } from '../api/sync';
import { navigate } from '../router';
import { useStore } from '../state/store';
import { Link, TopBar } from './parts';

/**
 * Optional account. Playing never needs it (the case says «без регистрации»): a player can
 * protect their nickname with a password later, or log in to bring their progress to this device.
 */

const MESSAGES: Record<Exclude<AccountResult, 'ok'>, string> = {
  bad: 'Неверный ник или пароль.',
  taken: 'Этот ник уже защищён паролем другого игрока. Смени ник на старте или войди в свой аккаунт.',
  limited: 'Слишком много попыток. Подожди минуту.',
  offline: 'Сервер сейчас недоступен. Попробуй позже, а играть можно и так.',
};

const inputStyle = { fontSize: 28 } as const;

function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="pn-field">
      <label htmlFor={id} className="pn-label pn-label--text">
        {label}
      </label>
      <input id={id} className="pn-input" style={inputStyle} {...rest} />
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
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = await login(nickname, password);
    setBusy(false);
    if (r === 'ok') navigate('/games');
    else setError(MESSAGES[r]);
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }} data-testid="login-form">
      <Field id="login-nick" label="Ник" autoComplete="username" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} required />
      <Field id="login-pass" label="Пароль" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={64} required />
      <ErrorLine text={error} />
      <div>
        <button className="pn-btn pn-btn--accent pn-btn--lg" type="submit" disabled={busy || !nickname.trim() || !password}>
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
        <button className="pn-btn pn-btn--accent pn-btn--lg" type="submit" disabled={busy || !online || !password}>
          Защитить паролем
        </button>
      </div>
    </form>
  );
}

export function Account() {
  const player = useStore((s) => s.player);

  return (
    <div className="pn-screen" style={{ position: 'relative' }}>
      <div className="pn-grid-bg" aria-hidden="true" />
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="pn-start" style={{ gap: 64 }}>
          {player?.hasPassword ? (
            <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }} data-testid="account-on">
              <p className="pn-label pn-label--acc">Аккаунт</p>
              <h1 className="pn-h1">{player.nickname}</h1>
              <p className="pn-hint" style={{ fontSize: 18, maxWidth: '52ch' }}>
                Прогресс хранится на сервере. Войти можно с любого устройства: нужен только ник и пароль.
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
          ) : (
            <>
              {player && (
                <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <p className="pn-label pn-label--acc">Необязательно</p>
                  <h1 className="pn-h1">Сохрани прогресс навсегда</h1>
                  <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
                    Сейчас вернуться к прогрессу можно только из этого браузера. Придумай пароль, и ник «{player.nickname}» станет входом с любого устройства.
                  </p>
                  <ProtectForm />
                </section>
              )}
              <section style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: player ? 40 : 0, borderTop: player ? '1px solid var(--pn-line)' : undefined }}>
                <p className="pn-label pn-label--acc">{player ? 'Уже есть аккаунт?' : 'Аккаунт'}</p>
                {player ? (
                  <h2 className="pn-h2">Войти</h2>
                ) : (
                  <h1 className="pn-h1">Войти</h1>
                )}
                <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
                  {player ? 'Прогресс из аккаунта добавится к тому, что уже есть на этом устройстве.' : 'Если играл на другом устройстве и защитил ник паролем. Без аккаунта тоже можно: '}
                  {!player && <Link to="/start">начать с ником</Link>}
                </p>
                <LoginForm />
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
