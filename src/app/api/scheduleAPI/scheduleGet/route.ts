import { sql } from '@vercel/postgres'
import nextWednesday from '@/components/utils/nextWednesday'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const nextWednesdayDate = nextWednesday()

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT 
        sd.user_id, 
        sd.schedule_time, 
        sd.raid_gold,
        sd.character_name,
        sd.raid_name,
        sd.gold_check,
        sd.raid_level,
        sd.raid_gateway
      FROM schedule AS sd 
      WHERE user_id=${userId} AND schedule_time < ${nextWednesdayDate + ' 06:00'} 
      ORDER BY schedule_time;`

    const response =
      await sql`SELECT character_name, character_level, server_name FROM characters WHERE user_id=${userId} ORDER BY character_level;`

    return new Response(JSON.stringify({ postRows: res.rows, characterName: response.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
