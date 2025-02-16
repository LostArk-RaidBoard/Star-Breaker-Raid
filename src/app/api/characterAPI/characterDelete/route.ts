import { sql } from '@vercel/postgres'
export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const characterName = url.searchParams.get('characterName')
  if (!characterName) {
    return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), {
      status: 404,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }

  try {
    await sql`DELETE FROM characters WHERE character_name=${characterName}`
    return new Response(JSON.stringify({ message: '삭제 성공' }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: '삭제 실패' }), {
      status: 401,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }
}
