import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, scale: 0.85 },
  correct: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  wrong: { opacity: 1, scale: 1, x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.4 } },
}

export default function AnswerFeedback({ result, explanation }) {
  return (
    <motion.div
      initial="hidden"
      animate={result ? 'correct' : 'wrong'}
      variants={variants}
      className={`mt-5 rounded-xl border p-4 ${
        result ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10'
      }`}
    >
      <p className="font-bold text-white">{result ? 'תשובה נכונה! 🎉' : 'לא בדיוק...'}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{explanation}</p>
    </motion.div>
  )
}
