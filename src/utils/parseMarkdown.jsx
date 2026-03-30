/**
 * **볼드** 패턴을 primary 색상 + font-semibold로 렌더링한다.
 */
export function parseBold(text) {
  if (!text.includes('**')) return text
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-primary font-semibold">{part}</strong>
      : <span key={i}>{part}</span>
  )
}
