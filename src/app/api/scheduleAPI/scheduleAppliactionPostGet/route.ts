import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userID = url.searchParams.get('user_id')
  if (!userID) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT DISTINCT
        raid_posts.post_id,
        raid_posts.raid_name,
        raid_posts.raid_time,
        raid_posts.character_name,   
        raid_posts.character_classicon,
        raid_posts.raid_level, 
        ap.approval AS approval,
        users.nickname
      FROM 
        raid_posts 
      INNER JOIN 
        applicants_list AS ap ON raid_posts.post_id = ap.post_id
      INNER JOIN
        users ON users.user_id = raid_posts.user_id
      WHERE 
        ap.user_id = ${userID};
      `

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
