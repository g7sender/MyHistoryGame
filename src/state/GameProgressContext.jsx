import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadProgress, saveProgress } from './progressStorage.js'

const GameProgressContext = createContext(null)

const MAX_HEARTS = 3
const HEART_REGEN_MS = 30 * 60 * 1000
const XP_PER_CORRECT = 100
const COINS_PER_CORRECT = 10
const STREAK_BONUSES = { 3: 50, 5: 100 }

// אם עברו מספיק דקות מאז שאיבדנו לב, ממלאים בהדרגה עד למקסימום.
// אין בכך שום חסימה - זה רק כדי שהתצוגה של ה-❤️ לא תישאר ריקה לנצח.
function withHeartsRegen(state) {
  if (state.hearts >= MAX_HEARTS) {
    return state.heartsLastRegenAt ? state : { ...state, heartsLastRegenAt: Date.now() }
  }
  const elapsed = Date.now() - state.heartsLastRegenAt
  const regenCount = Math.floor(elapsed / HEART_REGEN_MS)
  if (regenCount <= 0) return state
  const hearts = Math.min(MAX_HEARTS, state.hearts + regenCount)
  const heartsLastRegenAt =
    hearts >= MAX_HEARTS ? Date.now() : state.heartsLastRegenAt + regenCount * HEART_REGEN_MS
  return { ...state, hearts, heartsLastRegenAt }
}

export function GameProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => withHeartsRegen(loadProgress()))

  // מרעננים לבבות כשחוזרים לטאב, לא ברקע כל הזמן.
  useEffect(() => {
    function handleFocus() {
      setProgress((prev) => withHeartsRegen(prev))
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  function completeMission(missionId) {
    setProgress((prev) => {
      if (prev.completedMissionIds.includes(missionId)) return prev
      const next = { ...prev, completedMissionIds: [...prev.completedMissionIds, missionId] }
      saveProgress(next)
      return next
    })
  }

  // מזינים את תוצאת התשובה למערכות ❤️/⭐/🪙/🔥. אין קשר לפתיחת המשימה הבאה -
  // זו נשארת נפתחת גם על תשובה שגויה (completeMission נקרא בנפרד).
  function recordAnswer(correct) {
    setProgress((prev) => {
      const next = { ...prev }
      if (correct) {
        const streak = prev.streak + 1
        next.streak = streak
        next.bestStreak = Math.max(prev.bestStreak, streak)
        next.xp = prev.xp + XP_PER_CORRECT + (STREAK_BONUSES[streak] || 0)
        next.coins = prev.coins + COINS_PER_CORRECT
      } else {
        next.streak = 0
        next.hearts = Math.max(0, prev.hearts - 1)
      }
      saveProgress(next)
      return next
    })
  }

  function completeBoss(worldId) {
    setProgress((prev) => {
      if (prev.completedBossWorldIds.includes(worldId)) return prev
      const next = { ...prev, completedBossWorldIds: [...prev.completedBossWorldIds, worldId] }
      saveProgress(next)
      return next
    })
  }

  function isMissionCompleted(missionId) {
    return progress.completedMissionIds.includes(missionId)
  }

  // משימה פתוחה אם היא הראשונה בעולם, או שהמשימה שלפניה הושלמה.
  function isMissionUnlocked(world, missionId) {
    const index = world.missions.findIndex((m) => m.id === missionId)
    if (index <= 0) return true
    const previousMission = world.missions[index - 1]
    return isMissionCompleted(previousMission.id)
  }

  function allMissionsCompleted(world) {
    return world.missions.length > 0 && world.missions.every((m) => isMissionCompleted(m.id))
  }

  // הבוס נפתח רק אחרי שכל המשימות הרגילות בעולם הושלמו.
  function isBossUnlocked(world) {
    return Boolean(world.boss) && allMissionsCompleted(world)
  }

  function isBossCompleted(worldId) {
    return progress.completedBossWorldIds.includes(worldId)
  }

  function isWorldCompleted(world) {
    if (!allMissionsCompleted(world)) return false
    return world.boss ? isBossCompleted(world.id) : true
  }

  const value = useMemo(
    () => ({
      ...progress,
      completeMission,
      recordAnswer,
      completeBoss,
      isMissionCompleted,
      isMissionUnlocked,
      isBossUnlocked,
      isBossCompleted,
      isWorldCompleted,
    }),
    [progress],
  )

  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>
}

export function useGameProgress() {
  const ctx = useContext(GameProgressContext)
  if (!ctx) throw new Error('useGameProgress must be used within GameProgressProvider')
  return ctx
}
