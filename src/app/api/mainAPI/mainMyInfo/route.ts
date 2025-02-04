import nextWednesday from '@/components/utils/nextWednesday'
import { sql } from '@vercel/postgres'

// 요일 인덱스 설정 함수
function getKoreanDayIndex(): number {
  const currentDate = new Date()
  // UTC 기준 9시간을 더해 한국 시간으로 변환

  // 요일 반환 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const day = currentDate.getDay()

  // 요일에 따른 인덱스 반환
  // 수요일이 1부터 시작하도록 설정
  const dayIndexMap: Record<number, number> = {
    0: 5, // 일요일: 인덱스 5
    1: 6, // 월요일: 인덱스 6
    2: 7, // 화요일: 인덱스 7
    3: 1, // 수요일: 인덱스 1
    4: 2, // 목요일: 인덱스 2
    5: 3, // 금요일: 인덱스 3
    6: 4, // 토요일: 인덱스 4
  }

  return dayIndexMap[day]
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const nextWednesdayDate = nextWednesday()

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    // 한국 기준 요일 인덱스
    const koreanDayIndex = getKoreanDayIndex()

    const res = await sql`
 SELECT
    users.user_id,
    roles.role,
    COUNT(DISTINCT characters.character_name) AS character_count,
    SUM(CASE WHEN schedule.gold_check = TRUE THEN schedule.raid_gold ELSE 0 END) AS raid_gold,
    COUNT(DISTINCT CASE WHEN schedule.gold_check = TRUE THEN CONCAT(schedule.character_name, '-', schedule.raid_name) END) AS schedule_count,
     expedition.gathering[${koreanDayIndex}],
    expedition.wisdom[${koreanDayIndex}],
    expedition.daycontent[${koreanDayIndex}]
FROM
    users
LEFT JOIN
    roles ON users.role_id = roles.role_id
LEFT JOIN
    characters ON users.user_id = characters.user_id
LEFT JOIN
    schedule ON characters.character_name = schedule.character_name AND schedule.schedule_time < ${nextWednesdayDate + ' 06:00'}
LEFT JOIN
  expedition ON users.user_id = expedition.user_id
WHERE
    users.user_id = ${userId} 
GROUP BY
    users.user_id, roles.role, expedition.user_id;
    `

    return new Response(JSON.stringify({ postRows: res.rows[0] }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
