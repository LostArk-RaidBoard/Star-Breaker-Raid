'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const position = url.searchParams.get('posts_position')

  try {
    const res = await sql`SELECT * FROM raid_posts WHERE post_position = ${position}`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 201,
      headers: {
        'Cache-Control': 'public, max-age=300',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
