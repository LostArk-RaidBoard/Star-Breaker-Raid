import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  console.log('실행이 됨')
  const res = sql`SELECT raid_time FROM raid_posts`
  console.log((await res).rows)
  return NextResponse.json({ message: '크론 작업이 시작되었습니다.' })
}
