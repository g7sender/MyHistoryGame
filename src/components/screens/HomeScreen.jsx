import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { publicUrl } from '../../utils/publicUrl.js'
import { pageTransition } from '../ui/pageTransition.js'

export default function HomeScreen() {
  return (
    <motion.div {...pageTransition} className="flex min-h-full items-center justify-center bg-slate-950">
      <Link to="/map" aria-label="התחל מסע - מעבר למפת העולמות" className="block w-full">
        <img
          src={publicUrl('images/home-screen.png')}
          alt="מסע בזמן: משחק ההיסטוריה שלי - התחל מסע"
          className="h-auto w-full"
        />
      </Link>
    </motion.div>
  )
}
