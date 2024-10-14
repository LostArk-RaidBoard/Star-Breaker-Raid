'use server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  return NextResponse.json({ message: '크론 작업이 시작되었습니다.' })
}
