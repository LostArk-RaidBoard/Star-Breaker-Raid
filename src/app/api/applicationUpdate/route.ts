'use server'
import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  const userId = url.searchParams.get('userId')
  const characterName = url.searchParams.get('characterName')
  const characterCheck = url.searchParams.get('characterCheck')

  // 입력 값 검증
  if (!postId || !userId || !characterName || !characterCheck) {
    console.log('필수 파라미터가 누락되었습니다.')
    return new Response(JSON.stringify({ message: '필수 파라미터가 누락되었습니다.' }), {
      status: 400,
    })
  }
  console.log(characterCheck)
  let check = ''

  if (characterCheck === 'true') {
    check = 'false'
  } else {
    check = 'true'
  }

  try {
    const res =
      await sql`UPDATE applicants_list SET approval=${check} WHERE post_id=${postId} AND user_id=${userId} AND character_name=${characterName}`
    return new Response(JSON.stringify({ message: '성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
