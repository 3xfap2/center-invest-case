import type { ReactNode } from 'react';
import { useSync } from '../api/sync';
import type { Difficulty } from '../bridge/messages';
import type { Game } from '../games/catalog';
import { navigate } from '../router';
import { useStore } from '../state/store';

export const DIFFICULTY: Record<Difficulty, { label: string; note: string; level: number }> = {
  easy: { label: 'Лёгкий', note: 'больше времени и подсказки', level: 1 },
  normal: { label: 'Обычный', note: 'как задумано авторами', level: 2 },
  hard: { label: 'Сложный', note: 'меньше времени, без подсказок', level: 3 },
};

/** An <a> that routes inside the site without a page reload. */
export function Link({ to, className, children, ...rest }: { to: string; className?: string; children: ReactNode; 'data-testid'?: string; 'aria-label'?: string }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Logo() {
  return (
    <Link to="/" className="pn-logo">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="12.5" fill="none" stroke="#5ED27A" strokeWidth="2" />
        <polygon points="14,4 18.5,14 14,24 9.5,14" fill="#5ED27A" />
        <polygon points="9.5,14 18.5,14 14,24" fill="#1F4A2C" />
      </svg>
      ПрофНавигатор
    </Link>
  );
}

export function PlayerChip() {
  const player = useStore((s) => s.player);
  if (!player) return null;
  const diff = DIFFICULTY[player.difficulty].label.toLowerCase();
  return (
    <Link to="/start" className="pn-chip" data-testid="player-chip" aria-label={`Игрок ${player.nickname}, сложность ${diff}. Сменить ник или сложность`}>
      <span className="pn-chip-ava" aria-hidden="true">
        {player.nickname.trim()[0]?.toUpperCase()}
      </span>
      <span>
        {player.nickname} <span className="pn-chip-sub">· {diff}</span>
      </span>
    </Link>
  );
}

export function TopBar({ right }: { right?: ReactNode }) {
  return (
    <header className="pn-topbar pn-wrap" style={{ position: 'relative', zIndex: 3 }}>
      <Logo />
      {right ?? <AccountNav />}
    </header>
  );
}

/** Top-right corner: the optional account link and the player chip. */
function AccountNav() {
  const player = useStore((s) => s.player);
  return (
    <nav className="pn-nav" aria-label="Игрок">
      <Link to="/account" className="pn-nav-link" data-testid="account-link">
        {player?.hasPassword ? 'Аккаунт' : player ? 'Сохранить прогресс' : 'Войти'}
      </Link>
      <PlayerChip />
    </nav>
  );
}

export const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
  </svg>
);

/** Each game's title has its own typographic signature. */
export function GameTitle({ game, sub = true, subSize }: { game: Game; sub?: boolean; subSize?: string }) {
  switch (game.id) {
    case 'chuzhoe-imya':
      return (
        <>
          Чужое <span className="pn-strike">имя</span>
        </>
      );
    case 'glitch':
      return (
        <>
          <span className="pn-glitch" data-text="ГЛИТЧ">
            ГЛИТЧ
          </span>
          {sub && (
            <span className="pn-hero-sub" style={subSize ? { fontSize: subSize } : undefined}>
              Последняя сборка
            </span>
          )}
        </>
      );
    case 'kompas':
      return (
        <>
          <span className="sr-only">Компас</span>
          <span aria-hidden="true">
            К
            <svg className="pn-compass-o" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#EEF3EC" strokeWidth="9" />
              <polygon points="32,10 40,32 32,54 24,32" fill="#8CCBFF" />
              <polygon points="24,32 40,32 32,54" fill="#3E6C8F" />
            </svg>
            мпас
          </span>
        </>
      );
    case 'dym':
      return <span className="pn-smoke">Дым</span>;
    default:
      return <>{game.title}</>;
  }
}

export function SaveStatus() {
  const { status, lastSaved } = useSync();
  if (!lastSaved) return null;
  const server = status === 'online' && lastSaved === 'server';
  return (
    <span role="status" data-testid="save-status" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 12px', fontSize: 14, color: 'var(--pn-text-2)' }}>
      <span className={`pn-dot ${server ? '' : 'pn-dot--warn'}`} aria-hidden="true" />
      {server ? 'Сохранено' : 'Сохранено на этом устройстве'}
    </span>
  );
}

export function Notice() {
  const notice = useStore((s) => s.notice);
  const dismiss = useStore((s) => s.dismissNotice);
  if (!notice) return null;
  return (
    <div className="pn-notice" role="status">
      <span>{notice}</span>
      <button className="pn-btn pn-btn--sm" type="button" onClick={dismiss}>
        понятно
      </button>
    </div>
  );
}

const STAR = 'M26 4l6.6 13.9 15.2 1.9-11.2 10.4 2.9 15.1L26 37.9l-13.5 7.4 2.9-15.1L4.2 19.8l15.2-1.9z';

export function Stars({ n }: { n: number }) {
  const word = n === 1 ? 'звезда' : n === 0 ? 'звёзд' : 'звезды';
  return (
    <div className="pn-stars" role="img" aria-label={`${n} ${word} из 3`}>
      {[1, 2, 3].map((i) => (
        <svg key={i} className={`pn-star pn-star--${i}`} viewBox="0 0 52 52" aria-hidden="true">
          <path d={STAR} strokeWidth="2" strokeLinejoin="round" fill={i <= n ? 'var(--accent)' : 'none'} stroke={i <= n ? 'var(--accent)' : '#3D5545'} />
        </svg>
      ))}
    </div>
  );
}

export const EmptyStar = () => (
  <svg width="96" height="96" viewBox="0 0 52 52" aria-hidden="true">
    <path d={STAR} fill="none" stroke="#3D5545" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const Badge = ({ color = 'var(--accent)' }: { color?: string }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
    <polygon points="22,3 38.5,12.5 38.5,31.5 22,41 5.5,31.5 5.5,12.5" strokeWidth="2" fill="#15201A" stroke={color} />
    <path d="M22 12.5l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L22 26.9l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill={color} />
  </svg>
);

export const fmtTime = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, '0')}`;
export const fmtNum = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
