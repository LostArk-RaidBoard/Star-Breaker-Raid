'use server'
import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const raid_gold = url.searchParams.get('raid_gold')
  const schedule_time = url.searchParams.get('schedule_time')

  const character_name = url.searchParams.get('character_name')
  const raid_name = url.searchParams.get('raid_name')

  if (!userId || !raid_gold || !schedule_time || !character_name || !raid_name) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  // schedule_time을 ISO 형식으로 변환
  const formattedScheduleTime = new Date(schedule_time).toISOString()

  try {
    const response =
      await sql`SELECT * FROM schedule WHERE user_id = ${userId} AND character_name = ${character_name} AND raid_name = ${raid_name}`
    if (response.rowCount != 0) {
      return new Response(JSON.stringify({ message: '중복' }), {
        status: 409,
      })
    }

    const res = await sql`
       INSERT INTO schedule (user_id, schedule_time, raid_gold, character_name, raid_name) 
      VALUES (${userId}, ${formattedScheduleTime}, ${raid_gold}, ${character_name}, ${raid_name})
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

  if (!userId || !character_name || !raid_name) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  try {
    const res = await sql`
      DELETE FROM schedule WHERE user_id =${userId} AND character_name = ${character_name} AND raid_name = ${raid_name}
    `

    return new Response(JSON.stringify({ message: '삭제 성공' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
