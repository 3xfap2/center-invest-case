import { useEffect, useRef, useState, type RefObject } from 'react';
import { flushRuns, queueSave } from '../api/sync';
import { gameById } from '../games/catalog';
import type { Run } from '../state/logic';
import { useStore } from '../state/store';
import { parseGameMessage, type SiteMessage } from './messages';

/**
 * The site side of the bridge (docs/GAME_CONTRACT.md §3).
 * Only messages from our own origin, from this iframe, with ns: 1 and a valid payload are used.
 */

export type HostState = 'loading' | 'running' | 'stalled';
const READY_TIMEOUT_MS = 15_000;

export function postToGame(frame: HTMLIFrameElement | null, msg: SiteMessage) {
  frame?.contentWindow?.postMessage({ ns: 1, ...msg }, location.origin);
}

export function useGameHost(
  gameId: string,
  frameRef: RefObject<HTMLIFrameElement | null>,
  on: { end: (run: Run) => void; exit: () => void; achievement: (id: string) => void },
) {
  const [state, setState] = useState<HostState>('loading');
  const [percent, setPercent] = useState<number | null>(() => useStore.getState().games[gameId]?.progress?.percent ?? null);
  const handlers = useRef(on);
  handlers.current = on;

  useEffect(() => {
    const prefix = gameById(gameId)?.achievementPrefix ?? '';
    const earned: string[] = [];
    let ready = false;
    const stall = setTimeout(() => !ready && setState('stalled'), READY_TIMEOUT_MS);

    function onMessage(e: MessageEvent) {
      if (e.origin !== location.origin) return;
      if (!frameRef.current || e.source !== frameRef.current.contentWindow) return;
      const msg = parseGameMessage(e.data);
      if (!msg) return;
      const s = useStore.getState();

      switch (msg.type) {
        case 'ready': {
          if (msg.gameId !== gameId || !s.player) return;
          ready = true;
          setState('running');
          // Sent again if the game reloads inside the iframe.
          postToGame(frameRef.current, {
            type: 'init',
            playerId: s.player.id,
            nickname: s.player.nickname,
            difficulty: s.player.difficulty,
            save: s.games[gameId]?.data ?? null,
            flags: s.flags,
            muted: s.muted,
          });
          frameRef.current.focus();
          break;
        }
        case 'save':
          s.applySave(gameId, msg.data);
          queueSave(gameId);
          break;
        case 'flag':
          s.setFlag(msg.key, msg.value);
          queueSave(gameId);
          break;
        case 'progress':
          s.setProgress(gameId, { step: msg.step, percent: msg.percent });
          setPercent(msg.percent);
          break;
        case 'achievement':
          // Each game owns its prefix (gl_, ci_), so one game can't grant another's achievements.
          if (prefix && !msg.id.startsWith(prefix)) return;
          if (s.addAchievement(gameId, msg.id)) {
            earned.push(msg.id);
            handlers.current.achievement(msg.id);
          }
          break;
        case 'end': {
          const { ending, stars, score, durationSec, choices } = msg;
          const run = s.finishRun(gameId, { ending, stars, score, durationSec, choices }, [...earned]);
          void flushRuns();
          handlers.current.end(run);
          break;
        }
        case 'exit':
          handlers.current.exit();
          break;
      }
    }

    const onVisibility = () => postToGame(frameRef.current, { type: document.hidden ? 'pause' : 'resume' });

    window.addEventListener('message', onMessage);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearTimeout(stall);
      window.removeEventListener('message', onMessage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [gameId, frameRef]);

  return { state, percent };
}
