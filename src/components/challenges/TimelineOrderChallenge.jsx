import { useMemo, useState } from 'react'
import { shuffleArray } from '../../utils/shuffleArray.js'

// challenge.events - מערך אירועים לפי הסדר הכרונולוגי הנכון (מקור האמת). מערבבים
// לתצוגה, והשחקן בונה מחדש את הסדר בלחיצה על הפריטים לפי הסדר שהוא חושב שנכון.
export default function TimelineOrderChallenge({ challenge, onAnswered }) {
  const correctOrder = challenge.events
  const shuffled = useMemo(() => shuffleArray(correctOrder), [challenge])
  const [pickedIndexes, setPickedIndexes] = useState([])
  const graded = pickedIndexes.length === shuffled.length

  function handlePick(index) {
    if (graded || pickedIndexes.includes(index)) return
    const next = [...pickedIndexes, index]
    setPickedIndexes(next)
    if (next.length === shuffled.length) {
      const chosenOrder = next.map((i) => shuffled[i])
      const correct = chosenOrder.every((label, i) => label === correctOrder[i])
      onAnswered(correct)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {pickedIndexes.length > 0 && (
        <ol className="flex flex-col gap-2">
          {pickedIndexes.map((index, orderPosition) => (
            <li
              key={index}
              className="flex items-center gap-3 rounded-xl border border-[var(--world-accent)] bg-[var(--world-accent)]/10 p-3 text-sm font-semibold text-white"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: 'var(--world-accent)', color: 'var(--world-secondary)' }}
              >
                {orderPosition + 1}
              </span>
              {shuffled[index]}
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-col gap-2">
        {shuffled.map((label, index) =>
          pickedIndexes.includes(index) ? null : (
            <button
              key={index}
              type="button"
              onClick={() => handlePick(index)}
              disabled={graded}
              className="w-full rounded-xl border border-white/15 bg-white/5 p-4 text-right text-base font-medium text-white transition active:scale-[0.98]"
            >
              {label}
            </button>
          ),
        )}
      </div>
    </div>
  )
}
