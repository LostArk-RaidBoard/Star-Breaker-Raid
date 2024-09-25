'use server'
import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  const userId = url.searchParams.get('userId')
  const characterName = url.searchParams.get('characterName')

  // 입력 값 검증
  if (!postId || !userId || !characterName) {
    return new Response(JSON.stringify({ message: '필수 파라미터가 누락되었습니다.' }), {
      status: 400,
    })
  }
  try {
    const res =
      await sql`UPDATE applicants_list SET character_check=true WHERE post_id=${postId} AND user_id=${userId} AND character_name=${characterName}`
    return new Response(JSON.stringify({ message: '성공' }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
