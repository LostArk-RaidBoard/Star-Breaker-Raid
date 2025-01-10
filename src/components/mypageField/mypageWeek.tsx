import AddScheduleButton from '@/components/button/addScheduleButton'
import DeleteScheduleButton from '@/components/button/deleteScheduleButton'
import ScheduleGoldCheckBox from '@/components/button/sheduleGoldCheckBox'
import Image from 'next/image'
import { toZonedTime } from 'date-fns-tz'
import { setHours, setMinutes, subDays, addDays } from 'date-fns'
import nextWednesday from '@/components/utils/nextWednesday'

interface Schedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
  gold_check: boolean
}
interface Props {
  weekSchedule: Schedule[]
  userId: string
}

// 이번 주 수요일 오전 6시를 KST로 가져오는 함수 (화요일이면 전주 수요일로 계산)
function getThisWeekWednesday6AM() {
  const now = new Date()
  const dayOfWeek = now.getDay()

  // 수요일(3) 이후라면 이번 주 수요일, 그 전이라면 전주의 수요일로 설정
  const diffToWednesday = dayOfWeek >= 3 ? 3 - dayOfWeek : 3 - dayOfWeek - 7

  const thisWednesday = new Date(now)
  thisWednesday.setDate(now.getDate() + diffToWednesday)
  thisWednesday.setHours(0, 0, 0, 0) // 오전 6시로 설정

  return thisWednesday
}

export default function MypageWeek({ weekSchedule, userId }: Props) {
  const startWednesday = getThisWeekWednesday6AM()

  // 요일별로 데이터를 분류
  const daysArray = Array.from({ length: 7 }, () => [] as Schedule[])
  let sumGold = 0

  weekSchedule.forEach((post) => {
    if (post.gold_check) {
      sumGold += post.raid_gold
    }

    const raidTime = new Date(post.schedule_time)

    // 요일 구분하기
    const diff = (raidTime.getTime() - startWednesday.getTime()) / (1000 * 60 * 60 * 24)
    if (diff >= 0.25 && diff < 7.25) {
      const diffDays = Math.floor(
        (raidTime.getTime() - startWednesday.getTime()) / (1000 * 60 * 60 * 24),
      )
      if (diffDays >= 0 && diffDays < 8) {
        daysArray[diffDays].push(post)
      }
    }
  })

  return (
    <div className='mt-4 rounded-md border border-gray-400 p-4 shadow-lg'>
      <div className='flex w-full justify-between'>
        <span className='text-lg font-semibold'>• 이번 주 레이드 일정</span>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Image src='/골드.png' alt='골드 이미지' width='25' height='25' />
            <span className='text-lg text-yellow-700'>{sumGold}</span>
          </div>
          <AddScheduleButton userId={userId} />
        </div>
      </div>
      <div className='mt-2 grid w-full grid-cols-2 rounded-sm border-2 border-gray-400 sm:grid-cols-4 lg:grid-cols-7'>
        {['수요일', '목요일', '금요일', '토요일', '일요일', '월요일', '화요일'].map(
          (day, index) => (
            <div key={day} className={`flex min-h-80 flex-col border border-gray-400`}>
              <span
                className={`${index === 3 || index === 4 ? 'text-red-700' : ''} flex justify-center bg-gray-300 text-base font-semibold antialiased`}
              >
                {day}
              </span>
              {daysArray[index]?.map((item) => {
                const timeZone = 'Asia/Seoul'
                let bgColorClass = 'bg-gray-300' // 기본 색상
                const raidTime = toZonedTime(item.schedule_time, timeZone) // schedlue_time 시간으로 형변환

                // 스케줄 시간 년도, 월, 일 가져오기
                const raidDate = new Date(
                  raidTime.getFullYear(),
                  raidTime.getMonth(),
                  raidTime.getDate(),
                )
                // 현재 날짜
                const today = toZonedTime(new Date(), timeZone)
                console.log('=================')
                console.log('아이템 : ' + item.schedule_time)
                console.log('raidTime : ' + raidTime)
                console.log('riadDat : ' + raidDate)
                console.log('riadDat getDate : ' + raidDate.getDate())
                console.log('today :' + today.toString())
                console.log('오늘 날짜' + today.getDate())
                console.log('다음 수요일 : ' + nextWednesday())

                // 날짜에 따른 색상 구분, 오늘 : 초록, 미래 : 빨강
                if (raidDate.getDate() === today.getDate()) {
                  bgColorClass = 'bg-green-300'
                } else if (raidDate.getDate() > today.getDate()) {
                  bgColorClass = 'bg-red-300' // 미래
                }

                return (
                  <div
                    key={`${item.schedule_time}-${index}-${item.raid_name}`}
                    className={`mt-1 flex flex-col overflow-hidden truncate whitespace-nowrap border-b-2 border-dashed border-gray-700 p-1`}
                  >
                    <span className={`${bgColorClass} rounded-md p-1`}>{item.raid_name}</span>
                    <div className='flex items-center justify-between'>
                      <span>{raidTime.getHours() + '시 ' + raidTime.getMinutes() + '분'}</span>
                      <DeleteScheduleButton
                        characterName={item.character_name}
                        raidName={item.raid_name}
                        userId={item.user_id}
                      />
                    </div>
                    <span>{item.character_name}</span>
                    <ScheduleGoldCheckBox
                      goldCheck={item.gold_check}
                      characterName={item.character_name}
                      raidName={item.raid_name}
                      userId={item.user_id}
                    />
                  </div>
                )
              })}
            </div>
          ),
        )}
      </div>
      <p className='text-sm'>
        * 이번 주 레이드 일정은 레이드 카운트와 골드 계산의 기준이 됩니다. 골드 체크가 완료되어야만
        골드가 합산되며, 메인 페이지에서 레이드 횟수로 추가됩니다.
      </p>
    </div>
  )
}
