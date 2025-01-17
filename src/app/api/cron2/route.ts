import { createPostTage, homework } from '@/app/action'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const res = await sql`DELETE FROM schedule WHERE schedule_time < NOW()`
    console.log('삭제된 행 수:', res.rowCount) // 삭제된 행 수를 로그에 출력
    createPostTage()

    await sql`
      UPDATE homework
      SET 
        guild = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[], 
        chaso_dungeon = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[], 
        guardian = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[], 
        epona = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[]
    `
    await sql`
    UPDATE expedition
      SET
        gathering = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[],
        wisdom = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[],
        daycontent = ARRAY[false, false, false, false, false, false, false]::BOOLEAN[]
    `
    homework()

    return NextResponse.json({ message: '크론 작업이 시작되었습니다.' })
  } catch (error) {
    console.error('schedule 데이터 삭제 중 오류 발생:', error)
  }
}
