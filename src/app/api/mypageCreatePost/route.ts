'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userID = url.searchParams.get('user_id')

  if (!userID) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT 
        DISTINCT rp.*, 
        COUNT(DISTINCT CASE WHEN al.approval = true THEN al.user_id END) + 1 AS approval, 
    COUNT(DISTINCT CASE WHEN al.approval = false THEN al.user_id END) AS rejected_count
      FROM raid_posts rp 
      LEFT JOIN applicants_list al 
      ON rp.post_id = al.post_id 
      WHERE rp.user_id = ${userID} 
      GROUP BY rp.post_id;
    `
    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const post_id = url.searchParams.get('post_id')
  const character_name = url.searchParams.get('character_name')
  const user_id = url.searchParams.get('user_id')
  const raid_name = url.searchParams.get('raid_name')

  if (!post_id || !character_name || !user_id || !raid_name) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`DELETE FROM raid_posts WHERE post_id = ${post_id}`
    const response =
      await sql`DELETE FROM schedule WHERE user_id = ${user_id} AND raid_name = ${raid_name} AND character_name = ${character_name}`

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
