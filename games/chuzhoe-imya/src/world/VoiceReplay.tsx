import { useEffect } from 'react'
import { Volume2 } from 'lucide-react'
import type { OfficeSound, VoiceChannel } from './sound'

export function VoiceReplay({ sound, cue, channel = 'live' }: { sound: OfficeSound; cue: string; channel?: VoiceChannel }) {
  const available = sound.hasVoice(cue)
  useEffect(() => {
    if (!available) return
    sound.speak(cue, channel)
    return () => sound.stopVoice(cue)
  }, [available, sound, cue, channel])

  if (!available) return null
  return <button type="button" className="voice-replay" aria-label="Повторить реплику"
    onClick={() => sound.speak(cue, channel)}><Volume2 size={16} /> Повторить реплику</button>
}
