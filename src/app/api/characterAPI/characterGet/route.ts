import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }

  try {
    const res = await sql`SELECT * FROM characters WHERE user_id=${userId}`

    // JSON 응답 생성
    const jsonResponse = JSON.stringify({ result: res.rows })

    // Response 객체 생성
    const response = new Response(jsonResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 설정
      },
    })

    return response
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
}
