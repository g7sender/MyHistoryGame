import { createContext, useContext, useMemo, useState } from 'react'
import { loadProgress, saveProgress } from './progressStorage.js'

const GameProgressContext = createContext(null)

export function GameProgressProvider({ children }) {
  const [completedMissionIds, setCompletedMissionIds] = useState(
    () => loadProgress().completedMissionIds,
  )

  function completeMission(missionId) {
    setCompletedMissionIds((prev) => {
      if (prev.includes(missionId)) return prev
      const next = [...prev, missionId]
      saveProgress({ completedMissionIds: next })
      return next
    })
  }

  function isMissionCompleted(missionId) {
    return completedMissionIds.includes(missionId)
  }

  // משימה פתוחה אם היא הראשונה בעולם, או שהמשימה שלפניה הושלמה.
  function isMissionUnlocked(world, missionId) {
    const index = world.missions.findIndex((m) => m.id === missionId)
    if (index <= 0) return true
    const previousMission = world.missions[index - 1]
    return isMissionCompleted(previousMission.id)
  }

  const value = useMemo(
    () => ({ completedMissionIds, completeMission, isMissionCompleted, isMissionUnlocked }),
    [completedMissionIds],
  )

  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>
}

export function useGameProgress() {
  const ctx = useContext(GameProgressContext)
  if (!ctx) throw new Error('useGameProgress must be used within GameProgressProvider')
  return ctx
}
