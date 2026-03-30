import { useState } from 'react'
import { formatYearMonth } from '../utils/dateUtils'

const BASE = import.meta.env.BASE_URL

export default function Education({ education }) {
  if (!education?.length) return null

  return (
    <section id="education" className="py-24 px-8 bg-bg-alt">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-2xl font-bold tracking-[0.15em] uppercase text-primary mb-12 text-center">
          Education
        </p>

        {/* 타임라인 */}
        <div className="relative">
          {/* 세로 라인: 모바일 left-6, 데스크탑 left-[144px] */}
          <div className="absolute left-6 md:left-[144px] top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {education.map((edu, idx) => {
              const startYM = formatYearMonth(edu.startDate)
              const endYM = edu.endDate ? formatYearMonth(edu.endDate) : '현재'

              return (
                <div key={idx} className="flex items-start gap-6">
                  {/* 데스크탑 전용: 좌측 날짜 + 상태 뱃지 */}
                  <div className="hidden md:flex flex-col items-end gap-1.5 w-24 shrink-0 pt-3">
                    <span className="text-xs text-text-light whitespace-nowrap">
                      {startYM} ~ {endYM}
                    </span>
                    <StatusBadge status={edu.status} />
                  </div>

                  {/* 노드 */}
                  <LogoNode logo={edu.logo} school={edu.school} />

                  {/* 카드 */}
                  <div className="relative bg-card border border-border rounded-2xl p-6 shadow-sm flex-1">
                    {/* 카드 왼쪽 화살표 */}
                    <div
                      className="absolute -left-2 top-4 w-0 h-0"
                      style={{
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: '8px solid',
                        borderRightColor: 'var(--color-border)',
                      }}
                    />
                    <div
                      className="absolute -left-[7px] top-4 w-0 h-0"
                      style={{
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: '8px solid white',
                      }}
                    />

                    {/* 학교명 */}
                    <h3 className="font-sans font-semibold text-text text-lg leading-tight mb-0.5">
                      {edu.school}
                    </h3>

                    {/* 학과 · 학위 */}
                    <p className="text-text-mid text-sm">
                      {edu.major} · {edu.degree}
                    </p>

                    {/* 모바일 전용: 기간 + 상태 뱃지 */}
                    <div className="md:hidden flex items-center gap-2 mt-1">
                      <span className="text-xs text-text-light whitespace-nowrap">
                        {startYM} ~ {endYM}
                      </span>
                      <StatusBadge status={edu.status} />
                    </div>

                    {/* achievements */}
                    {edu.achievements?.length > 0 && (
                      <ul className="mt-3 list-disc list-inside flex flex-col gap-1">
                        {edu.achievements.map((item, i) => (
                          <li key={i} className="text-text-mid text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoNode({ logo, school }) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <div className="w-12 h-12 rounded-full border-2 border-border bg-card flex items-center justify-center shadow-sm shrink-0 z-10">
      {logo && !logoFailed ? (
        <img
          src={`${BASE}${logo.replace(/^\//, '')}`}
          alt={school}
          className="w-7 h-7 object-contain"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span className="text-primary text-sm font-bold">{school[0]}</span>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        status === '재학중'
          ? 'bg-primary-pale text-primary'
          : 'bg-bg-alt text-text-light border border-border'
      }`}
    >
      {status}
    </span>
  )
}
