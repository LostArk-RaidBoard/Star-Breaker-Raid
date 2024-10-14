'use server'
import cron from 'node-cron'
import { sql } from '@vercel/postgres'

// 크론 작업 정의
const task = cron.schedule(
  '20 15 * * *',
  async () => {
    try {
      await sql`DELETE FROM raid_posts WHERE raid_time < NOW()`
      console.log('이전 raid_time의 데이터가 삭제되었습니다.')
    } catch (error) {
      console.error('데이터 삭제 중 오류 발생:', error)
    }
  },
  {
    scheduled: false, // 초기에는 스케줄링 하지 않음
  },
)

let isCronJobStarted = false

export const startCronJob = () => {
  if (!isCronJobStarted) {
    task.start()
    isCronJobStarted = true
    console.log('크론 작업이 시작되었습니다.')
  } else {
    console.log('크론 작업이 이미 시작되었습니다.')
  }
}
