import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const position = url.searchParams.get('posts_position')

  if (!position) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT 
          rp.*, 
          COUNT(DISTINCT CASE WHEN al.approval = true THEN al.user_id END) + 1 AS approval, 
          COUNT(DISTINCT CASE WHEN al.approval = false THEN al.user_id END) AS rejected_count,
          users.nickname 
      FROM 
          raid_posts rp
      LEFT JOIN 
          applicants_list al ON rp.post_id = al.post_id
 LEFT JOIN 
          users ON rp.user_id = users.user_id
      WHERE 
          (${position} = 'all' AND rp.post_position IN ('user', 'teacher')) OR 
          (rp.post_position = ${position} AND ${position} != 'all')
      GROUP BY 
          rp.post_id, users.nickname;
    `

    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
