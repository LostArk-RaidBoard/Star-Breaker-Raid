'use sever'
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
    const res =
      await sql`SELECT * FROM schedule WHERE user_id=${userId} AND schedule_time < ${nextWednesdayDate + ' 06:00'} ORDER BY schedule_time;`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
