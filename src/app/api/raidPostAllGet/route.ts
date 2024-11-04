'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  try {
    const res = await sql`
      SELECT 
          rp.*, 
          COUNT(al.post_id) + 1 AS applicant_count
      FROM 
          raid_posts rp
      LEFT JOIN 
          applicants_list al ON rp.post_id = al.post_id
      GROUP BY 
          rp.post_id;
    `

    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
