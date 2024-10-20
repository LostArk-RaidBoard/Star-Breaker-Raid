'use server'
import { sql } from '@vercel/postgres'

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`DELETE FROM users WHERE user_id=${userId}`

    return new Response(JSON.stringify({ message: '유저 삭제 성공' }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '유저 삭제 실패' }), { status: 500 })
  }
}
