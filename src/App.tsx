import './index.css'
import { Navbar } from './components/ui/navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Education } from './sections/Education'
import { Contact } from './sections/Contact'

function App() {

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* Vista general de tecnologías al inicio */}
      <Skills />
      <About />
      <Projects />
      <Education />
      <Contact />
      <footer className="py-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Tu Nombre. Construido con React + Tailwind.
      </footer>
    </main>
  )
}

export default App
