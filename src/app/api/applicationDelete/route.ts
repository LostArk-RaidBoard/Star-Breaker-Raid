'use sever'
import { sql } from '@vercel/postgres'

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const post_id = url.searchParams.get('post_id')
  const userId = url.searchParams.get('user_id')

  if (!post_id && !userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res =
      await sql`DELETE FROM applicants_list WHERE user_id = ${userId} AND post_id = ${post_id}`

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 201,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
