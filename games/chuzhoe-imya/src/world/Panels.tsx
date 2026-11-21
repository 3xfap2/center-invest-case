import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  AudioLines, BadgeCheck, BookOpen, Check, CircleAlert, Clock3, FileCheck2,
  FileSearch2, GraduationCap, Headphones, LayoutGrid, Link2, Phone, ShieldCheck, TriangleAlert, X,
} from 'lucide-react'
import chapter from '../../content/dialogue/chapter.json'
import career from '../../content/career.json'
import type { CaseStore, Decision, Ending, LinkResult, Route, Transaction, TxId } from '../case'
import { PersonPortrait } from './Portrait'

export const beats = chapter.beats
export const endings = chapter.endings
export const money = (amount: number) => new Intl.NumberFormat('ru-RU').format(amount) + ' ₽'
export const clockText = (minutes: number) => [Math.floor(minutes / 60), minutes % 60].map(n => String(n).padStart(2, '0')).join(':')
export const decisionNames: Record<Decision, string> = { approve: 'Провести', hold: 'Приостановить', block: 'Заблокировать' }
export const routeNames: Record<Route, string> = { family: 'Связаться с семьёй', review: 'Передать в обычную проверку', accuse: 'Сообщить, что Даня виновен' }
export const relations: Record<LinkResult, string> = { confirms: 'Подтверждает', contradicts: 'Противоречит', none: 'Нет связи' }

export function Dialog({ title, label, icon, onClose, children, footer, mode = '' }: {
  title: string
  label?: string
  icon?: ReactNode
  onClose?: () => void
  children: ReactNode
  footer?: ReactNode
  mode?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    dialog.showModal()
    titleRef.current?.focus()
    return () => dialog.close()
  }, [])
  return <dialog className={'dialog ' + mode} ref={ref} aria-label={title} onCancel={event => event.preventDefault()}>
    <div className="dialog-head">
      {icon && <div className="panel-icon">{icon}</div>}
      <div>
        {label && <div className="micro">{label}</div>}
        <h2 ref={titleRef} tabIndex={-1}>{title}</h2>
      </div>
      {onClose && <button className="icon-button dialog-close" aria-label="Закрыть" onClick={onClose}><X size={20} /></button>}
    </div>
    <div className="dialog-content">{children}</div>
    {footer && <div className="dialog-footer">{footer}</div>}
  </dialog>
}

type PanelProps = { store: CaseStore; refresh: () => void; play: (kind: 'tap' | 'card' | 'clash') => void }

export function Terminal({ store, refresh, play }: PanelProps) {
  const [selected, setSelected] = useState<TxId>(store.state.step === 8 ? 'C' : 'A')
  const entries = store.transactions
  const tx = entries.find(item => item.id === selected) ?? entries[0]
  const inspected = tx && store.state.inspected.includes(tx.id)
  if (!tx) return <p className="empty"><FileSearch2 /> Очередь откроется после звонка Олега.</p>
  return <div className="split-panel">
    <div className="queue">
      <div className="section-label">Переводы молодёжного центра</div>
      {entries.map(item =>
        <button key={item.id} className={'queue-item' + (tx.id === item.id ? ' is-selected' : '')}
          onClick={() => { setSelected(item.id); play('tap') }} aria-pressed={tx.id === item.id}>
          <span className="queue-letter">{item.letter}</span>
          <span><strong>{money(item.amount)}</strong><small>{item.recipient}</small></span>
          <span className={'risk-badge' + (item.risk > 60 ? ' risk-high' : '')}>{item.risk}<small>/100</small></span>
        </button>)}
    </div>
    <div className="detail">
      <div className="section-label">Операция {tx.letter} · {tx.time}</div>
      <div className="transfer"><strong>{money(tx.amount)}</strong><span>{tx.recipient}</span></div>
      <div className="factor-list">
        {tx.factors.map(key => <div className="factor" key={key}>
          <span><span className="factor-mark" />{store.data.factors[key][0]}</span>
          {store.settings.hints && <small>{store.data.factors[key][1]}</small>}
        </div>)}
      </div>
      {inspected
        ? <div className="terminal-evidence">
            {store.evidence.filter(card => tx.cards.includes(card.id)).map(card =>
              <article key={card.id}><strong><Check size={15} />{card.title}</strong><p>{card.detail}</p></article>)}
          </div>
        : <button className="primary" onClick={() => { store.inspect(tx.id); play('card'); refresh() }}>
            <FileSearch2 size={17} /> Изучить перевод <span className="action-cost">−{store.data.inspectionMinutes} мин</span>
          </button>}
    </div>
  </div>
}

