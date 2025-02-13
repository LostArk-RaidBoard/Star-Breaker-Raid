import NormalizeScheduleTime from '@/components/utils/NormalizeScheduleTime'
import { sql } from '@vercel/postgres'

type Application = {
  user_id: string
  character_name: string
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userID = url.searchParams.get('user_id')

  if (!userID) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  try {
    const res = await sql`
      SELECT 
        DISTINCT 
        rp.post_id,
        rp.raid_name,
        rp.raid_time,
        rp.limit_level,
        rp.user_id,
        rp.raid_limitperson,
        rp.character_classicon,
        rp.raid_level,
        rp.character_name,
        COUNT(DISTINCT CASE WHEN al.approval = true THEN al.user_id END) + 1 AS approval, 
        COUNT(DISTINCT CASE WHEN al.approval = false THEN al.user_id END) AS rejected_count
      FROM raid_posts rp 
      LEFT JOIN applicants_list al 
        ON rp.post_id = al.post_id 
      WHERE rp.user_id = ${userID} 
      GROUP BY rp.post_id;
    `
    return new Response(JSON.stringify({ postRows: res.rows }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}

/**
 * 모집 자가 모집 글을 삭제할때 사용하는 로직
 * @param req : post_id, character_name, user_id, raid_name을 url로 받아옴
 * @returns : 모집 글 신청자, 작성자의 schedule에서 삭제, 모집 글 raid_posts에서 삭제
 */
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
    const responseTime =
      await sql`SELECT raid_posts.raid_time FROM raid_posts WHERE post_id = ${post_id}`

    const baseTime = responseTime.rows[0].raid_time
    console.log('===========')
    console.log(baseTime)
    const formatTime = NormalizeScheduleTime(baseTime)
    console.log(formatTime)
    console.log('===========')

    // 지원자 찾는 sql
    const response =
      await sql`SELECT user_id, character_name FROM applicants_list WHERE post_id = ${post_id}`

    const applicationList = response.rows
    // 지원자의 schedule에서 삭제함
    for (const item of applicationList as Application[]) {
      await sql`DELETE FROM schedule WHERE user_id = ${item.user_id} AND raid_name = ${raid_name} AND character_name = ${item.character_name} AND schedule_time = ${baseTime}`
    }

    // 모집 글 삭제
    await sql`DELETE FROM raid_posts WHERE post_id = ${post_id}`

    // 자신의 스케줄에서 삭제
    await sql`DELETE FROM schedule WHERE user_id = ${user_id} AND raid_name = ${raid_name} AND character_name = ${character_name} AND schedule_time = ${formatTime}`

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
