'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userID = url.searchParams.get('user_id')
  if (!userID) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`SELECT * FROM raid_posts 
    WHERE post_id IN (SELECT post_id FROM applicants_list WHERE user_id = ${userID})`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
