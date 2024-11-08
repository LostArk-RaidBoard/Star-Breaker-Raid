'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT
rp.*,
al.character_check AS approval,
COUNT(al2.post_id) + 1 AS applicant_count
FROM
raid_posts rp
LEFT JOIN
applicants_list al ON rp.post_id = al.post_id AND al.user_id = ${userId}
LEFT JOIN
applicants_list al2 ON rp.post_id = al2.post_id

WHERE
rp.user_id = ${userId} OR
EXISTS (
SELECT 1
FROM applicants_list
WHERE user_id = ${userId} AND post_id = rp.post_id
)
GROUP BY
rp.post_id, al.character_check
    `

    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
