'use server'
import { sql } from '@vercel/postgres'
export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const characterName = url.searchParams.get('characterName')
  console.log(characterName)

  try {
    const res = await sql`DELETE FROM characters WHERE character_name=${characterName}`
    return new Response(JSON.stringify({ message: '삭제 성공' }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '삭제 실패' }), { status: 401 })
  }
}
