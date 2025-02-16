import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guideId = url.searchParams.get('raidGuideId')

  if (!guideId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  try {
    const res = await sql`SELECT * FROM raid_guide WHERE guide_id = ${guideId} `

    return new Response(JSON.stringify({ guideRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
