import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }

  try {
    const res = await sql`
      SELECT sd.user_id, sd.schedule_time, sd.raid_gold, sd.raid_name, sd.character_name, sd.raid_level, cl.class_icon_url
    FROM schedule AS sd
    LEFT JOIN characters AS cl ON sd.character_name = cl.character_name
    WHERE sd.user_id = ${userId} 
      AND (schedule_time + INTERVAL '9 hours')::date = (CURRENT_TIMESTAMP + INTERVAL '9 hours')::date
    ORDER BY schedule_time
    LIMIT 10;
    `

    const data = JSON.stringify(res.rows)
    const etag = crypto.createHash('md5').update(data).digest('hex')

    const cookieStore = await cookies()
    const clientEtag =
      req.headers.get('if-none-match') ||
      (await cookies()).get(`mainMyScheduleETag-${userId}`)?.value

    if (clientEtag && clientEtag === etag) {
      return new Response(null, { status: 304 })
    }

    cookieStore.set(`mainMyScheduleETag-${userId}`, etag, {
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
