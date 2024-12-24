'use sever'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userID = url.searchParams.get('user_id')
  if (!userID) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`SELECT DISTINCT
        raid_posts.*, 
        applicants_list.approval AS approval
      FROM 
        raid_posts 
      INNER JOIN 
        applicants_list ON raid_posts.post_id = applicants_list.post_id
      WHERE 
        EXISTS (
          SELECT 1 
          FROM applicants_list 
          WHERE user_id = ${userID} AND post_id = raid_posts.post_id
        )`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
