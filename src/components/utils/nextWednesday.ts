import { subDays, addDays } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
export default function nextWednesday() {
  // KST 현재 기준 다음주 수요일 찾기
  const timeZone = 'Asia/Seoul'
  const today = toZonedTime(new Date(), timeZone) // KST 시간으로 변환
  today.setHours(6)
  const todayDay = today.getDay()

  const baseWednesday =
    todayDay >= 3
      ? subDays(today, todayDay - 3) // 이번 주 수요일
      : subDays(today, todayDay + 4) // 지난 주 수요일

  const nextWednesday = addDays(baseWednesday, 7) // 다음 주 수요일
  const nextWednesdayDate = nextWednesday.toDateString()
  console.log('nextWednesday 날짜 : ' + nextWednesdayDate + ' 06:00')

  return nextWednesdayDate
}
