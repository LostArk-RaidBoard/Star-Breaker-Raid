import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const guideId = url.searchParams.get('guide_id')
  const userId = url.searchParams.get('userId')

  if (!guideId || !userId) {
    return new Response(JSON.stringify({ message: '가이드아이디 또는 유저아이디가 없습니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }

  try {
    const res = await sql`
      SELECT * FROM like_guide 
      WHERE guide_id = ${guideId} 
      AND user_id = ${userId}
    `

    let responseMessage = ''

    if (res.rowCount === 0) {
      // 좋아요 추가
      await sql`
        INSERT INTO like_guide(user_id, guide_id) 
        VALUES (${userId}, ${guideId})
      `
      responseMessage = '좋아요가 추가되었습니다.'
    } else {
      // 좋아요 삭제
      await sql`
        DELETE FROM like_guide 
        WHERE user_id = ${userId} 
        AND guide_id = ${guideId}
      `
      responseMessage = '좋아요가 삭제되었습니다.'
    }

    return new Response(JSON.stringify({ message: responseMessage }), {
      status: 200,
    })
  } catch (error) {
    console.error('서버 오류 발생:', error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
}
