import AddScheduleButton from '@/components/button/addScheduleButton'
import DeleteScheduleButton from '@/components/button/deleteScheduleButton'
import Image from 'next/image'

interface Schedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
}
interface Props {
  weekSchedule: Schedule[]
  userId: string
}

// KST로 변환하는 함수
function toKST(date: Date) {
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000) // UTC에서 9시간을 더해 KST로 변환
  return kstDate
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
  const daysArray = Array.from({ length: 8 }, () => [] as Schedule[])
  let sumGold = 0

  weekSchedule.forEach((post) => {
    sumGold += post.raid_gold
    const raidTime = toKST(new Date(post.schedule_time))
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
    <div className='mt-4 rounded-md border p-4 shadow-lg'>
      <div className='flex w-full justify-between'>
        <span className='text-lg'>• 이번주 일정</span>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Image src='/골드.png' alt='골드 이미지' width='25' height='25' />
            <span className='text-lg text-yellow-600'>{sumGold}</span>
          </div>
          <AddScheduleButton userId={userId} />
        </div>
      </div>
      <div className='mt-2 grid w-full grid-cols-2 rounded-sm border-2 border-gray-300 sm:grid-cols-4 lg:grid-cols-8'>
        {[
          '수요일 (10시~)',
          '목요일',
          '금요일',
          '토요일',
          '일요일',
          '월요일',
          '화요일',
          '수요일 (~6시)',
        ].map((day, index) => (
          <div key={day} className={`flex min-h-80 flex-col border border-gray-300`}>
            <span
              className={`${index === 3 || index === 4 ? 'text-red-500' : ''} flex justify-center bg-gray-200 text-base font-bold`}
            >
              {day}
            </span>
            {daysArray[index]?.map((item) => {
              // approval 속성이 있는지 확인
              let bgColorClass = 'bg-gray-200' // 기본 색상
              const raidTime = new Date(item.schedule_time) // KST로 변환

              // 현재 날짜를 KST로 변환
              const now = new Date()

              const raidDate = new Date(
                raidTime.getFullYear(),
                raidTime.getMonth(),
                raidTime.getDate(),
              )
              const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
              if (raidDate.getTime() === currentDate.getTime()) {
                bgColorClass = 'bg-green-200' // 오늘
              } else if (raidDate.getTime() > currentDate.getTime()) {
                bgColorClass = 'bg-red-200' // 미래
              }

              return (
                <div
                  key={item.schedule_time}
                  className={`flex flex-col overflow-hidden truncate whitespace-nowrap rounded-md p-1`}
                >
                  <span className={`${bgColorClass} rounded-md p-1`}>{item.raid_name}</span>
                  <div className='flex items-center justify-between'>
                    <span>
                      {item.schedule_time
                        .split('T')[1]
                        .split('.')[0]
                        .split(':')
                        .slice(0, 2)
                        .join(':')}
                    </span>
                    <DeleteScheduleButton
                      characterName={item.character_name}
                      raidName={item.raid_name}
                      userId={item.user_id}
                    />
                  </div>
                  <span>{item.character_name}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
