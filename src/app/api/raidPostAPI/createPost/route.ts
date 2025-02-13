import { format } from 'date-fns'
import { sql } from '@vercel/postgres'

type Application = {
  user_id: string
  character_name: string
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const post_id = url.searchParams.get('post_id')
  const character_name = url.searchParams.get('character_name')
  const user_id = url.searchParams.get('user_id')
  const raid_name = url.searchParams.get('raid_name')

  if (!post_id || !character_name || !user_id || !raid_name) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const responseTime = await sql`SELECT raid_time FROM raid_posts WHERE post_id = ${post_id}`

    if (responseTime.rows.length === 0) {
      return new Response(JSON.stringify({ message: '해당하는 모집글이 없습니다.' }), {
        status: 404,
      })
    }

    const baseTime = responseTime.rows[0].raid_time
    const formattedTime = format(new Date(baseTime), 'yyyy-MM-dd HH:mm:ss')

    console.log('===========')
    console.log('DB에서 가져온 시간 (변환 전):', baseTime)
    console.log('변환된 시간 (DB 포맷):', formattedTime)
    console.log('===========')

    // 🔹 지원자 목록 조회
    const response = await sql`
      SELECT user_id, character_name FROM applicants_list WHERE post_id = ${post_id}`

    const applicationList = response.rows

    // 🔹 지원자의 schedule에서 삭제
    for (const item of applicationList as Application[]) {
      await sql`
        DELETE FROM schedule 
        WHERE user_id = ${item.user_id} 
        AND raid_name = ${raid_name} 
        AND character_name = ${item.character_name} 
        AND schedule_time = ${formattedTime}`
    }

    // 🔹 모집 글 삭제
    await sql`DELETE FROM raid_posts WHERE post_id = ${post_id}`

    // 🔹 자신의 스케줄에서 삭제
    await sql`
      DELETE FROM schedule 
      WHERE user_id = ${user_id} 
      AND raid_name = ${raid_name} 
      AND character_name = ${character_name} 
      AND schedule_time = ${formattedTime}`

    return new Response(JSON.stringify({ message: '성공' }), { status: 200 })
  } catch (error) {
    console.error('DB 오류:', error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
