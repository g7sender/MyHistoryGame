// שכבת אחסון להתקדמות השחקן. כרגע ה"אחסון" הוא רק זיכרון תהליך (מתאפס ברענון).
// כשנרצה שמירה אמיתית (localStorage / שרת) - מספיק להחליף את שתי הפונקציות פה,
// בלי לגעת ב-GameProgressContext או ברכיבים שצורכים אותו.

let memoryState = { completedMissionIds: [] }

export function loadProgress() {
  return memoryState
}

export function saveProgress(state) {
  memoryState = state
}
