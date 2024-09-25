'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')

  try {
    const res = await sql`SELECT * FROM applicants_list WHERE post_id=${postId}`
    return new Response(JSON.stringify({ result: res.rows }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
