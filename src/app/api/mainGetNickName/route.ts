'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  try {
    const res = await sql`SELECT users.nickname FROM users WHERE user_id = ${userId}`

    // 캐시 설정 추가
    const headers = new Headers()
    headers.set('Cache-Control', 'public, s-maxage=3600, max-age=3600, stale-while-revalidate')

    return new Response(JSON.stringify({ nickName: res.rows }), {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
