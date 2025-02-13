import NormalizeScheduleTime from '@/components/utils/NormalizeScheduleTime'
import { sql } from '@vercel/postgres'

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const post_id = url.searchParams.get('post_id')
  const userId = url.searchParams.get('user_id')
  const schedule = url.searchParams.get('schedule') || ''

  if (!post_id || !userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  const formattedSchedule = NormalizeScheduleTime(schedule)
  if (!formattedSchedule) {
    return new Response(JSON.stringify({ message: '날짜 형식 오류' }), { status: 400 })
  }
  console.log('===========')
  console.log(formattedSchedule)
  console.log('===========')
  try {
    const res1 = await sql`
    SELECT applicants_list.character_name, raid_posts.raid_name
    FROM applicants_list 
    LEFT JOIN raid_posts ON applicants_list.post_id = raid_posts.post_id 
    WHERE applicants_list.post_id = ${post_id} AND applicants_list.user_id =${userId}`
    if (res1.rows.length === 0) {
      return new Response(JSON.stringify({ message: '해당하는 데이터가 없습니다.' }), {
        status: 404,
      })
    }

    // const raid_name = res1.rows[0].raid_name
    // const character_name = res1.rows[0].character_name

    // await sql`DELETE FROM applicants_list WHERE user_id = ${userId} AND post_id = ${post_id}`

    // await sql`DELETE FROM schedule WHERE user_id = ${userId} AND raid_name = ${raid_name} AND character_name = ${character_name}`

    return new Response(JSON.stringify({ message: '성공' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
