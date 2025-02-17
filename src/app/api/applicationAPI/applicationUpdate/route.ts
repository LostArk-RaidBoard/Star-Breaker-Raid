import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  const userId = url.searchParams.get('userId')
  const characterName = url.searchParams.get('characterName')
  const characterCheck = url.searchParams.get('characterCheck')

  // 입력 값 검증
  if (!postId || !userId || !characterName || !characterCheck) {
    console.log('필수 파라미터가 누락되었습니다.')
    return new Response(JSON.stringify({ message: '필수 파라미터가 누락되었습니다.' }), {
      status: 400,
      headers: {
        'Cache-Control': 'no-cache, must-revalidate',
      },
    })
  }

  const check = characterCheck === 'true' ? 'false' : 'true'

  try {
    const response =
      await sql`SELECT rp.raid_limitperson FROM raid_posts rp WHERE post_id=${postId}`
    const response2 =
      await sql`SELECT COUNT(DISTINCT al.user_id) FROM applicants_list al WHERE al.post_id = ${postId} AND al.approval = true`

    const limit = parseInt(response.rows[0].raid_limitperson)
    const approval = parseInt(response2.rows[0].count) + 1
    if (approval < limit || check === 'false') {
      await sql`UPDATE applicants_list SET approval=${check} WHERE post_id=${postId} AND user_id=${userId} AND character_name=${characterName}`
      return new Response(JSON.stringify({ message: '성공' }), {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, must-revalidate',
        },
      })
    } else {
      return new Response(JSON.stringify({ message: '초과' }), {
        status: 409,
        headers: {
          'Cache-Control': 'no-cache, must-revalidate',
        },
      })
    }
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
