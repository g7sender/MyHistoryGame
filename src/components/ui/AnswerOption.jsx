export default function AnswerOption({ label, state, onClick, disabled }) {
  // state: 'idle' | 'correct' | 'wrong'
  const stateClasses = {
    idle: 'border-white/15 bg-white/5 active:scale-[0.98]',
    correct: 'border-2 border-green-400 bg-green-500/30',
    wrong: 'border-2 border-red-400 bg-red-500/30',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-right text-base font-medium text-white transition ${stateClasses[state]}`}
    >
      <span>{label}</span>
      {state === 'correct' && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-400 text-sm font-bold text-slate-900">
          ✓
        </span>
      )}
      {state === 'wrong' && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-400 text-sm font-bold text-slate-900">
          ✗
        </span>
      )}
    </button>
  )
}
