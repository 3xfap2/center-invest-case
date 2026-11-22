import { useState } from 'react';
import type { ReactNode } from 'react';
import career from '../../content/career.json';
import meta from '../../game.json';
import { axisById, camp, locationById, roomById, types } from '../camp/content';
import type { Axis, Path, Teen } from '../camp/content';
import { activity, afterTalk, currentSlot, difficultyRules, isReady, labels, leadingSuggestion, outcome, pathName, playerRadar, profile, readyPaths, slotSeconds, symbols } from '../camp/game';
import type { CampState } from '../camp/game';
import { marks } from './CampMap';
import { picture, portrait } from './illustration';

export const levelLabels = { easy: 'Лёгкий', normal: 'Обычный', hard: 'Сложный' };
export const slotNames = ['Утро', 'День', 'Вечер'];
export const linkByAxis: Record<Axis, { label: string; path: string; profession: string }> = {
  nature: { label: 'Дым', path: '../dym/index.html', profession: 'Пожарный' },
  tech: { label: 'GLITCH', path: '../glitch/index.html', profession: 'Тестировщик игр' },
  people: { label: 'Компас', path: './index.html', profession: 'Профконсультант' },
  signs: { label: 'Чужое имя', path: '../chuzhoe-imya/index.html', profession: 'Специалист антифрода' },
  art: { label: 'GLITCH', path: '../glitch/index.html', profession: 'Тестировщик игр' },
};

const point = (i: number, scale: number, radius = 53): [number, number] => [
  76 + Math.sin(i * Math.PI * 2 / 5) * radius * scale,
  73 - Math.cos(i * Math.PI * 2 / 5) * radius * scale,
];
const polygon = (values: number[]) => values.map((v, i) => point(i, v).join(',')).join(' ');

export function Radar({ values }: { values: (number | null)[] }) {
  return <svg className="radar" viewBox="0 0 152 136" role="img" aria-label={types.map((axis, i) => axisById[axis].short + ' ' + (values[i] ?? '?')).join(', ')}>
    {[0.25, 0.5, 0.75, 1].map(scale => <polygon key={scale} points={polygon(types.map(() => scale))} className="radar-ring" />)}
    {types.map((axis, i) => {
      const [x,y] = point(i, 1);
      const [lx,ly] = point(i, 1, 67);
      return <g key={axis}><line x1="76" y1="73" x2={x} y2={y} className="radar-line" />
        <text x={lx} y={ly + 4} textAnchor="middle">{marks[axis]}</text></g>;
    })}
    {values.some(v => v !== null) && <polygon points={polygon(values.map(v => v === null ? 0.14 : v / 100))} className="radar-data" />}
    {values.map((v, i) => {
      const [x,y] = point(i, v === null ? 0.85 : v / 100);
      return v === null ? <circle className="radar-unknown" key={i} cx={x} cy={y} r="5" /> : <circle className="radar-dot" key={i} cx={x} cy={y} r="2.8" />;
    })}
  </svg>;
}

export function CompassLogo() {
  return <span className="brand-icon" aria-hidden="true"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="12.8" stroke="currentColor" fill="none" strokeWidth="1"/><path d="M23.5 12.5 20 20l-7.5 3.5L16 16z" fill="currentColor"/><path d="M18 3.5v4m0 21v4m-14.5-14.5h4m21 0h4" stroke="currentColor" strokeWidth="1"/></svg></span>;
}

