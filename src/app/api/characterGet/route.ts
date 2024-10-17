'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  try {
    const res = await sql`SELECT * FROM characters WHERE user_id=${userId}`
    return new Response(JSON.stringify({ result: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
