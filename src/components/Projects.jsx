import { useState } from 'react'
import ProjectModal from './ProjectModal'
import resume from '../data/resume.json'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="grid gap-6">
        {resume.projects.map(project => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="p-6 border rounded-xl text-left hover:bg-gray-50 dark:hover:bg-dark-card"
          >
            <h3 className="text-xl font-semibold">
              {project.thumbnail} {project.title}
            </h3>
            <p className="text-sm text-gray-500">{project.summary}</p>
          </button>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

