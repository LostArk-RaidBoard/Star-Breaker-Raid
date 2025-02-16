import { sql } from '@vercel/postgres'
import { hashPassword } from '@/components/utils/AuthSecurityUtils'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userName = url.searchParams.get('userName')
  const birthday = url.searchParams.get('birthday')

  if (!userName && !birthday) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }

  try {
    const res =
      await sql`SELECT user_id FROM users WHERE user_name = ${userName} and birthday = ${birthday}`

    if (res.rowCount === 0)
      return new Response(JSON.stringify({ message: '가입한 이력이 없습니다.' }), {
        status: 400,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      })

    return new Response(JSON.stringify({ message: '아이디 찾기 성공', userIdRow: res.rows }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '아이디 찾기 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
}

export async function POST(req: Request) {
  const { userId, userPassword } = await req.json()

  // 비밀번호 해시화
  const hashedPassword = await hashPassword(userPassword)

  try {
    const res = await sql`SELECT * FROM users WHERE user_id = ${userId}`
    if (res.rowCount === 0)
      return new Response(JSON.stringify({ message: '가입한 이력이 없습니다.' }), {
        status: 400,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      })

    await sql`UPDATE users SET password = ${hashedPassword}`

    return new Response(JSON.stringify({ message: '비밀번호 재설정 성공' }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '비밀번호 재설정 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
}
