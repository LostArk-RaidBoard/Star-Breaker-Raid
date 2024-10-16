'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guideName = url.searchParams.get('raidGuide')

  try {
    if (guideName === 'all') {
      const res = await sql`SELECT * FROM raid_guide ORDER BY guide_id DESC`
      return new Response(JSON.stringify({ guideRows: res.rows }), { status: 201 })
    } else {
      const res =
        await sql`SELECT * FROM raid_guide WHERE guide_name  LIKE ${`%${guideName}%`} ORDER BY guide_id DESC`
      return new Response(JSON.stringify({ guideRows: res.rows }), {
        status: 201,
        headers: {
          'Cache-Control': 'public, max-age=3600', // 1시간
        },
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
