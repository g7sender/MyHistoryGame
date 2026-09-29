import MultipleChoiceChallenge from './MultipleChoiceChallenge.jsx'
import TimelineOrderChallenge from './TimelineOrderChallenge.jsx'
import MatchingChallenge from './MatchingChallenge.jsx'
import ImageChallenge from './ImageChallenge.jsx'
import MapLocationChallenge from './MapLocationChallenge.jsx'
import WhoAmIChallenge from './WhoAmIChallenge.jsx'
import SpeedChoiceChallenge from './SpeedChoiceChallenge.jsx'

// ChallengeScreen (משימה רגילה) ו-BossChallengeScreen (אתגר הבוס) חולקים את אותו מיפוי
// challenge.type -> קומפוננטה, כדי שכל סוגי השאלות יעבדו זהה בשני ההקשרים.
export const CHALLENGE_COMPONENTS = {
  'multiple-choice': MultipleChoiceChallenge,
  'timeline-order': TimelineOrderChallenge,
  matching: MatchingChallenge,
  image: ImageChallenge,
  'map-location': MapLocationChallenge,
  'who-am-i': WhoAmIChallenge,
  'speed-choice': SpeedChoiceChallenge,
}

export function getChallengeComponent(challenge) {
  return CHALLENGE_COMPONENTS[challenge.type || 'multiple-choice']
}
