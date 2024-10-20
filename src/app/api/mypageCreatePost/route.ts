'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userID = url.searchParams.get('user_id')
  if (!userID) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`SELECT * FROM raid_posts WHERE user_id = ${userID}`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 201,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const post_id = url.searchParams.get('post_id')

  try {
    const res = await sql`DELETE FROM raid_posts WHERE post_id = ${post_id}`

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 201,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
