export function toCommaSeparated(value: string | number | undefined): string {
  if (value === undefined) return ""
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

export function formatKRW(v: number): string {

  if (v < 1_000_000) {
    // 100만 미만 → 단순 천단위 콤마
    return `${toCommaSeparated(v)}원`
  }

  const 만 = 10_000
  const 억 = 만 * 만
  const 조 = 억 * 만

  if (v < 억) {
    // 만 단위 이상 억 미만
    const 만단위 = Math.floor(v / 만)
    const 나머지 = v % 만
    return `${toCommaSeparated(만단위)}만${나머지 ? ` ${toCommaSeparated(나머지)}원` : "원"}`
  } else if (v < 조) {
    // 억 단위 이상 조 미만
    const 억단위 = Math.floor(v / 억)
    const 나머지 = Math.floor((v % 억) / 만)
    return `${toCommaSeparated(억단위)}억${나머지 ? ` ${toCommaSeparated(나머지)}만원` : ""}`
  } else {
    // 조 단위 이상
    const 조단위 = Math.floor(v / 조)
    const 나머지 = Math.floor((v % 조) / 억)
    return `${toCommaSeparated(조단위)}조${나머지 ? ` ${toCommaSeparated(나머지)}억원` : ""}`
  }

}



export function getCookie(name: string) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}