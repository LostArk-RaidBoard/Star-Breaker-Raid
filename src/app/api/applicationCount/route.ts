'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('post_id')

  if (!postId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    // 신청자 리스트 가져오기
    const response = await sql`SELECT * FROM applicants_list WHERE post_id = ${postId}`

    // 신청자의 수를 반환
    const applicantCount = response.rowCount

    return new Response(JSON.stringify({ count: applicantCount }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
