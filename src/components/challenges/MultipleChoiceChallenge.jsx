import { useMemo, useState } from 'react'
import { shuffleArray } from '../../utils/shuffleArray.js'
import AnswerOption from '../ui/AnswerOption.jsx'

// disabled=true חושף את התשובה הנכונה בלי שהשחקן בחר (למשל כשפג הזמן ב-speed-choice)
export default function MultipleChoiceChallenge({ challenge, onAnswered, disabled = false }) {
  const shuffledOptions = useMemo(
    () => shuffleArray(challenge.options.map((label, originalIndex) => ({ label, originalIndex }))),
    [challenge],
  )
  const [selectedIndex, setSelectedIndex] = useState(null)
  const revealed = selectedIndex !== null || disabled

  function handleSelect(index) {
    if (revealed) return
    setSelectedIndex(index)
    onAnswered(shuffledOptions[index].originalIndex === challenge.correctIndex)
  }

  function optionState(index) {
    if (!revealed) return 'idle'
    if (shuffledOptions[index].originalIndex === challenge.correctIndex) return 'correct'
    if (index === selectedIndex) return 'wrong'
    return 'idle'
  }

  return (
    <div className="flex flex-col gap-3">
      {shuffledOptions.map((option, index) => (
        <AnswerOption
          key={option.label}
          label={option.label}
          state={optionState(index)}
          disabled={revealed}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>
  )
}