export function Sidebar({ state, selected, revealed, status, focus, next, openSchool }: {
  state: CampState; selected: Teen; revealed: boolean; status: string; focus: string | null; next: () => void;
  openSchool: () => void;
}) {
  const data = camp.days[state.day];
  const values = profile(state, selected, revealed);
  const found = values.filter(v => v !== null).length;
  const watching = state.phase === 'watch';
  const ready = isReady(state);
  const outside = state.phase !== 'plan' && state.phase !== 'watch' && state.phase !== 'review';
  const latest = [...state.observations].reverse().find(note => note.teen === selected.id);
  const count = Object.keys(state.assignments).length;
  const signal = activity(state, selected);
  const saw = state.observations.some(item => item.teen === selected.id && item.slot === currentSlot(state));
  const remaining = Math.ceil(slotSeconds - state.elapsed);
  const location = focus ? locationById.get(focus) : undefined;
  const workshop = focus ? roomById.get(focus) : undefined;
  const needsSchool = state.phase === 'plan' && !state.schoolVisited;
  return <aside className="sidebar">
    <div className="side-heading"><div><small>ДЕНЬ {state.day + 1} ИЗ {camp.days.length}</small><h2>{data.title}</h2></div><span className="day-sun" aria-hidden="true">{state.slot === 2 ? '☾' : '☀'}</span></div>
    <div className="slot-tabs">{slotNames.map((label, index) => <span key={label} className={index === state.slot ? 'current' : index < state.slot ? 'done' : ''}><i />{label}</span>)}</div>
    {location ? <section className="context location-info" aria-label="О локации" aria-live="polite">
      <h3>{location.name}</h3>
      <p>{location.description}</p>
      <dl className="location-details">
        <div><dt>Навык</dt><dd>{location.skill}</dd></div>
        <div><dt>Что даёт</dt><dd>{workshop ? 'Наблюдение по шкале «' + axisById[workshop.type].short + '»' : camp.school.reward}</dd></div>
        {workshop && <div><dt>Сегодня</dt><dd>{workshop.program?.[state.day] ?? workshop.task}</dd></div>}
      </dl>
    </section> : <div className="context">
      <small>{watching ? 'НАБЛЮДЕНИЕ' : state.phase === 'review' ? 'ЗАНЯТИЕ ЗАВЕРШЕНО' : data.speaker}</small>
      <p>{watching ? 'Щёлкни по участнику, пока виден знак эмоции.' :
        state.phase === 'review' ? 'Сверь заметки и переходи дальше.' :
        needsSchool ? 'Перед занятиями зайди в школу за дневником наблюдений.' : data.line}</p>
    </div>}
    <section className="profile" aria-label="Профиль участника">
      <div className="profile-title">
        <img src={portrait(selected)} alt="" />
        <div><small>ДНЕВНИК НАБЛЮДЕНИЙ</small><h3>{selected.name} <span>{selected.age} лет</span></h3></div>
      </div>
      <div className="profile-chart">
        <Radar values={values} />
        <ul>{types.map((id, i) => <li key={id}><i style={{ background: axisById[id].color }}/><span>{axisById[id].short}</span><b>{values[i] ?? '·'}</b></li>)}</ul>
      </div>
      <div className="profile-note" aria-live="polite">{status || (watching && signal?.active && difficultyRules[state.difficulty].hint && !saw ? symbols[signal.emote] + ' ' + labels[signal.emote] + ' · можно наблюдать' :
        latest?.text ?? (found ? 'Профиль открыт в отладке.' : 'Профиль проявится после наблюдений.'))}</div>
    </section>
    {watching || state.phase === 'review' ? <>
      <div className="watch-line"><span>Наблюдения <b>{state.points}/{difficultyRules[state.difficulty].points}</b></span><span>{watching ? 'Осталось ' + remaining + ' с' : 'Готово'}</span></div>
      <progress className="watch-progress" value={state.elapsed} max={slotSeconds} aria-label="Ход мастерской" />
      {state.phase === 'review' && <button className="primary main-action" onClick={next}>{state.slot === 2 ? 'К разговору' : 'Следующее занятие'} <b>→</b></button>}
    </> : <div className="side-action">
      <div className="watch-line"><span>Распределено</span><b>{count}/{camp.teens.length}</b></div>
      {needsSchool ? <button className="primary main-action" onClick={openSchool}>
        {focus === camp.school.id ? 'Войти в школу' : 'Посетить школу'} <b>→</b>
      </button> : <button className="primary main-action" disabled={outside || !ready} onClick={next}>Начать занятие <b>→</b></button>}
    </div>}
  </aside>;
}

