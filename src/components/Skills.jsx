// skill명 → simpleicons slug 또는 이모지 매핑
const SKILL_ICON_MAP = {
  'Java':                      { type: 'emoji', value: '☕' },
  'C#':                        { type: 'emoji', value: '#️⃣' },
  'Spring Boot':               { type: 'icon', slug: 'springboot' },
  'Spring Batch':              { type: 'icon', slug: 'spring' },
  '.NET':                      { type: 'icon', slug: '.net' },
  'Mybatis':                   { type: 'emoji', value: '🗃️' },
  'MySQL':                     { type: 'icon', slug: 'mysql' },
  'Oracle':                    { type: 'emoji', value: '🛢️' },
  'Linux':                     { type: 'icon', slug: 'linux' },
  'Git':                       { type: 'icon', slug: 'git' },
  'Confluence/Jira':           { type: 'icon', slug: 'jira' },
  'Claude Code':               { type: 'icon', slug: 'anthropic' },
  'Kotlin':                    { type: 'icon', slug: 'kotlin' },
  'AI Workflow Optimization':  { type: 'emoji', value: '🧠' },
}

function SkillIcon({ skill }) {
  const entry = SKILL_ICON_MAP[skill]
  if (!entry) return null

  if (entry.type === 'emoji') {
    return <span className="text-sm leading-none" aria-hidden="true">{entry.value}</span>
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${entry.slug}`}
      alt=""
      aria-hidden="true"
      className="w-4 h-4 opacity-50 group-hover:opacity-80 transition-opacity"
    />
  )
}

export default function Skills({ skills }) {
  if (!skills) return null

  return (
    <section id="skills" className="py-24 px-8">
      <div className="section-container">
        <p className="section-title mb-12">
          Skills
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-text-light">
                {category}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="group flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-bg-alt border border-border text-text-mid hover:bg-primary-pale hover:border-primary hover:text-primary-dark transition-colors cursor-default"
                  >
                    <SkillIcon skill={skill} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
