import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { sameNickname, startAs, useSync } from '../api/sync';
import type { Difficulty } from '../bridge/messages';
import { gameById } from '../games/catalog';
import { navigate } from '../router';
import { isNickname } from '../state/logic';
import { useStore } from '../state/store';
import { KeyCard } from './KeyCard';
import { DIFFICULTY, Link, Logo } from './parts';

/** The first character the server would refuse, or null. Same rule as NICKNAME in logic.ts. */
const badChar = (s: string) => [...s].find((c) => !/[\p{L}\p{N} _-]/u.test(c)) ?? null;

function nicknameError(nick: string): string | null {
  const bad = badChar(nick);
  if (bad) return `Такой символ нельзя: «${bad}». Можно буквы, цифры, пробел, «_» и «-».`;
  if (nick.trim().length < 2) return 'Слишком коротко: нужно хотя бы 2 символа.';
  if (!isNickname(nick.trim())) return 'От 2 до 20 символов: буквы, цифры, пробел, «_» и «-».';
  return null;
}

type Check = 'idle' | 'checking' | 'free' | 'taken' | 'mine';
const CHECK_DELAY_MS = 350;

/** Asks the server whether the nickname is free, a moment after the player stops typing. */
function useNicknameCheck(nickname: string, localError: string | null): [Check, (c: Check) => void] {
  const player = useStore((s) => s.player);
  const online = useSync((s) => s.status === 'online');
  const [check, setCheck] = useState<Check>('idle');
  const nick = nickname.trim();
  const mine = !!player?.token && sameNickname(player.nickname, nick);

  useEffect(() => {
    if (localError || !nick) return setCheck('idle');
    if (mine) return setCheck('mine');
    if (!online) return setCheck('idle');
    setCheck('checking');
    let live = true;
    const t = setTimeout(() => {
      api
        .checkNickname(nick)
        .then((r) => live && setCheck(!r.valid ? 'idle' : r.available ? 'free' : 'taken'))
        .catch(() => live && setCheck('idle'));
    }, CHECK_DELAY_MS);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [nick, localError, mine, online]);

  return [check, setCheck];
}

function CheckLine({ check }: { check: Check }) {
  if (check === 'idle') return null;
  const color = check === 'taken' ? 'var(--pn-danger)' : check === 'checking' ? 'var(--pn-text-3)' : 'var(--pn-green)';
  return (
    <p aria-live="polite" data-testid="nick-check" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, color, fontSize: 15, fontWeight: 500 }}>
      {check !== 'checking' && <span className={`pn-dot ${check === 'taken' ? '' : 'pn-live'}`} style={check === 'taken' ? { background: 'var(--pn-danger)' } : undefined} />}
      {check === 'checking' && 'Проверяем ник…'}
      {check === 'free' && 'Ник свободен'}
      {check === 'mine' && 'Это твой ник: продолжишь с того же места'}
      {check === 'taken' && (
        <span>
          Этот ник уже занят. Придумай другой или <Link to="/account">войди в аккаунт</Link>, если это ты.
        </span>
      )}
    </p>
  );
}

