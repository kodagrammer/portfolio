import React from 'react'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-dark-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        {/* 헤더 */}
        <header className="mb-6">
          <h2 className="text-2xl font-bold">
            {project.thumbnail} {project.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {project.company} · {project.period}
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {project.summary}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags?.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 기본 정보 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Info label="역할" value={project.role} />
          <Info label="팀 구성" value={project.teamSize} />
          <Info label="기여 내용" value={project.myContribution} />
        </section>

        {/* 배경 */}
        {project.background && (
          <Section title="프로젝트 배경">
            <p>{project.background}</p>
          </Section>
        )}

        {/* 문제 */}
        {project.challenges?.length > 0 && (
          <Section title="문제점">
            <ul className="space-y-3">
              {project.challenges.map((c, idx) => (
                <li key={idx}>
                  <p className="font-semibold">• {c.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {c.description}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 해결 */}
        {project.solutions?.length > 0 && (
          <Section title="해결 방법">
            <ul className="space-y-4">
              {project.solutions.map((s, idx) => (
                <li key={idx}>
                  <p className="font-semibold">• {s.title}</p>
                  <p className="text-sm">{s.description}</p>
                  {s.techDetails && (
                    <p className="text-xs text-gray-500 mt-1">
                      {s.techDetails}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 결과 */}
        {project.results?.length > 0 && (
          <Section title="성과">
            <ul className="space-y-2">
              {project.results.map((r, idx) => (
                <li key={idx} className="text-sm">
                  <strong>{r.metric}</strong> : {r.before} → {r.after} (
                  {r.improvement})
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 배운 점 */}
        {project.learned?.length > 0 && (
          <Section title="배운 점">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {project.learned.map((l, idx) => (
                <li key={idx}>{l}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  )
}

function Info({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

