import { addHours } from 'date-fns'
import { toZonedTime, formatInTimeZone } from 'date-fns-tz'

const koreanWeekdays = ['일', '월', '화', '수', '목', '금', '토']
const timeZone = 'Asia/Seoul'

const timezoneOffset = Number(process.env.TIMEZONE_OFFSET) || 0

export const convertToKoreanTime = (dateString: string) => {
  const converToKoreanTime = addHours(toZonedTime(dateString, timeZone), timezoneOffset)
  const formatDate = formatInTimeZone(converToKoreanTime, timeZone, 'yy. MM. dd.')
  const formatTime = formatInTimeZone(converToKoreanTime, timeZone, 'HH:mm')
  // 요일을 한국어로 변환
  const dayOfWeek = koreanWeekdays[converToKoreanTime.getDay()]
  return `${formatDate} (${dayOfWeek}) ${formatTime}`
}

export const converToKoranTime1 = (dateString: string) => {
  const date = addHours(new Date(dateString), timezoneOffset)
  const formatDate = formatInTimeZone(date, timeZone, 'yy. MM. dd.')
  const formatTime = formatInTimeZone(date, timeZone, 'HH:mm')
  // 요일을 한국어로 변환
  const dayOfWeek = koreanWeekdays[date.getDay()]
  return `${formatDate} (${dayOfWeek}) ${formatTime}`
}

export const convertToKoreanTime2 = (dateString: string) => {
  const converToKoreanTime = addHours(toZonedTime(dateString, timeZone), timezoneOffset)
  const formatTime = formatInTimeZone(converToKoreanTime, timeZone, 'HH:mm')
  const dayOfWeek = koreanWeekdays[converToKoreanTime.getDay()]
  return `(${dayOfWeek}) ${formatTime}`
}
