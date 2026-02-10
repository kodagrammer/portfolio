import { useEffect, useState } from 'react'
import resume from './data/resume.json'

import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen">
      <DarkModeToggle dark={dark} toggle={() => setDark(!dark)} />

      <Hero profile={resume.profile} />
      <About about={resume.about} />
      <Skills skills={resume.skills} />
      <Experience workExperience={resume.workExperience} />
      <Projects projects={resume.projects} />
    </div>
  )
}

export default App

