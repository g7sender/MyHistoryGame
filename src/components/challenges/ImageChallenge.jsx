import { publicUrl } from '../../utils/publicUrl.js'
import MultipleChoiceChallenge from './MultipleChoiceChallenge.jsx'

export default function ImageChallenge({ challenge, onAnswered }) {
  return (
    <div className="flex flex-col gap-4">
      <img
        src={publicUrl(challenge.image)}
        alt={challenge.imageAlt || ''}
        className="max-h-64 w-full rounded-xl object-cover"
      />
      <MultipleChoiceChallenge challenge={challenge} onAnswered={onAnswered} />
    </div>
  )
}
