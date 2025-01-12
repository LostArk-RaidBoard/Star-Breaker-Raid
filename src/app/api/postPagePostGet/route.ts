import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')

  if (!postId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT raid_posts.*, users.nickname, characters.character_level
      FROM raid_posts 
      INNER JOIN users ON raid_posts.user_id  = users.user_id
      INNER JOIN characters ON raid_posts.character_name = characters.character_name
      WHERE post_id = ${postId}`

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
