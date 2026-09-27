import { Route, Routes } from 'react-router-dom'
import WorldsScreen from './components/screens/WorldsScreen.jsx'
import MissionBoard from './components/screens/MissionBoard.jsx'
import StoryScreen from './components/screens/StoryScreen.jsx'
import ChallengeScreen from './components/screens/ChallengeScreen.jsx'

export default function App() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-slate-950">
      <Routes>
        <Route path="/" element={<WorldsScreen />} />
        <Route path="/world/:worldId" element={<MissionBoard />} />
        <Route path="/world/:worldId/mission/:missionId/story" element={<StoryScreen />} />
        <Route path="/world/:worldId/mission/:missionId/challenge" element={<ChallengeScreen />} />
      </Routes>
    </div>
  )
}
