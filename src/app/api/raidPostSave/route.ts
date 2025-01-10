'use server'
import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const raid_name = url.searchParams.get('raid_name')
  const raid_time = url.searchParams.get('raid_time')
  const limit_level = url.searchParams.get('limit_level')
  const user_id = url.searchParams.get('user_id')
  const post_position = url.searchParams.get('post_position')
  const noti = url.searchParams.get('noti')
  const character_name = url.searchParams.get('character_name')
  const character_classicon = url.searchParams.get('character_classicon')
  const raid_limitperson = url.searchParams.get('raid_limitperson')
  const raid_type = url.searchParams.get('raid_type')
  const raid_maxtime = url.searchParams.get('raid_maxtime')
  const character_image = url.searchParams.get('character_image')
  const raid_gold = url.searchParams.get('raid_gold')

  if (
    !raid_name ||
    !raid_time ||
    !limit_level ||
    !user_id ||
    !post_position ||
    !character_name ||
    !character_classicon ||
    !raid_limitperson ||
    !raid_type ||
    !raid_maxtime ||
    !character_image ||
    !raid_gold
  ) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }
  const formattedScheduleTime = new Date(
    new Date(raid_time).getTime() - 9 * 60 * 60 * 1000,
  ).toISOString()

  try {
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
        ${raid_name},
        ${formattedScheduleTime},
        ${limit_level},
        ${user_id},
        ${post_position},
        ${noti},
        ${character_name},
        ${raid_limitperson},
        ${raid_type},
        ${raid_maxtime},
        ${character_classicon},
        ${character_image}
      )`

    const response = await sql`
    INSERT INTO schedule(
         user_id,
         schedule_time,
         raid_gold,
         character_name,
         raid_name
        ) VALUES (
         ${user_id},
         ${formattedScheduleTime},
         ${raid_gold},
         ${character_name},
         ${raid_name}
        )
      `

    return new Response(JSON.stringify({ message: '레이드 생성 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
