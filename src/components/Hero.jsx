import { useEffect, useRef, useState } from 'react'

const BOLD_PATTERN = /\*\*(.*?)\*\*/

/**
 * phrase를 { prefix, target, suffix } 로 분해한다.
 * 볼드 마커가 없으면 target === null.
 */
function parsePhraseForTyping(phrase) {
  const match = BOLD_PATTERN.exec(phrase)
  if (!match) return { prefix: phrase, target: null, suffix: '' }
  return {
    prefix: phrase.slice(0, match.index),
    target: match[1],
    suffix: phrase.slice(match.index + match[0].length),
  }
}

function TypingPhrase({ phrase }) {
  const { prefix, target, suffix } = parsePhraseForTyping(phrase)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!target) return

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < target.length) {
          setDisplayed(target.slice(0, displayed.length + 1))
          timeoutRef.current = setTimeout(tick, 70)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        // 한 번에 전체 삭제 후 바로 다시 타이핑 시작
        setDisplayed('')
        setIsDeleting(false)
      }
    }

    timeoutRef.current = setTimeout(tick, 70)
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, target])

  if (!target) {
    return <p className="text-sm md:text-base text-text-mid leading-relaxed">{prefix}</p>
  }

  return (
    <p className="text-sm md:text-base text-text-mid leading-relaxed">
      {prefix}
      {/* 전체 텍스트를 투명하게 렌더링해 공간을 고정하고, 타이핑 텍스트를 그 위에 absolute로 오버레이 */}
      <strong className="relative inline-block text-primary font-semibold">
        <span className="opacity-0 select-none whitespace-nowrap">{target}</span>
        <span className="absolute left-0 top-0 whitespace-nowrap">
          {displayed}
          <span
            className="inline-block w-0.5 h-4 ml-px bg-primary align-middle"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        </span>
      </strong>
      {suffix}
    </p>
  )
}

export default function Hero({ profile }) {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-20 px-8 overflow-hidden">
      {/* 배경 장식 */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }}
      />

      <div className="max-w-[1100px] mx-auto w-full pl-5">
        {/* 메인 타이틀 */}
        <h1 className="font-sans font-bold text-[clamp(1.2rem,3.5vw,2.4rem)] leading-snug md:leading-tight text-text mb-8">
          {profile.tagline} <br/>
          <span className="text-primary">{profile.name}</span> 입니다.
        </h1>

        {/* 모든 문장 노출, 볼드 부분만 타이핑 */}
        <div className="flex flex-col gap-2 mb-10" aria-live="polite" aria-atomic="false">
          {profile.typingPhrases.map((phrase, idx) => (
            <TypingPhrase key={idx} phrase={phrase} />
          ))}
        </div>
      </div>

    </section>
  )
}
