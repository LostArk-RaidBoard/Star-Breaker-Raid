import { addHours } from 'date-fns'
import GetNextWednesday from '@/components/utils/GetNextWednesday'
import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// 요일 인덱스 설정 함수
function getKoreanDayIndex(): number {
  const currentDate = new Date()
  // UTC 기준 3시간을 더해 한국시간 6시를 기점으로 하루를 변경함
  const todayDate = addHours(currentDate, 3)
  // 요일 반환 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const day = todayDate.getDay()

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
  const nextWednesdayDate = GetNextWednesday()

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
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

    const data = JSON.stringify(res.rows[0] || {})
    const etag = crypto.createHash('md5').update(data).digest('hex')

    const cookieStore = await cookies()
    const clientEtag =
      req.headers.get('if-none-match') || cookieStore.get(`mainMyInfoETag-${userId}`)?.value

    // 데이터 변경이 없음 304 응답
    if (clientEtag && clientEtag === etag) {
      return new Response(null, { status: 304 })
    }
    // 데이터 변경, 새로운 데이터 쿠키에 저장
    cookieStore.set(`mainMyInfoETag-${userId}`, etag, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 86400, // 1일 유지
    })

    return new Response(JSON.stringify({ postRows: res.rows[0] }), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=10, stale-while-revalidate=15, must-revalidate',
        ETag: etag,
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
}
