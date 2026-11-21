import { useState } from 'react'
import { Check, FileText, Folder, ZoomIn } from 'lucide-react'
import type { CaseStore } from '../case'
import type { OfficeSound, Sound } from './sound'
import { VoiceReplay } from './VoiceReplay'
import extra from '../../content/dialogue/voice-extra.json'

type Props = { store: CaseStore; refresh: () => void; play: (sound: Sound) => void }

export function Archive({ store, refresh, play }: Props) {
  const [picked, setPicked] = useState('')
  const found = store.state.work.includes('take_contract')
  return <div className="archive-tool">
    <p>Достань папку, у которой последние цифры ИНН совпадают с данными в заявке.</p>
    <p className="archive-tag">Из заявки: <strong>•• {store.data.archive.ending}</strong></p>
    <div className="folders">
      {store.data.archive.folders.map(folder => <button key={folder.code} aria-pressed={picked === folder.code} disabled={found} onClick={() => {
        setPicked(folder.code)
        if (store.perform('take_contract', folder.code)) { play('card'); refresh() } else play('tap')
      }}>
        <Folder size={30} /><strong>{folder.code}</strong><span>{folder.name}</span><small>{folder.year}</small>
      </button>)}
    </div>
    {found ? <p className="tool-result"><Check size={18} /> Договор Виктора найден. Счёт в договоре оканчивается на 3027.</p>
      : picked && <p className="tool-result warn">Цифры в этой папке отличаются от заявки.</p>}
  </div>
}

export function Email({ store, refresh, play, sound }: Props & { sound: OfficeSound }) {
  const [zoom, setZoom] = useState(false)
  const [wrong, setWrong] = useState(false)
  const found = store.state.work.includes('mark_email')
  const source = store.data.email
  return <div className="email-tool">
    <div className="email-subject"><FileText size={17} /><strong>Счёт за оборудование</strong></div>
    <p>Ирина: «{extra['irina-email'].text}»</p>
    <VoiceReplay sound={sound} cue="irina-email" />
    {!zoom && !found ? <>
      <p className="raw-email">{source.sender}</p>
      <button className="primary" onClick={() => { setZoom(true); play('tap') }}><ZoomIn size={17} /> Увеличить адрес</button>
    </> : <>
      <p>В договоре: <code>{source.verified}</code></p>
      <p>В письме: <code>contract@svet-<span className="email-letters">
        {source.characters.map((character, index) => <button key={index} aria-label={'Буква ' + character}
          aria-pressed={found && index === source.addedIndex} disabled={found} onClick={() => {
            const success = store.perform('mark_email', character)
            setWrong(!success)
            play(success ? 'card' : 'wrong')
            refresh()
          }}>{character}</button>)}
      </span>.example</code></p>
      <p className={wrong ? 'warn' : ''} aria-live="polite">{found ? 'В адресе заменили одну букву. Письмо добавлено к уликам.'
        : wrong ? 'Эта буква в обоих адресах совпадает.' : 'Отметь букву, которая не совпадает.'}</p>
    </>}
  </div>
}
