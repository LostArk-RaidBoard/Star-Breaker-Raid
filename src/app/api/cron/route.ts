import { NextResponse } from 'next/server'
import { startCronJob } from '@/lib/cron' // 경로를 적절히 수정하세요

export async function GET(req: Request) {
  startCronJob() // 크론 작업 시작
  return NextResponse.json({ message: '크론 작업이 시작되었습니다.' })
}
