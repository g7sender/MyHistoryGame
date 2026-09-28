import { useState } from 'react'
import MultipleChoiceChallenge from './MultipleChoiceChallenge.jsx'

export default function WhoAmIChallenge({ challenge, onAnswered }) {
  const clues = challenge.clues
  const [revealedCount, setRevealedCount] = useState(1)
  const allRevealed = revealedCount >= clues.length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-xl border border-white/15 bg-white/5 p-4">
        {clues.slice(0, revealedCount).map((clue, index) => (
          <p key={index} className="text-sm leading-relaxed text-white/90">
            🔎 {clue}
          </p>
        ))}
      </div>
      {!allRevealed && (
        <button
          type="button"
          onClick={() => setRevealedCount((count) => count + 1)}
          className="self-start rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          רמז נוסף
        </button>
      )}
      <MultipleChoiceChallenge challenge={challenge} onAnswered={onAnswered} />
    </div>
  )
}