export function Calls({ store, refresh, play, presentation }: PanelProps & { presentation: 'phone' | 'video' | 'in-person' }) {
  const call = store.activeCalls[0]
  if (!call) return <p className="empty"><Phone /> Сейчас новых звонков нет.</p>
  const script = chapter.calls[call.id as keyof typeof chapter.calls]
  const person = chapter.people[call.character as keyof typeof chapter.people]
  const picked = store.state.calls[call.id]
  const reply = script.answers.find(([key]) => picked === key)?.[2]
  const unlocked = store.pressOptions(call.character)
  return <div className="call-panel">
    {presentation === 'video' && <div className={'video-wall ' + person.color}>
      <span><span className="online" /> {call.id === 'maria' ? 'РАЗГОВОР В ОФИСЕ' : 'ЗАЩИЩЁННАЯ ЛИНИЯ'}</span>
      <PersonPortrait person={call.character} speaking={!store.state.calls[call.id]} />
      <div className="call-person"><strong>{person.name}</strong><small>{person.role}</small></div>
      <AudioLines size={20} className="video-audio" />
    </div>}
    <div className="call-lines">
      {presentation !== 'video' && <div className="call-caption">{person.name} · {person.role}</div>}
      <blockquote>{script.line}</blockquote>
      {reply
        ? <div className="call-answer"><Headphones size={17} /><p>{reply}</p></div>
        : <div className="call-actions">
            <div className="section-label">Ваш ответ <span>· {store.data.callMinutes} мин</span></div>
            {script.answers.filter(([key]) => !key.startsWith('press_') || unlocked.includes(key)).map(([key, label]) =>
              <button className={'answer-button' + (key.startsWith('press_') ? ' press' : '')} key={key} onClick={() => {
                if (store.answerCall(call.id, key)) { play('card'); refresh() }
              }}>
                {key.startsWith('press_') && <FileCheck2 size={16} />}{label}
              </button>)}
          </div>}
      {reply && call.cards.length > 0 && <div className="found-evidence"><Check size={16} /> В дело добавлены улики: {store.evidence.filter(card => call.cards.includes(card.id)).map(card => card.title.toLocaleLowerCase('ru')).join(', ')}.</div>}
    </div>
  </div>
}

function TransLabel({ tx }: { tx: Transaction }) {
  return <div className="transaction-title">
    <span className="queue-letter">{tx.letter}</span>
    <span><strong>{money(tx.amount)}</strong><small>{tx.recipient}</small></span>
  </div>
}

export function Decisions({ store, refresh, play }: PanelProps) {
  return <div className="decision-grid">
    {store.transactions.map(tx => {
      const choice = store.state.decisions[tx.id]
      return <article className="decision-card" key={tx.id}>
        <TransLabel tx={tx} />
        <div className="segmented" role="group" aria-label={'Решение по операции ' + tx.letter}>
          {(Object.entries(decisionNames) as [Decision, string][]).map(([value, label]) =>
            <button key={value} type="button" aria-pressed={choice?.action === value}
              onClick={() => { store.decide(tx.id, value, choice?.reasons, choice?.route); play('tap'); refresh() }}>{label}</button>)}
        </div>
        {tx.id === 'C' && <fieldset className="contact">
          <legend>Дальнейшее действие</legend>
          {(Object.entries(routeNames) as [Route, string][]).map(([key, label]) =>
            <label key={key}><input type="radio" name="contact" checked={choice?.route === key}
              onChange={() => { store.decide('C', choice?.action ?? 'block', choice?.reasons, key); play('tap'); refresh() }} />{label}</label>)}
        </fieldset>}
        {tx.id === 'D' && <div className="refund-tip">
          {store.state.inspected.includes('D')
            ? <span><Check size={15} /> Билеты и заявка приложены к делу</span>
            : <button className="subtle" onClick={() => { store.inspect('D'); play('card'); refresh() }}>Открыть документы возврата · −{store.data.inspectionMinutes} мин</button>}
        </div>}
      </article>
    })}
  </div>
}

