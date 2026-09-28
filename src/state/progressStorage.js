// שכבת אחסון להתקדמות השחקן, מגובה ב-localStorage כדי לשרוד רענון/סגירת דפדפן.

const STORAGE_KEY = 'history-game-progress'

function defaultState() {
  return {
    completedMissionIds: [],
    hearts: 3,
    heartsLastRegenAt: Date.now(),
    xp: 0,
    coins: 0,
    streak: 0,
    bestStreak: 0,
  }
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // אחסון לא זמין (מצב פרטי, quota וכו') - ממשיכים בלי לשבור את המשחק
  }
}
