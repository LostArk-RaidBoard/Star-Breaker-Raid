import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  console.log('크론 실행이 됨')
  try {
    const res = sql`DELETE FROM raid_posts WHERE raid_time < NOW()`
    return NextResponse.json({ message: '크론 작업이 시작되었습니다.' })
  } catch (error) {
    console.error('데이터 삭제 중 오류 발생:', error)
  }
}
