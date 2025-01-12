import nextWednesday from '@/components/utils/nextWednesday'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const nextWednesdayDate = nextWednesday()

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
 SELECT
    users.user_id,
    roles.role,
    COUNT(DISTINCT characters.character_name) AS character_count,
    SUM(CASE WHEN schedule.gold_check = TRUE THEN schedule.raid_gold ELSE 0 END) AS raid_gold,
    COUNT(DISTINCT CASE WHEN schedule.gold_check = TRUE THEN CONCAT(schedule.character_name, '-', schedule.raid_name) END) AS schedule_count,
    COUNT(DISTINCT applicants_list.user_id) AS applicant_count,
    COUNT(DISTINCT raid_posts.post_id) AS raid_post_count 
FROM
    users
LEFT JOIN
    roles ON users.role_id = roles.role_id
LEFT JOIN
    characters ON users.user_id = characters.user_id
LEFT JOIN
    schedule ON characters.character_name = schedule.character_name AND schedule.schedule_time < ${nextWednesdayDate + ' 06:00'} 
LEFT JOIN
    applicants_list ON users.user_id = applicants_list.user_id
LEFT JOIN
    raid_posts ON applicants_list.post_id = raid_posts.post_id
WHERE
    users.user_id = ${userId} 
GROUP BY
    users.user_id, roles.role;
    `

    return new Response(JSON.stringify({ postRows: res.rows[0] }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
