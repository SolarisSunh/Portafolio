import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Aplica el tema almacenado o el predeterminado (oscuro morado aesthetic)
;(function applyInitialTheme() {
  try {
    const saved = localStorage.getItem('themeChoice')
    if (saved) {
      const choice = JSON.parse(saved) as { mode: 'dark' | 'light'; from: string; via: string; to: string }
      if (choice.mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      document.documentElement.style.setProperty('--bg-from', choice.from)
      document.documentElement.style.setProperty('--bg-via', choice.via)
      document.documentElement.style.setProperty('--bg-to', choice.to)
      return
    }
  } catch {}
  // Por defecto: oscuro + morado aesthetic
  document.documentElement.classList.add('dark')
  document.documentElement.style.setProperty('--bg-from', '#0b0b14')
  document.documentElement.style.setProperty('--bg-via', '#1a1027')
  document.documentElement.style.setProperty('--bg-to', '#3b0764')
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
