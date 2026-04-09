import { useState } from 'react'
import { calcDuration, formatYearMonth } from '../utils/dateUtils'
import { parseBold } from '../utils/parseMarkdown'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-24 px-8">
      <div className="section-container">
        <p className="section-title mb-12">
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
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-primary-pale hover:bg-primary group transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary group-hover:text-white transition-colors">
                {open ? '기록 접기' : '기록 보기'}
              </span>
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary text-white group-hover:bg-white group-hover:text-primary transition-colors font-bold leading-none">
                {project.posts.length}
              </span>
            </div>
            <span
              className="text-primary group-hover:text-white text-lg font-bold transition-all duration-200 inline-block"
              style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              ›
            </span>
          </button>

          {open && (
            <ul className="mt-2 flex flex-col gap-1">
              {project.posts.map((post, idx) => {
                const hasLink = !!post.postPath
                return (
                  <li key={idx}>
                    {hasLink ? (
                      <a
                        href={`${window.location.origin}${window.location.pathname}#/posts/${post.postPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-primary-pale group/link transition-colors"
                      >
                        <span className="text-sm text-text-mid group-hover/link:text-primary transition-colors">{post.title}</span>
                        <span className="shrink-0 text-text-light group-hover/link:text-primary transition-colors">↗</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg opacity-60">
                        <span className="text-sm text-text-light">{post.title}</span>
                        <span className="shrink-0 text-xs text-text-light">(준비 중)</span>
                      </div>
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