export function Report({ store, refresh, play }: PanelProps) {
  const [active, setActive] = useState<TxId>('A')
  const tx = store.transactions.find(item => item.id === active)!
  const choice = store.state.decisions[active]
  const submitted = store.state.submitted
  const toggle = (card: string) => {
    if (!choice) return
    const reasons = choice.reasons.includes(card) ? choice.reasons.filter(id => id !== card) : [...choice.reasons, card]
    if (store.decide(active, choice.action, reasons, choice.route)) { play('tap'); refresh() }
  }
  return <div className="split-panel report-panel">
    <div className="queue">
      <div className="section-label">Решения по операциям</div>
      {store.transactions.map(item => {
        const record = store.state.decisions[item.id]
        return <button key={item.id} className={'queue-item' + (active === item.id ? ' is-selected' : '')}
          aria-pressed={active === item.id} onClick={() => { setActive(item.id); play('tap') }}>
          <span className="queue-letter">{item.letter}</span>
          <span><strong>{money(item.amount)}</strong><small>{record && decisionNames[record.action]}</small></span>
          <span className="tag count-tag">{record?.reasons.length ?? 0}/2</span>
        </button>
      })}
    </div>
    <div className="detail">
      <TransLabel tx={tx} />
      {active === 'C' && choice?.route && <p className="report-route">{routeNames[choice.route]}</p>}
      <div className="section-label">Приложите 1 или 2 улики</div>
      <div className="evidence-options">
        {store.evidence.map(card => {
          const checked = choice?.reasons.includes(card.id) ?? false
          const hinted = store.settings.hints && store.data.rules.support[active].some(group => group.includes(card.id))
          return <button key={card.id} aria-pressed={checked} disabled={submitted || (!checked && choice?.reasons.length === 2)}
            className={(checked ? 'is-selected ' : '') + (hinted ? 'has-hint' : '')} onClick={() => toggle(card.id)}
            title={card.detail}>
            {checked ? <Check size={16} /> : <span className="checkbox-icon" />}
            <span>{card.title}<small>{card.detail}</small></span>
          </button>
        })}
      </div>
      {submitted && <div className={'comparison ' + (store.justified(active) ? 'confirms' : 'none')}>
        {store.justified(active) ? <><BadgeCheck size={18} /> Решение обосновано</> : <><CircleAlert size={18} /> Подозрение, а не доказательство</>}
      </div>}
    </div>
  </div>
}

