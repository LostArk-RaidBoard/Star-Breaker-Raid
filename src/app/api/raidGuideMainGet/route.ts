'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  try {
    let res
    if (!userId) {
      // userId가 없는 경우 모든 raid_guide 항목 반환
      res = await sql`
        SELECT * FROM raid_guide ORDER BY raid_guide.guide_id DESC
      `
    } else {
      // like_guide 테이블에서 userId에 해당하는 항목이 있는지 확인
      const response = await sql`
        SELECT * FROM like_guide WHERE like_guide.user_id = ${userId}
      `
      if (response.rowCount === 0) {
        // 해당 userId로 좋아요 한 항목이 없을 경우 전체 raid_guide 반환
        res = await sql`
          SELECT * FROM raid_guide ORDER BY raid_guide.guide_id DESC
        `
      } else {
        // userId가 좋아요한 raid_guide와 like_count 포함하여 반환
        res = await sql`
         SELECT raid_guide.*
          FROM raid_guide
          LEFT JOIN like_guide 
            ON raid_guide.guide_id = like_guide.guide_id 
           WHERE like_guide.user_id = ${userId}
          GROUP BY raid_guide.guide_id
          ORDER BY raid_guide.guide_id DESC;
        `
      }
    }

    return new Response(JSON.stringify({ guideRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error('서버 오류 발생:', error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), {
      status: 500,
    })
  }
}
