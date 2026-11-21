import { useEffect, useState } from 'react';
import { api, type AchievementRow } from '../api/client';
import { useSync } from '../api/sync';
import { useStore } from '../state/store';
import { Badge } from './parts';

const plural = (n: number, one: string, few: string, many: string) => {
  const m10 = n % 10, m100 = n % 100;
  return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? few : many;
};

/** «Зал славы»: players ranked by achievements across all games, from the server. */
export function AchievementBoard({ limit = 10 }: { limit?: number }) {
  const status = useSync((s) => s.status);
  const nickname = useStore((s) => s.player?.nickname);
  const [rows, setRows] = useState<AchievementRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (status !== 'online') return;
    let live = true;
    api
      .achievementBoard(limit)
      .then((r) => live && setRows(r))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [status, limit]);

  return (
    <section className="pn-board" aria-labelledby="hall-h" data-testid="achievement-board" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Badge color="var(--pn-green)" />
          <div>
            <p className="pn-label pn-label--text">Зал славы</p>
            <h2 id="hall-h" className="pn-h2" style={{ fontSize: 28 }}>
              Лучшие по достижениям
            </h2>
          </div>
        </div>
        <span className="pn-label">топ-{limit} · все игры</span>
      </div>

      {status === 'offline' || failed ? (
        <div className="pn-empty-note" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span className="pn-dot pn-dot--warn" style={{ marginTop: 8 }} />
          <p style={{ margin: 0 }}>Таблица появится, когда сервер будет доступен. Твои достижения сохранены на этом устройстве.</p>
        </div>
      ) : rows === null ? (
        <p className="pn-hint">Загружаем таблицу…</p>
      ) : rows.length === 0 ? (
        <p className="pn-empty-note" style={{ margin: 0 }}>
          Пока ни одного достижения. Пройди главу и стань первым в зале славы.
        </p>
      ) : (
        <div className="pn-table-box">
          <table className="pn-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: 56 }}>
                  место
                </th>
                <th scope="col">ник</th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  достижения
                </th>
                <th scope="col" style={{ textAlign: 'right' }}>
                  игры
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.nickname}-${i}`} className={r.nickname === nickname ? 'is-me' : ''}>
                  <td className="num">{i + 1}</td>
                  <td>{r.nickname}</td>
                  <td className="num" style={{ textAlign: 'right', color: 'var(--pn-text)' }}>
                    {r.achievements}
                    <span className="sr-only"> {plural(r.achievements, 'достижение', 'достижения', 'достижений')}</span>
                  </td>
                  <td className="num" style={{ textAlign: 'right' }}>
                    {r.games}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