export function Start({ game }: { game: string | null }) {
  const player = useStore((s) => s.player);
  const [nickname, setNickname] = useState(player?.nickname ?? '');
  const [difficulty, setDifficulty] = useState<Difficulty>(player?.difficulty ?? 'normal');
  const [touched, setTouched] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState<string | null>(null);
  const localError = nicknameError(nickname);
  const [check, setCheck] = useNicknameCheck(nickname, localError);
  const error = localError ?? serverError;
  const showError = touched && !!error;
  const target = game && gameById(game)?.available ? `/play/${game}` : '/games';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (localError || check === 'taken' || busy) return;
    setBusy(true);
    const r = await startAs(nickname, difficulty);
    setBusy(false);
    if (r === 'ok') return navigate(target);
    if (r === 'new') return setRevealed(useStore.getState().player?.key ?? null);
    if (r === 'taken') setCheck('taken');
    else setServerError('Сервер не принял этот ник. Попробуй другой.');
  }

  return (
    <div className="pn-screen">
      <header className="pn-topbar pn-wrap" style={{ position: 'relative', zIndex: 3 }}>
        <Logo />
        <Link to="/" className="pn-btn pn-btn--ghost pn-btn--sm">
          <span aria-hidden="true">←</span> К фильмотеке
        </Link>
      </header>
      <div className="pn-wrap" style={{ position: 'relative', zIndex: 2 }}>
        {revealed ? (
          <section className="pn-start pn-screen" style={{ gap: 28 }} data-testid="key-reveal">
            <p className="pn-label pn-label--acc">Ник «{nickname.trim()}» теперь твой</p>
            <h1 className="pn-h1">Запиши ключ входа</h1>
            <p className="pn-hint" style={{ fontSize: 18, maxWidth: '56ch' }}>
              С этим ключом ты войдёшь на любом другом компьютере или телефоне и продолжишь с того же места. Здесь, в этом браузере, ключ не нужен: ты входишь сам. Ключ всегда можно посмотреть в «Аккаунт».
            </p>
            <KeyCard value={revealed} />
            <div>
              <button type="button" className="pn-btn pn-btn--accent pn-btn--lg" onClick={() => navigate(target)} autoFocus>
                Я записал, играть <span className="pn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        ) : (
        <form className="pn-start" onSubmit={submit} noValidate>
          <section className={`pn-field ${showError ? 'is-error' : ''}`}>
            <p className="pn-label pn-label--acc">Шаг 1 из 2</p>
            <h1 className="pn-h1" style={{ marginBottom: 18 }}>
              <label htmlFor="nick">Как тебя зовут в игре?</label>
            </h1>
            <input
              id="nick"
              name="nickname"
              className="pn-input"
              type="text"
              placeholder="например, Аня_15"
              maxLength={20}
              autoComplete="off"
              spellCheck={false}
              autoFocus
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setServerError(null);
              }}
              onBlur={() => nickname.length && setTouched(true)}
              aria-invalid={showError}
              aria-describedby={showError ? 'nick-hint nick-err' : 'nick-hint'}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
              <p id="nick-hint" className="pn-hint">
                От 2 до 20 символов: буквы, цифры, пробел, «_» и «-». Настоящее имя не нужно.
              </p>
              <span className="pn-label" aria-hidden="true" style={{ flex: 'none', paddingTop: 3 }}>
                {nickname.length} / 20
              </span>
            </div>
            {!showError && <CheckLine check={check} />}
            {showError && (
              <p id="nick-err" className="pn-error" role="alert">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flex: 'none', marginTop: 2 }}>
                  <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 4.8v5.2M9 12.4v.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {error}
              </p>
            )}
          </section>

          <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
            <legend className="pn-label pn-label--acc" style={{ padding: 0, marginBottom: 20 }}>
              Шаг 2 из 2 · сложность
            </legend>
            <div className="pn-diff-grid">
              {(Object.keys(DIFFICULTY) as Difficulty[]).map((d) => (
                <label key={d} className={`pn-diff ${difficulty === d ? 'is-selected' : ''}`}>
                  <input type="radio" name="difficulty" value={d} checked={difficulty === d} onChange={() => setDifficulty(d)} />
                  <span className="pn-diff-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="pn-diff-title">{DIFFICULTY[d].label}</span>
                  <span className="pn-diff-text">{DIFFICULTY[d].note}</span>
                  <span className="pn-meter" aria-hidden="true">
                    {[1, 2, 3].map((i) => (
                      <i key={i} className={i <= DIFFICULTY[d].level ? 'on' : ''} />
                    ))}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px 24px', flexWrap: 'wrap', paddingTop: 28, borderTop: '1px solid var(--pn-line)' }}>
            <p className="pn-hint">
              Ник и сложность можно сменить перед любой игрой.
              <br />
              Уже играл на другом устройстве? <Link to="/account">Войти</Link>
            </p>
            <button type="submit" className="pn-btn pn-btn--accent pn-btn--lg pn-btn--block-sm" disabled={busy || check === 'taken'}>
              Дальше <span className="pn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
