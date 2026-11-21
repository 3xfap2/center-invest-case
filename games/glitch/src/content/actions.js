// Тексты действий для журнала действий.
export const ACTION_TEXT = {
  enter_station: 'Запустил сборку 0.9.7',
  talk_lis: 'Поговорил с Лисом',
  take_lantern: 'Взял фонарь',
  return_lantern: 'Повесил фонарь на крюк',
  open_archive: 'Открыл дверь архива',
  enter_archive: 'Вошёл в архив',
  exit_archive: 'Вышел из архива',
  inspect_journal: 'Осмотрел журнал путешественников',
  inspect_clock: 'Осмотрел часы',
  inspect_bench: 'Осмотрел скамейку',
  try_service_door: 'Попробовал открыть служебный выход',
  use_terminal: 'Открыл терминал дежурного',
  inspect_wall: 'Осмотрел стену архива',
  door_other_side: 'Дверь открыта с другой стороны',
};

// Шаги, без которых главный баг не воспроизводится.
export const JOURNAL_BUG_STEPS = ['take_lantern', 'enter_archive', 'exit_archive'];
