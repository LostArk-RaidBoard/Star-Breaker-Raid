import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const search = url.searchParams.get('search')

  if (!search) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    let res
    if (search === 'all') {
      res = await sql`
      SELECT 
          rp.post_id,
          rp.raid_name,
          rp.post_position,
          rp.raid_time,
          rp.raid_type,
          rp.raid_level,
          rp.raid_gateway,
          rp.raid_limitperson,
          rp.character_name,
          rp.character_classicon,
          COUNT(DISTINCT CASE WHEN al.approval = true THEN al.user_id END) + 1 AS approval, 
          COUNT(DISTINCT CASE WHEN al.approval = false THEN al.user_id END) AS rejected_count,
          users.nickname 
      FROM 
          raid_posts rp
      LEFT JOIN 
          applicants_list al ON rp.post_id = al.post_id
      LEFT JOIN 
          users ON rp.user_id = users.user_id
      GROUP BY 
          rp.post_id, users.nickname
      ORDER BY 
          rp.raid_time ASC;
    `
    } else {
      res = await sql`
      SELECT 
          rp.post_id,
          rp.raid_name,
          rp.post_position,
          rp.raid_time,
          rp.raid_type,
          rp.raid_level,
          rp.raid_gateway,
          rp.raid_limitperson,
          rp.character_name,
          rp.character_classicon,
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
          (
          rp.raid_name ILIKE ${'%' + search + '%'}
          OR rp.raid_type ILIKE ${'%' + search + '%'}
          OR rp.character_name ILIKE ${'%' + search + '%'}
          OR users.nickname ILIKE ${'%' + search + '%'}
          OR rp.post_position ILIKE ${'%' + search + '%'}
          OR rp.raid_level ILIKE ${'%' + search + '%'}
          OR rp.raid_gateway ILIKE ${'%' + search + '%'}
        )
      GROUP BY 
          rp.post_id, users.nickname
      ORDER BY 
          rp.raid_time ASC;
    `
    }

    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
