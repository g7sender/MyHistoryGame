import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MultipleChoiceChallenge from './MultipleChoiceChallenge.jsx'

const TIME_LIMIT_SECONDS = 10

export default function SpeedChoiceChallenge({ challenge, onAnswered }) {
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT_SECONDS)
  const [expired, setExpired] = useState(false)
  const answeredRef = useRef(false)

  useEffect(() => {
    if (expired) return
    if (secondsLeft <= 0) {
      setExpired(true)
      if (!answeredRef.current) {
        answeredRef.current = true
        onAnswered(false)
      }
      return
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft, expired])

  function handleAnswered(correct) {
    if (answeredRef.current) return
    answeredRef.current = true
    setExpired(true)
    onAnswered(correct)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2">
        <span className="text-sm font-bold text-white/70">⚡ בחירה תחת לחץ</span>
        <motion.span
          animate={{ scale: secondsLeft <= 3 && !expired ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: secondsLeft <= 3 && !expired ? Infinity : 0 }}
          className={`rounded-full px-3 py-1 text-sm font-extrabold ${
            secondsLeft <= 3 ? 'bg-red-500/30 text-red-300' : 'bg-white/10 text-white'
          }`}
        >
          {secondsLeft}s
        </motion.span>
      </div>
      <MultipleChoiceChallenge challenge={challenge} onAnswered={handleAnswered} disabled={expired} />
    </div>
  )
}
