'use server'
import { sql } from '@vercel/postgres'

interface RaidPost {
  raid_name: string
  raid_time: Date | null | string // 문자열이거나 null일 수도 있으므로 추가
  limit_level: string
  user_id: string
  post_position: string
  noti: string
  character_name: string
  character_classicon: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_image: string
  raid_gold: number
}

export async function POST(req: Request) {
  const raidPost: RaidPost = await req.json()

  console.log(raidPost.raid_gold)
  if (!raidPost) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  console.log('raidpost 처음 시간 :' + raidPost.raid_time)
  try {
    let raidTime: string | null = null

    // raid_time이 Date 객체인지 확인 후 처리
    if (raidPost.raid_time instanceof Date) {
      // Date 객체라면 TIMESTAMP 형식으로 변환
      raidTime = raidPost.raid_time.toISOString().slice(0, 19).replace('T', ' ')
    } else if (typeof raidPost.raid_time === 'string') {
      // 문자열로 넘어온 경우 그대로 사용
      raidTime = raidPost.raid_time
    }

    console.log('post에 들어가는 시간' + raidTime)
    const res = await sql`
      INSERT INTO raid_posts (
        raid_name,
        raid_time,
        limit_level,
        user_id,
        post_position,
        noti,
        character_name,
        raid_limitperson,
        raid_type,
        raid_maxtime,
        character_classicon,
        character_image
      ) VALUES (
        ${raidPost.raid_name},
        ${raidTime},
        ${raidPost.limit_level},
        ${raidPost.user_id},
        ${raidPost.post_position},
        ${raidPost.noti},
        ${raidPost.character_name},
        ${raidPost.raid_limitperson},
        ${raidPost.raid_type},
        ${raidPost.raid_maxtime},
        ${raidPost.character_classicon},
        ${raidPost.character_image}
      )`

    const response = await sql`
    INSERT INTO schedule(
         user_id,
         schedule_time,
         raid_gold,
         character_name,
         raid_name
        ) VALUES (
         ${raidPost.user_id},
         ${raidTime},
         ${raidPost.raid_gold},
         ${raidPost.character_name},
         ${raidPost.raid_name}
        )
      `

    return new Response(JSON.stringify({ message: '레이드 생성 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
