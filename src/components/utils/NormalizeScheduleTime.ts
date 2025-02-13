import { format, parse } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 다양한 날짜 형식을 `YYYY-MM-DD HH:mm:ss` 포맷으로 변환
 */
export default function NormalizeScheduleTime(schedule: string): string {
  try {
    // ✅ 1. ISO 형식인지 확인 (DB 저장된 날짜와 같은 포맷인지)
    if (schedule.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      return schedule // 이미 DB 포맷이라면 그대로 반환
    }

    // ✅ 2. `Sat Feb 15 2025 00:15:00 GMT+0900 (한국 표준시)` 처리
    if (schedule.includes('GMT')) {
      const date = new Date(schedule) // 자동 변환됨
      return format(date, 'yyyy-MM-dd HH:mm:ss') // DB 형식으로 변환
    }

    // ✅ 3. `25. 02. 15. (금) 00:15` 형태 처리
    if (schedule.match(/^\d{2}\. \d{2}\. \d{2}\./)) {
      const parsedDate = parse(schedule, 'yy. MM. dd. (E) HH:mm', new Date(), { locale: ko })
      return format(parsedDate, 'yyyy-MM-dd HH:mm:ss') // 변환 후 반환
    }

    // ✅ 4. 예외 처리 (지원되지 않는 형식)
    throw new Error('Invalid schedule format')
  } catch (error) {
    console.error('날짜 변환 실패:', error)
    return '' // 오류가 발생하면 빈 문자열 반환
  }
}
