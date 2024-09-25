export default function FormatDate(dateString: string) {
  const date = new Date(dateString)
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'short',
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
