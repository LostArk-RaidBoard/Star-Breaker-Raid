import { sql } from '@vercel/postgres'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  console.log('userId', userId)
  if (!userId) {
    return new Response(JSON.stringify({ message: '잘못된 요청' }), { status: 404 })
  }

  try {
    await sql`
      UPDATE homework
      SET 
        guild = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[], 
        chaso_dungeon = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[], 
        guardian = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[], 
        epona = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[]
      WHERE
        user_id = ${userId}
      `
    await sql` 
      UPDATE expedition
      SET
        gathering = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[],
        wisdom = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[],
        daycontent = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[]
      WHERE
        user_id = ${userId}
      `

    return new Response(JSON.stringify({ message: '리셋 성공' }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
