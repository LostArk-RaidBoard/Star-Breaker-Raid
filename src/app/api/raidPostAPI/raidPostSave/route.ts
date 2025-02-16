import CheckGatewayConflict from '@/components/utils/CheckGatewayConflict'
import { sql } from '@vercel/postgres'
import { subDays, addDays } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const raid_name = url.searchParams.get('raid_name')
  const raid_time = url.searchParams.get('raid_time')
  const limit_level = url.searchParams.get('limit_level')
  const user_id = url.searchParams.get('user_id')
  const post_position = url.searchParams.get('post_position')
  const noti = url.searchParams.get('noti')
  const character_name = url.searchParams.get('character_name')
  const character_classicon = url.searchParams.get('character_classicon')
  const raid_limitperson = url.searchParams.get('raid_limitperson')
  const raid_type = url.searchParams.get('raid_type')
  const raid_maxtime = url.searchParams.get('raid_maxtime')
  const character_image = url.searchParams.get('character_image')
  const raid_gold = url.searchParams.get('raid_gold')
  const raid_level = url.searchParams.get('raid_level')
  const raid_gateway = url.searchParams.get('raid_gateway')

  if (
    !raid_name ||
    !raid_time ||
    !limit_level ||
    !user_id ||
    !post_position ||
    !character_name ||
    !character_classicon ||
    !raid_limitperson ||
    !raid_type ||
    !raid_maxtime ||
    !character_image ||
    !raid_gold ||
    !raid_level ||
    !raid_gateway
  ) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
  const formattedScheduleTime = new Date(
    new Date(raid_time).getTime() - 9 * 60 * 60 * 1000,
  ).toISOString()

  const timeZone = 'Asia/Seoul'
  const thisday = toZonedTime(formattedScheduleTime, timeZone) // KST 시간으로 변환
  thisday.setHours(6)
  const todayDay = thisday.getDay()

  const baseWednesday =
    todayDay >= 3
      ? subDays(thisday, todayDay - 3) // 이번 주 수요일
      : subDays(thisday, todayDay + 4) // 지난 주 수요일

  const nextWednesday = addDays(baseWednesday, 7) // 다음 주 수요일
  const nextWednesdayDate = nextWednesday.toDateString()
  const baseWednesdayDate = baseWednesday.toDateString()

  try {
    console.log(nextWednesdayDate, baseWednesdayDate)
    const response =
      await sql`SELECT schedule.raid_gateway FROM schedule WHERE user_id = ${user_id} AND character_name = ${character_name} AND raid_name = ${raid_name}  AND schedule_time < ${nextWednesdayDate + ' 06:00'} AND schedule_time > ${baseWednesdayDate + ' 06:00'} ;`

    // 기존 raid_gateway 값 리스트
    const existingGateways = response.rows.map((item) => item.raid_gateway)

    // 중복 확인 로직 (겹치는지 검사)
    const isDuplicate = existingGateways.some((existingGateway) =>
      CheckGatewayConflict(existingGateway, raid_gateway),
    )

    if (isDuplicate) {
      return new Response(JSON.stringify({ message: '중복된 일정입니다.' }), {
        status: 409,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      })
    }

    await sql`
        INSERT INTO raid_posts (
          raid_name,
          raid_time,
          limit_level,
          user_id,
          post_position,
          noti,
          character_name,
          raid_limitperson,
          raid_type,
          raid_maxtime,
          character_classicon,
          character_image,
          raid_level,
          raid_gateway
        ) VALUES (
          ${raid_name},
          ${formattedScheduleTime},
          ${limit_level},
          ${user_id},
          ${post_position},
          ${noti},
          ${character_name},
          ${raid_limitperson},
          ${raid_type},
          ${raid_maxtime},
          ${character_classicon},
          ${character_image},
          ${raid_level},
          ${raid_gateway}
        )`

    await sql`
      INSERT INTO schedule(
           user_id,
           schedule_time,
           raid_gold,
           character_name,
           raid_name,
           raid_level,
           raid_gateway
          ) VALUES (
           ${user_id},
           ${formattedScheduleTime},
           ${raid_gold},
           ${character_name},
           ${raid_name},
           ${raid_level},
           ${raid_gateway}
          )
        `

    return new Response(JSON.stringify({ message: '레이드 생성 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
}
