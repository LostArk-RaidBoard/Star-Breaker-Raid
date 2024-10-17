'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guideName = url.searchParams.get('raidGuide')

  try {
    let res
    if (guideName === 'all') {
      res = await sql`SELECT * FROM raid_guide ORDER BY guide_id DESC`
    } else {
      res =
        await sql`SELECT * FROM raid_guide WHERE guide_name  LIKE ${`%${guideName}%`} ORDER BY guide_id DESC`
    }
    // 캐시 설정 추가
    const headers = new Headers()
    headers.set('Cache-Control', 's-maxage=3600, max-age=3600 stale-while-revalidate')
    return new Response(JSON.stringify({ guideRows: res.rows }), {
      status: 201,
      headers,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
