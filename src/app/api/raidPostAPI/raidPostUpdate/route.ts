import { sql } from '@vercel/postgres'

interface RaidPost {
  postId: number
  raidName: string
  raid_time: Date // 문자열이거나 null일 수도 있으므로 추가
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
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }

  const updateTime = new Date(raidPost.raid_time).toISOString()
  try {
    await sql`
    UPDATE raid_posts SET 
      raid_time = ${updateTime},
      noti = ${raidPost.noti},
      character_name = ${raidPost.character_name},
      raid_type = ${raidPost.raid_type},
      raid_maxtime = ${raidPost.raid_maxtime},
      character_classicon = ${raidPost.character_classicon},
      character_image = ${raidPost.character_image}
    WHERE post_id = ${raidPost.postId}
  `

    // 모집 글에 지원한 사람들 조회
    const response =
      await sql`SELECT user_id, character_name FROM applicants_list WHERE post_id = ${raidPost.postId}`

    const applictionList = response.rows

    // 각 요소에 대해 schedule.schedule_time UPDATE 쿼리 실행
    for (const applicant of applictionList) {
      const userId = applicant.user_id
      const characterName = applicant.character_name
      const raidName = raidPost.raidName // raidName이 raidPost에 포함되어 있다고 가정

      await sql`
      UPDATE schedule SET
        schedule_time = ${updateTime}
      WHERE user_id = ${userId} AND character_name = ${characterName} AND raid_name = ${raidName}
    `
    }

    return new Response(JSON.stringify({ message: '레이드 업데이트 성공' }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버와 연결 실패' }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }
}
