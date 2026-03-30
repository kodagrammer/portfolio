import data from './data/portfolio.json'

import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero profile={data.profile} />
      <About about={data.about} profile={data.profile} />
      <Skills skills={data.skills} />
      <Experience workExperience={data.workExperience} />
      <Projects projects={data.projects} />
      <Education education={data.education} />
      <Footer profile={data.profile} />
    </div>
  )
}

export default App
