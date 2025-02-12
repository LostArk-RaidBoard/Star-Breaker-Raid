import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guideName = url.searchParams.get('raidGuideId')

  if (!guideName) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
        SELECT * FROM raid_rewards WHERE guide_id = ${guideName}
      `

    return new Response(JSON.stringify({ guideRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
