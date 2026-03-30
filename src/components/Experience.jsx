import { useState } from 'react'
import { calcDuration, calcTotalCareer, formatYearMonth } from '../utils/dateUtils'

export default function Experience({ workExperience }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selected = workExperience[selectedIdx]

  return (
    <section id="experience" className="py-24 px-8 bg-bg-alt">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-2xl font-bold tracking-[0.15em] uppercase text-primary mb-2 text-center">
          Work Experience
        </p>
        <p className="text-text-light text-base text-center mb-12">
          {calcTotalCareer(workExperience)}
        </p>

        {/* 데스크탑: 좌측 탭 + 우측 패널 */}
        <div className="hidden md:grid grid-cols-[260px_1fr] gap-6">
          {/* 탭 목록 */}
          <div className="flex flex-col gap-2">
            {workExperience.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`text-left px-4 py-3 rounded-xl border transition-all ${
                  selectedIdx === idx
                    ? 'bg-card border-primary shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-card hover:border-border'
                }`}
              >
                <p className={`font-semibold text-base ${selectedIdx === idx ? 'text-primary' : 'text-text'}`}>
                  {exp.company}
                </p>
                <p className="text-xs text-text-light mt-0.5">
                  {calcDuration(exp.startDate, exp.endDate)}
                </p>
              </button>
            ))}
          </div>

          {/* 상세 패널 */}
          <ExperienceDetail exp={selected} />
        </div>

        {/* 모바일: 가로 스크롤 탭 + 패널 */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
            {workExperience.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`shrink-0 px-4 py-2 rounded-xl border text-sm transition-all ${
                  selectedIdx === idx
                    ? 'bg-card border-primary text-primary shadow-sm'
                    : 'bg-transparent border-border text-text-mid'
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>
          <ExperienceDetail exp={selected} />
        </div>
      </div>
    </section>
  )
}

function ExperienceDetail({ exp }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-8">
      <div className="flex items-baseline gap-3 mb-1">
        <h3 className="font-sans text-xl text-text">
          {exp.company}
        </h3>
        <span className="text-xs text-text-light">
          | {formatYearMonth(exp.startDate)} ~ {exp.endDate ? formatYearMonth(exp.endDate) : '현재'}
        </span>
      </div>
      <p className="text-primary text-sm font-medium mb-4">
        {exp.department} · {exp.position}
      </p>
      <hr className="border-border mb-6" />
      <ul className="list-disc pl-5 flex flex-col gap-2">
        {exp.description.map((desc, i) => (
            <li key={i} className="text-text-mid text-sm leading-relaxed">
                {desc}
            </li>
        ))}
      </ul>
    </div>
  )
}
