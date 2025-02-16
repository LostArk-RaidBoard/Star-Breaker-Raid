import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function GET(req: Request) {
  try {
    const res = await sql`
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
          rp.post_position = 'teacher' 
      GROUP BY 
          rp.post_id, users.nickname
      HAVING 
        COUNT(DISTINCT CASE WHEN al.approval = true THEN al.user_id END) + 1 != rp.raid_limitperson
      ORDER BY rp.post_id DESC
      LIMIT 5;
    `

    const data = JSON.stringify(res.rows)
    const etag = crypto.createHash('md5').update(data).digest('hex')

    const cookieStore = await cookies()
    const clientEtag =
      req.headers.get('if-none-match') || (await cookies()).get(`mainTeacherPostETag`)?.value

    if (clientEtag && clientEtag === etag) {
      return new Response(null, { status: 304 })
    }

    cookieStore.set(`mainTeacherPostETag`, etag, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 86400, // 1일 유지
    })

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=10, must-revalidate',
        ETag: etag,
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
