import { useState } from 'react'
import { calcDuration, formatYearMonth } from '../utils/dateUtils'
import { parseBold } from '../utils/parseMarkdown'
const withBase = (path) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-24 px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-2xl font-bold tracking-[0.15em] uppercase text-primary mb-12 text-center">
          Projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)

  const companyLabel =
    project.type === 'personal' ? 'Personal Project' : project.company

  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4">
      {/* 상단: 회사명 / 기간 */}
      <div className="flex items-center justify-between text-xs text-text-light">
        <span>{companyLabel}</span>
        <span>
          {formatYearMonth(project.startDate)} ~ {project.endDate ? formatYearMonth(project.endDate) : '현재'}
          {' '}({calcDuration(project.startDate, project.endDate)})
        </span>
      </div>

      {/* 제목 */}
      <h3 className="font-semibold text-text text-base leading-snug">
        {project.title}
      </h3>

      {/* 설명 */}
      <p className="text-sm text-text-mid leading-relaxed line-clamp-3">
        {project.description}
        {project.note && (
          <span className="text-xs text-text-light italic"> ({project.note})</span>
        )}
      </p>

      {/* 기술 스택 배지 */}
      <div className="flex flex-wrap gap-1.5">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 text-xs rounded-md bg-primary-pale text-primary font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 기여 내용 */}
      {project.contributions?.length > 0 && (
        <ul className="list-disc pl-5 space-y-3">
          {project.contributions.map((item, i) => {
            const [title, content] = item.split(' | ')
            return (
              <li key={i}>
                <span className="font-semibold text-primary text-sm">{parseBold(title)}</span>
                {content && (
                  <p className="text-text-mid text-sm mt-0.5">{parseBold(content)}</p>
                )}
              </li>
            )
          })}
        </ul>
      )}

      {/* 기록 아코디언 */}
      {project.posts && project.posts.length > 0 && (
        <div className="border-t border-border pt-4">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm text-text-mid hover:text-primary transition-colors"
          >
            <span
              className="inline-block transition-transform duration-200"
              style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              ›
            </span>
            <span>{open ? '기록 접기' : '기록 보기'}</span>
          </button>

          {open && (
            <ul className="mt-3 flex flex-col gap-2">
              {project.posts.map((post, idx) => {
                const hasLink = !!post.postPath
                return (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    {hasLink ? (
                      <a href={withBase(post.postPath)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-left text-text-mid hover:text-primary transition-colors flex items-start gap-1">
                        <span>{post.title}</span>
                        <span className="shrink-0 text-text-light">↗</span>
                      </a>
                    ) : (
                      <span className="text-text-light flex items-start gap-1">
                        <span>{post.title}</span>
                        <span className="shrink-0 text-xs mt-0.5">(준비 중)</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
