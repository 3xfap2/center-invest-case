import { useState } from 'react';
import { connect } from '../api/sync';
import type { Difficulty } from '../bridge/messages';
import { gameById } from '../games/catalog';
import { navigate } from '../router';
import { isNickname } from '../state/logic';
import { useStore } from '../state/store';
import { DIFFICULTY, TopBar, btnPrimary } from './parts';

export function Start({ game }: { game: string | null }) {
  const player = useStore((s) => s.player);
  const setPlayer = useStore((s) => s.setPlayer);
  const [nickname, setNickname] = useState(player?.nickname ?? '');
  const [difficulty, setDifficulty] = useState<Difficulty>(player?.difficulty ?? 'normal');
  const [touched, setTouched] = useState(false);
  const valid = isNickname(nickname.trim());
  const target = game && gameById(game)?.available ? `/play/${game}` : '/games';

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setPlayer(nickname, difficulty);
    void connect();
    navigate(target);
  }

  return (
    <div className="screen-in min-h-dvh">
      <TopBar />
      <form onSubmit={submit} className="mx-auto max-w-3xl px-5 pb-20 pt-8 md:px-12 md:pt-16" noValidate>
        <p className="font-mono text-label uppercase tracking-[0.18em] text-ci-green">Шаг 1 из 2</p>
        <label htmlFor="nick" className="mt-4 block font-display text-h1 font-bold uppercase">
          Как тебя зовут в&nbsp;игре?
        </label>
        <input
          id="nick"
          name="nickname"
          autoComplete="off"
          autoFocus
          maxLength={20}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={touched && !valid}
          aria-describedby="nick-hint"
          placeholder="например, Аня_15"
          className="mt-6 w-full border-0 border-b-2 border-line-strong bg-transparent py-3 font-display text-h2 text-text outline-none placeholder:text-line-strong focus:border-ci-green"
        />
        <p id="nick-hint" className={`mt-3 text-small ${touched && !valid ? 'text-threat' : 'text-muted'}`}>
          От 2 до 20 символов: буквы, цифры, пробел, «_» и «-». Настоящее имя не нужно.
        </p>

        <fieldset className="mt-14">
          <legend className="font-mono text-label uppercase tracking-[0.18em] text-ci-green">Шаг 2 из 2 · сложность</legend>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {(Object.keys(DIFFICULTY) as Difficulty[]).map((d) => (
              <label
                key={d}
                className={`cursor-pointer rounded-md border p-4 transition-colors ${
                  difficulty === d ? 'border-ci-green bg-surface' : 'border-line hover:border-line-strong'
                }`}
              >
                <input type="radio" name="difficulty" value={d} checked={difficulty === d} onChange={() => setDifficulty(d)} className="sr-only" />
                <span className="block font-display text-h3 font-semibold uppercase">{DIFFICULTY[d].label}</span>
                <span className="mt-1 block text-small text-text-2">{DIFFICULTY[d].note}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className={`${btnPrimary} mt-12`}>
          Дальше
        </button>
      </form>
    </div>
  );
}
