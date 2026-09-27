import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { GameProgressProvider } from './state/GameProgressContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <GameProgressProvider>
        <App />
      </GameProgressProvider>
    </HashRouter>
  </React.StrictMode>,
)
