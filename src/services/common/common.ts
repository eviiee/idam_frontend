export function toCommaSeparated(value: string | number | undefined): string {
    if (!value) return ""
    const num = typeof value === 'number' ? value : parseFloat(value.replace(/,/g, ''))
    if (isNaN(num)) return '' // 숫자로 변환 불가한 경우 빈 문자열 반환
    return num.toLocaleString() // 쉼표 포맷 적용
}

export function toYYMMDD(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return '' // 유효하지 않은 날짜 문자열이면 빈 문자열 반환
  }

  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작
  const dd = String(date.getDate()).padStart(2, '0')

  return yy + mm + dd;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}` // 모든 쿠키 앞에 세미콜론 붙이기
  const parts = value.split(`; ${name}=`) // 찾고자 하는 이름으로 분리
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return null
}