export function Dialog({ title, sub, children, className = '' }: { title: string; sub?: string; children: ReactNode; className?: string }) {
  return <div className="scrim" role="presentation">
    <section role="dialog" aria-modal="true" aria-label={title} className={'dialog ' + className}>
      <header>{sub && <small>{sub}</small>}<h2>{title}</h2></header>
      {children}
    </section>
  </div>;
}

export function SchoolVisit({ finish, close }: { finish: () => void; close: () => void }) {
  return <Dialog title={camp.school.name} sub="ГАЛИНА ПЕТРОВНА · ШКОЛЬНЫЙ ПСИХОЛОГ">
    <p>{camp.school.brief}</p>
    <div className="dialog-actions">
      <button className="primary" onClick={finish}>Взять дневник</button>
      <button className="secondary" onClick={close}>Вернуться к карте</button>
    </div>
  </Dialog>;
}

export function Evening({ state, selected, pick, ask, next }: {
  state: CampState; selected: Teen; pick: (id: string) => void;
  ask: (id: string, question: typeof camp.questions[number]['id']) => void; next: (state: CampState) => void;
}) {
  const spoken = state.talks.find(item => item.day === state.day);
  const teen = camp.teens.find(item => item.id === spoken?.teen) ?? selected;
  return <Dialog title="Разговор у фонаря" className="evening" sub={'ДЕНЬ ' + (state.day + 1) + ' · ВЕЧЕР'}>
    <p>{camp.days[state.day].evening}</p>
    {!spoken ? <>
      <div className="talk-roster">{camp.teens.map(item => <button key={item.id} aria-pressed={teen.id === item.id} onClick={() => pick(item.id)}>
        <img src={portrait(item)} alt="" /><span>{item.name}</span></button>)}</div>
      <div className="choices">{camp.questions.map(q => <button key={q.id} onClick={() => ask(teen.id, q.id)}><b>{q.icon}</b>{q.id === 'leading' ? 'Тебе ведь хочется выбрать «' + pathName(leadingSuggestion(state, teen)) + '»?' : q.text}</button>)}</div>
    </> : <>
      <blockquote className="answer"><img src={portrait(teen)} alt="" /><div><b>{teen.name}</b><p>«{spoken.text}»</p></div></blockquote>
      <button className="primary" onClick={() => next(afterTalk(state))}>{state.day < 2 ? 'Утро следующего дня' : 'Подготовить карточки'} →</button>
    </>}
  </Dialog>;
}

export function Paths({ state, selected, pick, change, next }: {
  state: CampState; selected: Teen; pick: (id: string) => void; change: (id: string, path: Path) => void; next: () => void;
}) {
  const notes = state.observations.filter(item => item.teen === selected.id).slice(-3);
  const talk = state.talks.filter(item => item.teen === selected.id).at(-1);
  const paths: Path[] = [...types, 'legal', 'explore'];
  return <Dialog title="Куда попробовать дальше?" sub="ЛИЧНАЯ КАРТОЧКА" className="wide">
    <div className="path-roster">{camp.teens.map(teen => <button key={teen.id} aria-pressed={selected.id === teen.id} onClick={() => pick(teen.id)}
      onDragOver={e => e.preventDefault()} onDrop={e => {
        e.preventDefault(); const path = e.dataTransfer.getData('text/plain') as Path; if (paths.includes(path)) change(teen.id, path);
      }}><img src={portrait(teen)} alt="" /><span><b>{teen.name}</b><small>{state.paths[teen.id] ? pathName(state.paths[teen.id]) : 'Выбрать путь'}</small></span></button>)}</div>
    <div className="path-body">
      <div className="path-notes"><h3>{selected.name}</h3>
        {talk && <p>«{talk.text}»</p>}
        {notes.length > 0 ? <ul>{notes.map(note => <li key={note.slot}>{note.text}</li>)}</ul> : <p>В дневнике нет наблюдений.</p>}
      </div>
      <div className="path-options">{paths.map(path => <button key={path} draggable onDragStart={e => e.dataTransfer.setData('text/plain', path)}
        aria-pressed={state.paths[selected.id] === path} onClick={() => change(selected.id, path)}>
        <i>{path === 'legal' ? '§' : path === 'explore' ? '＋' : marks[path]}</i>{pathName(path)}
      </button>)}</div>
    </div>
    <button className="primary" disabled={!readyPaths(state)} onClick={next}>К встрече с родителями →</button>
  </Dialog>;
}

