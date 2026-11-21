import { useState } from 'react';
import { connect } from '../api/sync';
import type { Difficulty } from '../bridge/messages';
import { gameById } from '../games/catalog';
import { navigate } from '../router';
import { isNickname } from '../state/logic';
import { useStore } from '../state/store';
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

export function Start({ game }: { game: string | null }) {
  const player = useStore((s) => s.player);
  const setPlayer = useStore((s) => s.setPlayer);
  const [nickname, setNickname] = useState(player?.nickname ?? '');
  const [difficulty, setDifficulty] = useState<Difficulty>(player?.difficulty ?? 'normal');
  const [touched, setTouched] = useState(false);
  const error = nicknameError(nickname);
  const showError = touched && !!error;
  const target = game && gameById(game)?.available ? `/play/${game}` : '/games';

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (error) return;
    setPlayer(nickname, difficulty);
    void connect();
    navigate(target);
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
              onChange={(e) => setNickname(e.target.value)}
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
            <p className="pn-hint">Ник и сложность можно сменить перед любой игрой.</p>
            <button type="submit" className="pn-btn pn-btn--accent pn-btn--lg pn-btn--block-sm">
              Дальше <span className="pn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
