import CheckGatewayConflict from '@/components/utils/CheckGatewayConflict'
import GetNextWednesday from '@/components/utils/GetNextWednesday'
import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const raid_gold = url.searchParams.get('raid_gold')
  const schedule_time = url.searchParams.get('schedule_time')
  const character_name = url.searchParams.get('character_name')
  const raid_name = url.searchParams.get('raid_name')
  const raid_gateway = url.searchParams.get('raid_gateway')
  const raid_level = url.searchParams.get('raid_level')
  const nextWednesdayDate = GetNextWednesday()

  if (
    !userId ||
    !raid_gold ||
    !schedule_time ||
    !character_name ||
    !raid_name ||
    !raid_gateway ||
    !raid_level
  ) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  // schedule_time을 ISO 형식으로 변환
  const formattedScheduleTime = new Date(
    new Date(schedule_time).getTime() - 9 * 60 * 60 * 1000,
  ).toISOString()

  try {
    const response =
      await sql`SELECT schedule.raid_gateway FROM schedule WHERE user_id = ${userId} AND character_name = ${character_name} AND raid_name = ${raid_name}  AND schedule_time < ${nextWednesdayDate + ' 06:00'} ;`

    // 기존 raid_gateway 값 리스트
    const existingGateways = response.rows.map((item) => item.raid_gateway)

    // 중복 확인 로직 (겹치는지 검사)
    const isDuplicate = existingGateways.some((existingGateway) =>
      CheckGatewayConflict(existingGateway, raid_gateway),
    )

    if (isDuplicate) {
      return new Response(JSON.stringify({ message: '중복' }), { status: 409 })
    }

    await sql`
       INSERT INTO schedule (user_id, schedule_time, raid_gold, character_name, raid_name, raid_level, raid_gateway) 
      VALUES (${userId}, ${formattedScheduleTime}, ${raid_gold}, ${character_name}, ${raid_name}, ${raid_level}, ${raid_gateway})
    `

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const character_name = url.searchParams.get('character_name')
  const raid_name = url.searchParams.get('raid_name')
  const raid_gateway = url.searchParams.get('raid_gateway')

  if (!userId || !character_name || !raid_name) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  try {
    await sql`
      DELETE FROM schedule WHERE user_id =${userId} AND character_name = ${character_name} AND raid_name = ${raid_name} AND raid_gateway = ${raid_gateway}
    `

    return new Response(JSON.stringify({ message: '삭제 성공' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
