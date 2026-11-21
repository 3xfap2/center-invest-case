import { useState } from 'react'
import { Archive, Check, ClipboardCheck, HelpCircle, Radio } from 'lucide-react'
import type { ArchiveQuest } from '../case/continuation'
import extra from '../../content/dialogue/voice-extra.json'
import { VoiceReplay } from './VoiceReplay'
import type { OfficeSound } from './sound'

export function ArchiveChallenge({ quest, onSolve, sound }: { quest: ArchiveQuest; onSolve: (answer: string) => boolean; sound: OfficeSound }) {
  const [tried, setTried] = useState(false)
  const Icon = quest.id === 'voice' ? Radio : quest.id === 'handoff' ? ClipboardCheck : Archive
  return <div className="archive-challenge">
    <p className="archive-clue"><Icon size={20} /><span>{quest.clue}</span></p>
    <VoiceReplay sound={sound} cue={'archive-' + quest.id} channel={quest.id === 'voice' ? 'radio' : 'live'} />
    <div className="call-actions">
      {quest.options.map(option => <button className="answer-button" key={option.id} onClick={() => {
        if (!onSolve(option.id)) { sound.play('wrong'); setTried(true) }
      }}>{option.label}</button>)}
    </div>
    {tried && <p className="archive-clue archive-help" role="status"><HelpCircle size={18} />{quest.wrong}</p>}
  </div>
}

export function ArchiveResult({ sound }: { sound: OfficeSound }) {
  return <div className="archive-challenge">
    <p className="archive-clue"><Check size={22} /><span>{extra['archive-result'].text}</span></p>
    <VoiceReplay sound={sound} cue="archive-result" />
  </div>
}
