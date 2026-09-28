import { useMemo, useState } from 'react'
import { shuffleArray } from '../../utils/shuffleArray.js'

// challenge.pairs - מערך {left, right}. השחקן לוחץ פריט מהעמודה השמאלית ואז מהימנית;
// אם נכון - הזוג ננעל בצבע העולם, אם לא - מהבהב אדום וחוזרים לנסות. תשובה "שגויה"
// (מפעילה איבוד לב) רק אם הייתה לפחות טעות אחת בדרך להשלמת כל הזוגות.
export default function MatchingChallenge({ challenge, onAnswered }) {
  const pairs = challenge.pairs
  const leftItems = useMemo(
    () => shuffleArray(pairs.map((pair, pairIndex) => ({ label: pair.left, pairIndex }))),
    [challenge],
  )
  const rightItems = useMemo(
    () => shuffleArray(pairs.map((pair, pairIndex) => ({ label: pair.right, pairIndex }))),
    [challenge],
  )

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [wrongPairIndex, setWrongPairIndex] = useState(null)
  const [hadMistake, setHadMistake] = useState(false)

  function handleLeftClick(item) {
    if (matchedPairs.includes(item.pairIndex)) return
    setSelectedLeft(item.pairIndex)
  }

  function handleRightClick(item) {
    if (selectedLeft === null || matchedPairs.includes(item.pairIndex)) return
    if (item.pairIndex === selectedLeft) {
      const next = [...matchedPairs, item.pairIndex]
      setMatchedPairs(next)
      setSelectedLeft(null)
      if (next.length === pairs.length) {
        onAnswered(!hadMistake)
      }
    } else {
      setHadMistake(true)
      setWrongPairIndex(item.pairIndex)
      setSelectedLeft(null)
      setTimeout(() => setWrongPairIndex(null), 400)
    }
  }

  function columnItemClasses({ isMatched, isSelected, isWrong }) {
    if (isMatched) return 'border-[var(--world-accent)] bg-[var(--world-accent)]/10 text-white/60'
    if (isWrong) return 'border-2 border-red-400 bg-red-500/20 text-white'
    if (isSelected) return 'border-2 border-white bg-white/15 text-white'
    return 'border-white/15 bg-white/5 text-white active:scale-[0.98]'
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        {leftItems.map((item) => {
          const isMatched = matchedPairs.includes(item.pairIndex)
          return (
            <button
              key={item.label}
              type="button"
              disabled={isMatched}
              onClick={() => handleLeftClick(item)}
              className={`rounded-xl border p-3 text-sm font-semibold transition ${columnItemClasses({
                isMatched,
                isSelected: selectedLeft === item.pairIndex,
              })}`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="flex flex-col gap-2">
        {rightItems.map((item) => {
          const isMatched = matchedPairs.includes(item.pairIndex)
          return (
            <button
              key={item.label}
              type="button"
              disabled={isMatched}
              onClick={() => handleRightClick(item)}
              className={`rounded-xl border p-3 text-sm font-semibold transition ${columnItemClasses({
                isMatched,
                isWrong: wrongPairIndex === item.pairIndex,
              })}`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