export function EndingScreen({ store }: { store: CaseStore }) {
  const result = store.report()
  const ending = endings[result.ending]
  const flags = result.flags
  let summary = ending.summary
  if (result.ending === 'overblock') {
    if (flags.blocked_honest) summary = 'Как минимум один законный платёж остановили. Фестиваль пришлось отложить.'
    else if (!flags.danya_protected) summary = 'Вопрос с доступом к карте остался открытым. Мария вернула дело и отложила выплаты.'
    else summary = 'В отчёте не хватило подтверждений. Мария оставила выплаты на проверке, и фестиваль перенесли.'
  }
  const c = store.state.decisions.C
  const hasTime = store.remaining > 0
  const refundApproved = store.state.decisions.D?.action === 'approve' && store.justified('D') && hasTime
  const people = [
    ['oleg', 'Олег', flags.festival_held ? 'Фестиваль открывается по расписанию. Олег успел подтвердить бронирование.' : 'Открытие фестиваля под угрозой. Олегу нужно найти новое время или оборудование.'],
    ['irina', 'Ирина', (store.state.work.includes('mark_email') || store.state.calls.irina) ? 'Ирина узнала о подмене адреса. Теперь она сверяет новые реквизиты со знакомым контактом.' : 'Ирина так и не успела сверить письмо с поставщиком.'],
    ['victor', 'Виктор', flags.festival_held ? 'Получил оплату на счёт по договору. Оборудование привезут утром.' : 'Оплата и поставка задержались. Виктор ждёт подтверждения от центра.'],
    ['danya', 'Даня', flags.danya_protected ? 'Семья связалась с банком. Доступ к карте ограничили, а дело проверяют дальше.' : c?.route === 'accuse' ? 'Подозрение в отчёте записали как вину. Семье предстоит оспорить этот вывод.' : 'Семья ещё ждёт помощи. Чужой доступ к карте не проверили до конца.'],
    ['maria', 'Мария Сергеевна', 'Отчёт обосновал ' + flags.report_quality + ' из 4 решений.' + (refundApproved ? ' Волонтёру вернули деньги за билеты.' : ' Возврат за билеты не подтверждён.')],
  ]
  return <>
    <div className={'ending-banner ' + ending.tone}>
      <span className="panel-icon">{ending.tone === 'good' ? <ShieldCheck size={29} /> : <TriangleAlert size={29} />}</span>
      <div><div className="micro">ИТОГ РАССЛЕДОВАНИЯ</div><h3>{ending.title}</h3><p>{summary}</p>
        {!hasTime && <p>Срок оплаты истёк.</p>}</div>
      <div className="ending-score"><strong>{result.score}<small>/100</small></strong><span aria-label={'Звёзд: ' + result.stars}>{'★'.repeat(result.stars) + '☆'.repeat(3 - result.stars)}</span></div>
    </div>
    <div className="section-label ending-label">Что стало с героями</div>
    <div className="epilogue-people">
      {people.map(([key, name, description]) => <article key={key}>
        <div className="epilogue-avatar"><PersonPortrait person={key} /></div>
        <div><strong>{name}</strong><p>{description}</p></div>
      </article>)}
    </div>
    <Career />
  </>
}

function Career() {
  return <section className="career">
    <div className="career-heading"><GraduationCap size={27} /><div>
      <div className="micro">КАРТА ПРОФЕССИИ</div><h3>Специалист отдела антифрода</h3>
    </div></div>
    <p>{career.description}</p>
    <div className="career-columns">
      <div><h4>Навыки из игры</h4><ul>{career.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
      <div><h4>Где учиться в Ростовской области</h4><ul>{career.schools.map(([school, course, url]) =>
        <li key={url}><a href={url} target="_blank" rel="noreferrer">{school}</a><small>{course}</small></li>)}</ul></div>
    </div>
    <details><summary><BookOpen size={17} /> Как это работает в жизни и источники</summary>
      <ul>{career.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
      <ul>{career.sources.map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{name}</a></li>)}</ul>
    </details>
  </section>
}

export function DebugPanel({ store, jump, showAll, finish }: {
  store: CaseStore; jump: (index: number) => void; showAll: () => void; finish: (key: Ending) => void
}) {
  return <div className="debug-panel">
    <h3>Переход по эпизодам</h3>
    <div className="debug-grid">{beats.map((beat, index) =>
      <button className="secondary" key={beat.title} onClick={() => jump(index)}>{index + 1}. {beat.title}</button>)}</div>
    <button className="secondary" onClick={showAll}>Показать все карточки ({store.evidence.length})</button>
    <h3>Финалы</h3>
    <div className="debug-grid">{(Object.entries(endings) as [Ending, typeof endings.clean][]).map(([key, value]) =>
      <button key={key} className="secondary" onClick={() => finish(key)}>{value.title}</button>)}</div>
  </div>
}
