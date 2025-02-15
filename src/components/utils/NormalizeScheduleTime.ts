import { format, parse, subHours } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 다양한 날짜 형식을 `YYYY-MM-DD HH:mm:ss` 포맷으로 변환 + 9시간 차감
 */
export default function NormalizeScheduleTime(schedule: string): string {
  try {
    // ✅ 이미 DB 포맷이면 9시간 빼기
    if (schedule.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      return format(subHours(new Date(schedule), 9), 'yyyy-MM-dd HH:mm:ss')
    }

    // ✅ `GMT` 포함된 경우 9시간 빼기
    if (schedule.includes('GMT')) {
      return format(subHours(new Date(schedule), 9), 'yyyy-MM-dd HH:mm:ss')
    }

    // ✅ `25. 02. 15. (금) 00:15` 같은 형식 처리 후 9시간 빼기
    if (schedule.match(/^\d{2}\. \d{2}\. \d{2}\./)) {
      const parsedDate = parse(schedule, 'yy. MM. dd. (E) HH:mm', new Date(), { locale: ko })
      return format(subHours(parsedDate, 9), 'yyyy-MM-dd HH:mm:ss')
    }

    throw new Error('Invalid schedule format')
  } catch (error) {
    console.error('날짜 변환 실패:', error)
    return ''
  }
}
