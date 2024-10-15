import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: Request) {
  console.log('크론 실행이 됨')
  try {
    console.log('크론 삭제 준비')
    const res = await sql`DELETE FROM raid_posts WHERE raid_time < NOW()`
    console.log('삭제된 행 수:', res.rowCount) // 삭제된 행 수를 로그에 출력
    return NextResponse.json({ message: '크론 작업이 시작되었습니다.' })
  } catch (error) {
    console.error('데이터 삭제 중 오류 발생:', error)
  }
}
