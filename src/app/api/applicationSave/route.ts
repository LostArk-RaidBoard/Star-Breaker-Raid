'use server'
import { sql } from '@vercel/postgres'

interface Application {
  user_id: string
  character_name: string
  hope: string
  post_id: number
  character_image: string
  character_icon: string
  character_elixir: number
  character_transcendence: number
  character_level: string
}

export async function POST(req: Request) {
  const application: Application = await req.json()

  // 입력 검증
  if (!application.user_id || !application.character_name || !application.post_id) {
    return new Response(JSON.stringify({ message: '필수 필드가 누락되었습니다.' }), { status: 400 })
  }
  try {
    const response =
      await sql`SELECT * FROM applicants_list WHERE post_id = ${application.post_id} AND user_id = ${application.user_id}`
    if (response.rowCount != 0) {
      return new Response(JSON.stringify({ message: '중복 레이드 신청입니다.' }), { status: 400 })
    } else {
      const res = await sql`
      INSERT INTO applicants_list (
        user_id,
        hope,
        post_id,
        character_name,
        character_image,
        character_icon,
        character_elixir,
        character_level,
        character_transcendence
      ) VALUES (
        ${application.user_id},
        ${application.hope},
        ${application.post_id},
        ${application.character_name},
        ${application.character_image},
        ${application.character_icon},
        ${application.character_elixir},
        ${application.character_level},
        ${application.character_transcendence}
      )`

      return new Response(JSON.stringify({ message: '지원 성공' }), { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
