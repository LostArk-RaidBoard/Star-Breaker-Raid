'use server'
import { sql } from '@vercel/postgres'

export async function PUT(req: Request) {
  const url = new URL(req.url)

  const userId = url.searchParams.get('user_id')
  const character_name = url.searchParams.get('character_name')
  const raid_name = url.searchParams.get('raid_name')
  const gold_check = url.searchParams.get('gold_check')

  if (!userId || !character_name || !raid_name) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 404 })
  }

  console.log(gold_check)
  try {
    const res = await sql`
       UPDATE schedule SET gold_check=${gold_check} WHERE user_id = ${userId} AND character_name = ${character_name} AND raid_name =  ${raid_name}
    `

    return new Response(JSON.stringify({ postRows: res.rows }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '서버 연결 실패' }), { status: 500 })
  }
}
