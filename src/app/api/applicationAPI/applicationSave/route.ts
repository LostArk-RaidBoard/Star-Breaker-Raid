import { sql } from '@vercel/postgres'

interface Application {
  user_id: string
  character_name: string
  hope: string
  post_id: number
  character_image: string
  character_icon: string
  raid_name: string
  raid_level: string
  raid_gateway: string
  raid_gold: number
  schedule: Date | null | string // 문자열이거나 null일 수도 있으므로 추가
}

export async function POST(req: Request) {
  const application: Application = await req.json()

  // 입력 검증
  if (!application.user_id || !application.character_name || !application.post_id) {
    return new Response(JSON.stringify({ message: '필수 필드가 누락되었습니다.' }), { status: 400 })
  }
  try {
    let raidTime: string | null = null

    // raid_time이 Date 객체인지 확인 후 처리
    if (application.schedule instanceof Date) {
      // Date 객체라면 TIMESTAMP 형식으로 변환
      raidTime = application.schedule.toISOString().slice(0, 19).replace('T', ' ')
    } else if (typeof application.schedule === 'string') {
      // 문자열로 넘어온 경우 그대로 사용
      raidTime = application.schedule
    }
    const response =
      await sql`SELECT * FROM applicants_list WHERE post_id = ${application.post_id} AND user_id = ${application.user_id}`
    if (response.rowCount != 0) {
      return new Response(JSON.stringify({ message: '중복 레이드 신청입니다.' }), { status: 400 })
    } else {
      await sql`
      INSERT INTO applicants_list (
        user_id,
        hope,
        post_id,
        character_name,
        character_image,
        character_icon
      ) VALUES (
        ${application.user_id},
        ${application.hope},
        ${application.post_id},
        ${application.character_name},
        ${application.character_image},
        ${application.character_icon}
      )`

      await sql`
      INSERT INTO schedule(
           user_id,
           schedule_time,
           raid_gold,
           character_name,
           raid_name,
           raid_level,
           raid_gateway
          ) VALUES (
           ${application.user_id},
           ${raidTime},
           ${application.raid_gold},
           ${application.character_name},
           ${application.raid_name},
           ${application.raid_level},
           ${application.raid_gateway}
          )
        `

      return new Response(JSON.stringify({ message: '지원 성공' }), { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
