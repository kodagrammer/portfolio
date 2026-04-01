import { useState, useEffect } from 'react'
import data from './data/portfolio.json'

import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Footer from './components/Footer'
import PostViewer from './components/PostViewer'

function usePostRoute() {
  const [postSrc, setPostSrc] = useState(() => {
    const match = window.location.hash.match(/^#\/post\?src=(.+)/)
    return match ? decodeURIComponent(match[1]) : null
  })

  useEffect(() => {
    const onHashChange = () => {
      const match = window.location.hash.match(/^#\/post\?src=(.+)/)
      setPostSrc(match ? decodeURIComponent(match[1]) : null)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return postSrc
}

function App() {
  const postSrc = usePostRoute()

  if (postSrc) return <PostViewer postPath={postSrc} />

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
