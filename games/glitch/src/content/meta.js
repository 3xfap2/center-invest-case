// Достижения, концовки и этапы прогресса для сайта. Описание: docs/ACHIEVEMENTS.md, docs/FLAGS.md.

// Список достижений лежит в achievements.json в корне игры: его же читает сайт.
import ACH_LIST from '../../achievements.json';

export const ACHIEVEMENTS = Object.fromEntries(ACH_LIST.map((a) => [a.id, a.title]));

// Этапы сюжета: флаг события -> [step, percent].
export const PROGRESS = [
  ['start', 'office', 0],
  ['met_irina', 'briefing', 8],
  ['entered_station', 'station', 15],
  ['met_lis', 'lis', 22],
  ['bench_reported', 'first_report', 30],
  ['journal_gone', 'journal_gone', 42],
  ['replay_ok', 'reproduced', 55],
  ['journal_reported', 'reported', 65],
  ['compared', 'duplicate', 75],
  ['evidence_saved', 'evidence_saved', 85],
  ['door_opened', 'door', 95],
  ['chapter_done', 'end', 100],
];

// Концовки главы 1. Судьба героев зависит от собранных улик и решений.
export const ENDINGS = {
  gl_ch1_thorough: {
    title: 'Внимательная смена',
    heroes: (d) => [
      { name: 'Ирина Белова', text: 'Перечитала твой отчёт два раза. Утром она впервые за месяц откроет старый отчёт #0412.' },
      { name: 'Тимур Сафин', text: 'Остался в офисе до ночи. Ищет строчку, которой не должно быть в сборке.' },
      { name: 'Никита Орлов', text: 'Ещё не знает, что его надпись в архиве нашли. Но его запись наконец кто-то сохранил.' },
      lisFate(d),
    ],
  },
  gl_ch1_standard: {
    title: 'Смена закрыта',
    heroes: (d) => [
      { name: 'Ирина Белова', text: 'Приняла отчёт. Про #0412 пока ничего не сказала.' },
      { name: 'Тимур Сафин', text: 'Обещал посмотреть утром. Но уходить домой не спешит.' },
      { name: 'Никита Орлов', text: 'Его запись сохранена. Следы в архиве пока никто не нашёл.' },
      lisFate(d),
    ],
  },
};

function lisFate(d) {
  return d.gl_reported_lis
    ? { name: 'Лис', text: 'Ждёт у будки. Он заметил, что ты всё-таки отправил отчёт о нём. И всё равно ждёт.' }
    : { name: 'Лис', text: 'Снова собирает журнал. Кажется, он рад, что ты вернулся.' };
}
