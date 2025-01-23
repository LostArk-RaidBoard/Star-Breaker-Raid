import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
    SELECT sd.user_id, sd.schedule_time, sd.raid_gold, sd.raid_name, sd.character_name, sd.raid_level
    FROM schedule AS sd
    WHERE user_id = ${userId} 
      AND (schedule_time + INTERVAL '9 hours')::date = (CURRENT_TIMESTAMP + INTERVAL '9 hours')::date
    ORDER BY schedule_time;
    `

    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
