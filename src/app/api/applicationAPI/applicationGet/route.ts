import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  if (!postId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }

  try {
    const res = await sql`
      SELECT 
        al.applicants_id,
        al.user_id,
        al.character_name,
        al.hope,
        al.post_id,
        cl.character_level,
        cl.leap,
        cl.evolution,
        cl.enlightenment,
        cl.combat_power,
        al.character_icon,
        al.character_image,
        al.approval
      FROM applicants_list AS al
      LEFT JOIN characters AS cl ON 
        al.character_name = cl.character_name
      WHERE post_id=${postId}`
    return new Response(JSON.stringify({ result: res.rows || [] }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Server Error application list get : ' + error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
}
