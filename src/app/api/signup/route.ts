import { sql } from '@vercel/postgres'
import { hashPassword } from '@/components/utils/bcrypt'

export async function POST(req: Request) {
  const { userName, birthday, userEmail, userPassword } = await req.json()

  if (!userEmail && !userName && !birthday && !userPassword) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  // 비밀번호 해시화
  const hashedPassword = await hashPassword(userPassword)

  try {
    const res1 = await sql`SELECT * FROM users WHERE user_id = ${userEmail}`
    if (res1.rowCount !== 0) {
      return new Response(JSON.stringify({ message: '중복되는 Email 입니다.' }), { status: 400 })
    }

    await sql`INSERT INTO users (user_id, password, role_id, user_name, birthday) VALUES (${userEmail}, ${hashedPassword}, 3, ${userName}, ${birthday})`
    await sql`INSERT INTO expedition (user_id) VALUES ('${userEmail}');`
    return new Response(JSON.stringify({ message: '회원가입 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '회원가입 실패' }), { status: 500 })
  }
}
