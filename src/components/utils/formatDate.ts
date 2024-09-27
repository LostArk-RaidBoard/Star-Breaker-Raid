export default function FormatDate(dateString: string) {
  if (!dateString) return 'Invalid Date'

  const date = new Date(dateString)

  // 날짜가 유효하지 않은 경우
  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  console.log('Parsed date:', date) // 여기에서 date 객체를 확인합니다.
  // 한국 시간으로 변환
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    timeZone: 'Asia/Seoul',
  }

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  const day = date.toLocaleDateString('ko-KR', optionsDate)
  const time = date.toLocaleTimeString('ko-KR', optionsTime)

  return `${day}, ${time}`
}
