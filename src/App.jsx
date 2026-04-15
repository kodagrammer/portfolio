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
  const base = import.meta.env.BASE_URL ?? '/portfolio/'
  const getSlug = (pathname) => {
    const match = pathname.match(new RegExp(`^${base}posts/(.+?)/?$`))
    return match ? match[1] : null
  }

  const [slug, setSlug] = useState(() => {
    if (typeof window === 'undefined') {
      return getSlug(globalThis.__SSR_URL__ ?? '/')
    }
    return getSlug(window.location.pathname)
  })

  useEffect(() => {
    const onPopState = () => setSlug(getSlug(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return slug
}

function resolvePostPath(slug) {
  for (const project of data.projects) {
    for (const post of project.posts || []) {
      if (post.slug === slug || post.postPath === slug) {
        return `posts/${post.postPath}.md`
      }
    }
  }
  return null
}

function App() {
  const slug = usePostRoute()
  const postPath = slug ? resolvePostPath(slug) : null

  if (postPath) return <PostViewer postPath={postPath} />

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
