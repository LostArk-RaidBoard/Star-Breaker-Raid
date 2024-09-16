'use server'
import { sql } from '@vercel/postgres'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')

  try {
    const res = await sql`SELECT * FROM characters WHERE user_id=${userId}`
    if (res.rowCount === 0) {
      return new Response(JSON.stringify({ result: [] }), { status: 201 })
    }
    return new Response(JSON.stringify({ result: res.rows }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ result: [] }), { status: 401 })
  }
}
