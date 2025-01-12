import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user_id')
  const nickName = url.searchParams.get('nickName')

  if (!userId || !nickName) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  try {
    // 닉네임 중복 체크
    const res = await sql`SELECT * FROM users WHERE users.nickname = ${nickName}`
    if (res.rowCount !== 0) {
      return new Response(JSON.stringify({ message: '중복된 닉네임이 있습니다.' }), {
        status: 200,
      })
    }

    // 닉네임 업데이트
    await sql`UPDATE users SET nickname = ${nickName} WHERE user_id = ${userId}`
    return new Response(JSON.stringify({ message: '설정 완료' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
