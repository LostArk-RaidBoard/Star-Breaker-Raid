import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const guideName = url.searchParams.get('raidGuide')
  const userId = url.searchParams.get('userId')

  if (!guideName) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    let res
    if (guideName === 'all') {
      res = await sql`
        SELECT raid_guide.*, 
               COUNT(DISTINCT like_guide.like_id) AS like_count
        FROM raid_guide
        LEFT JOIN like_guide 
          ON raid_guide.guide_id = like_guide.guide_id 
         AND like_guide.user_id = ${userId}
        GROUP BY raid_guide.guide_id
        ORDER BY raid_guide.guide_id DESC;
      `
    } else {
      res = await sql`
        SELECT raid_guide.*, 
               COUNT(DISTINCT like_guide.like_id) AS like_count
        FROM raid_guide
        LEFT JOIN like_guide 
          ON raid_guide.guide_id = like_guide.guide_id 
         AND like_guide.user_id = ${userId}
        WHERE guide_name LIKE ${`%${guideName}%`}
        GROUP BY raid_guide.guide_id
        ORDER BY raid_guide.guide_id DESC;
      `
    }

    return new Response(JSON.stringify({ guideRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
