export default function FormatDate(dateString: string) {
  // 유효한 날짜인지 확인
  if (!dateString) return 'Invalid Date'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    timeZone: 'Asia/Seoul', // 한국 시간으로 변환
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
