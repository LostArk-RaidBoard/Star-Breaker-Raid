'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  if (!postId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`SELECT * FROM applicants_list WHERE post_id=${postId}`
    return new Response(JSON.stringify({ result: res.rows || [] }), { status: 200 })
  } catch (error) {
    console.error('Server Error application list get : ' + error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
