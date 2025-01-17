import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT 
        h.*, 
        c.character_level 
      FROM 
        homework AS h
      LEFT JOIN 
        characters AS c
      ON 
        c.character_name = h.character_name 
      WHERE 
        h.user_id = ${userId};
    `

    const response = await sql`
      SELECT
        e.*
      FROM expedition AS e
      WHERE
        e.user_id = ${userId};
    `

    return new Response(JSON.stringify({ postRows: res.rows, expedition: response.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
