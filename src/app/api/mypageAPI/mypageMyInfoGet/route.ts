import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }

  try {
    const res = await sql`SELECT
users.user_id,
users.user_name,
users.birthday,
users.nickname,
roles.role,
COUNT(DISTINCT applicants_list.applicants_id) AS applicants_count,
SUM(DISTINCT CASE WHEN applicants_list.approval = TRUE THEN 1 ELSE 0 END) AS applicants_approval,
COUNT(DISTINCT raid_posts.post_id) AS raid_posts_count,
COUNT(DISTINCT characters.character_name) AS character_count
FROM
users
LEFT JOIN
roles ON users.role_id = roles.role_id
LEFT JOIN
applicants_list ON users.user_id = applicants_list.user_id
LEFT JOIN
raid_posts ON users.user_id = raid_posts.user_id
LEFT JOIN
characters ON users.user_id = characters.user_id
WHERE
users.user_id = ${userId}
GROUP BY
users.user_id, roles.role;`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
}
