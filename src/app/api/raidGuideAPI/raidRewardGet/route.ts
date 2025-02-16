import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guideName = url.searchParams.get('raidGuideId')

  if (!guideName) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }

  try {
    const res = await sql`
        SELECT * FROM raid_rewards WHERE guide_id = ${guideName}
      `
    return new Response(JSON.stringify({ guideRows: res.rows }), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
}
