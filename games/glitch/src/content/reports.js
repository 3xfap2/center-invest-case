// Варианты для формы отчёта и список доказательств.

export const REPORT_SUBJECTS = [
  {
    id: 'bench',
    label: 'Скамейка в зале ожидания',
    title: 'Скамейка висит в воздухе и вращается',
    expected: [
      { id: 'bench_floor', text: 'Скамейка стоит на полу' },
      { id: 'bench_fly', text: 'Скамейка может подниматься в воздух' },
    ],
    actual: [
      { id: 'bench_flying', text: 'Скамейка висит в воздухе и вращается' },
      { id: 'bench_missing', text: 'Скамейки нет в зале' },
    ],
  },
  {
    id: 'clock',
    label: 'Часы на станции',
    title: 'Часы на станции идут назад',
    expected: [
      { id: 'clock_forward', text: 'Часы идут вперёд' },
      { id: 'clock_stopped', text: 'Часы стоят' },
    ],
    actual: [
      { id: 'clock_backward', text: 'Часы идут назад' },
      { id: 'clock_fast', text: 'Часы спешат' },
    ],
  },
  {
    id: 'journal',
    label: 'Журнал путешественников',
    title: 'Журнал путешественников исчезает со стойки',
    expected: [
      { id: 'journal_stays', text: 'Журнал остаётся на стойке' },
      { id: 'journal_gone_ok', text: 'Журнал убирается после разговора с Лисом' },
    ],
    actual: [
      { id: 'journal_vanishes', text: 'Журнал исчезает со стойки' },
      { id: 'journal_moves', text: 'Журнал переносится в архив' },
    ],
  },
  {
    id: 'lis_name',
    label: 'Лис называет игрока по имени',
    title: 'Лис узнаёт игрока и ссылается на прошлую сборку',
    expected: [
      { id: 'lis_generic', text: 'Лис приветствует как нового путешественника' },
      { id: 'lis_named_ok', text: 'Лис называет игрока по имени из профиля' },
    ],
    actual: [
      { id: 'lis_remembers', text: 'Лис говорит, что игрок уже проверял дверь в прошлой сборке' },
      { id: 'lis_silent', text: 'Лис молчит' },
    ],
  },
];

export const SEVERITY = [
  { id: 'low', text: 'Низкая: заметно, но не мешает играть' },
  { id: 'medium', text: 'Средняя: мешает, но есть обход' },
  { id: 'high', text: 'Высокая: теряется предмет или прогресс' },
  { id: 'critical', text: 'Критическая: игра ломается или вылетает' },
];

export const EVIDENCE_ITEMS = [
  { id: 'replay_journal', title: 'Твоя запись повтора: исчезновение журнала', desc: 'Взял фонарь → вошёл в архив → вышел. Журнал исчез.' },
  { id: 'report_0412', title: 'Отчёт #0412 (n.orlov)', desc: 'Та же ошибка месяц назад. Закрыт: «Не воспроизводится».' },
  { id: 'profile_match', title: 'Совпадение профиля tester_02', desc: 'Твой профиль скопирован с профиля Никиты Орлова вместе с историей.' },
  { id: 'chalk_note', title: 'Надпись мелом в архиве', desc: '«н.о. 0.9.3 журнал тут был». Видна только в свете фонаря.' },
];
