'use server'
import { sql } from '@vercel/postgres'

interface RaidPost {
  postId: number
  raid_time: Date | null | string // 문자열이거나 null일 수도 있으므로 추가
  noti: string
  character_name: string
  character_classicon: string
  raid_type: string
  raid_maxtime: string
  character_image: string
}

export async function POST(req: Request) {
  const raidPost: RaidPost = await req.json()

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
    UPDATE raid_posts SET 
      raid_time = ${raidTime},
      noti = ${raidPost.noti},
      character_name = ${raidPost.character_name},
      raid_type = ${raidPost.raid_type},
      raid_maxtime = ${raidPost.raid_maxtime},
      character_classicon = ${raidPost.character_classicon},
      character_image = ${raidPost.character_image}
    WHERE post_id = ${raidPost.postId}
  `

    return new Response(JSON.stringify({ message: '레이드 업데이트 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), { status: 500 })
  }
}
