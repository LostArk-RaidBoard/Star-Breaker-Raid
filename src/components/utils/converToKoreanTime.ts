export const convertToKoreanTime = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: '2-digit',
    month: '2-digit', // 월 표시 (두 자리)
    day: '2-digit', // 일 표시 (두 자리)
    weekday: 'short', // 요일 표시
    hour: '2-digit', // 시 표시
    minute: '2-digit', // 분 표시
    hour12: false, // 24시간 형식
  })
}
