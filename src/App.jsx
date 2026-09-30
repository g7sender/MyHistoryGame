import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import WorldsScreen from './components/screens/WorldsScreen.jsx'
import MissionBoard from './components/screens/MissionBoard.jsx'
import StoryScreen from './components/screens/StoryScreen.jsx'
import ChallengeScreen from './components/screens/ChallengeScreen.jsx'
import BossIntroScreen from './components/screens/BossIntroScreen.jsx'
import BossChallengeScreen from './components/screens/BossChallengeScreen.jsx'
import BossVictoryScreen from './components/screens/BossVictoryScreen.jsx'
import HistoryBookScreen from './components/screens/HistoryBookScreen.jsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-slate-950">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WorldsScreen />} />
          <Route path="/book" element={<HistoryBookScreen />} />
          <Route path="/world/:worldId" element={<MissionBoard />} />
          <Route path="/world/:worldId/mission/:missionId/story" element={<StoryScreen />} />
          <Route path="/world/:worldId/mission/:missionId/challenge" element={<ChallengeScreen />} />
          <Route path="/world/:worldId/boss" element={<BossIntroScreen />} />
          <Route path="/world/:worldId/boss/challenge" element={<BossChallengeScreen />} />
          <Route path="/world/:worldId/boss/victory" element={<BossVictoryScreen />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
