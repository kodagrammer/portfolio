/**
 * "YYYY-MM" 두 날짜 사이의 총 개월 수를 반환한다 (시작월·종료월 모두 포함).
 */
function calcMonths(startDate, endDate) {
  const [startYear, startMonth] = startDate.split('-').map(Number)
  const [endYear, endMonth] = endDate.split('-').map(Number)
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1
}

function formatMonths(totalMonths) {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years === 0) return `${months}개월`
  if (months === 0) return `${years}년`
  return `${years}년 ${months}개월`
}

/**
 * "YYYY-MM" → "YYYY.MM" 형식으로 변환한다.
 */
export function formatYearMonth(dateStr) {
  if (!dateStr) return null
  const [year, month] = dateStr.split('-')
  return `${year}.${month}`
}

/**
 * "YYYY-MM" 형식 두 날짜 사이의 기간을 반환한다.
 * @returns {string} "N년 M개월" 또는 "M개월"
 */
export function calcDuration(startDate, endDate) {
  return formatMonths(calcMonths(startDate, endDate))
}

/**
 * workExperience 배열을 받아 총 경력 합산을 반환한다.
 * @returns {string} "N년 M개월" 또는 "M개월"
 */
export function calcTotalCareer(experiences) {
  const total = experiences.reduce(
    (sum, exp) => sum + calcMonths(exp.startDate, exp.endDate),
    0
  )
  return formatMonths(total)
}