export function EndingScreen({ state, next }: { state: CampState; next: () => void }) {
  const ending = state.ending!;
  const response = {
    good: 'Директор убрал таблицу. На встрече каждый рассказал о своей следующей пробе.',
    mixed: 'Директор принял карточки. Несколько ребят попросили новые пробы после лагеря.',
    ranked: 'Директор зачитал места. Несколько ребят решили, что им уже поздно что-то менять.',
  };
  return <Dialog title="Пять лет спустя" sub={meta.endings[ending]} className="wide epilogue">
    <p>{response[ending]}</p>
    <div className="memories">{camp.teens.map(teen => {
      const { level } = outcome(state, teen);
      const image = camp.pictures.flat().find(choice => choice.type === teen.wish)?.image ?? 'sprout';
      return <article key={teen.id}><div className="memory-img"><img src={picture(image)} alt="" /><img src={portrait(teen)} alt="" /></div>
        <h3>{teen.name}</h3><p>{teen.endings[level]}</p></article>;
    })}</div>
    <article className="career">
      <h3>{career.title}</h3><p>{career.description}</p>
      <div className="skills">{career.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
      <p><b>Где учиться</b> · {career.study}</p><p>{career.model}</p>
      <div className="sources">{career.sources.map(source => <a key={source.label} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div>
    </article>
    <button className="primary" onClick={next}>А теперь ты →</button>
  </Dialog>;
}

export function SelfQuiz({ state, answer }: { state: CampState; answer: (axis: Axis) => void }) {
  const pair = camp.pictures[state.answers.length];
  if (!pair) return null;
  return <Dialog title="Что бы ты попробовал?" sub={'А ТЕПЕРЬ ТЫ · ' + (state.answers.length + 1) + ' ИЗ ' + camp.pictures.length} className="quiz-dialog">
    <div className="picture-pair">{pair.map(item => <button key={item.type} onClick={() => answer(item.type)}><img src={picture(item.image)} alt="" /><b>{item.label}</b></button>)}</div>
  </Dialog>;
}

export function SelfResult({ state, restart, exit }: { state: CampState; restart: () => void; exit: () => void }) {
  const { values, top } = playerRadar(state);
  const [show, setShow] = useState(false);
  return <Dialog title="Твой компас" sub="А ТЕПЕРЬ ТЫ" className="wide result-dialog">
    <p>Подсказка, а не приговор. Вот за чем ты чаще следил в лагере и какие занятия выбирал.</p>
    <div className="result-body">
      <Radar values={types.map(axis => values[axis])} />
      <div className="try-list">{top.map(axis => {
        const suggestion = linkByAxis[axis];
        return <div key={axis}><b>{marks[axis]} {axisById[axis].title}</b><small>{axisById[axis].action}</small>
          <a href={suggestion.path} target="_blank" rel="noreferrer">{suggestion.profession} · {suggestion.label} ↗</a></div>;
      })}</div>
    </div>
    <div className="dialog-actions"><button className="primary" onClick={exit}>Выйти в меню →</button>
      <button className="secondary" onClick={() => setShow(!show)}>{show ? 'Отмена' : 'Новая смена'}</button>
      {show && <button className="secondary" onClick={restart}>Начать сначала</button>}</div>
  </Dialog>;
}
