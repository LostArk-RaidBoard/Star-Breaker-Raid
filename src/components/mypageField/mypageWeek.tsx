interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  approval: boolean
}

interface RaidCreatePost {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  applicant_count: number
}

interface Props {
  applicationPostGet: RaidPost[]
  createPostGet: RaidCreatePost[]
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

export default function MypageWeek({ applicationPostGet, createPostGet }: Props) {
  const startWednesday = getThisWeekWednesday6AM()
  console.log('수요일 :' + startWednesday)

  // 요일별로 데이터를 분류
  const daysArray = Array.from({ length: 8 }, () => [] as (RaidPost | RaidCreatePost)[])
  const allPosts = [...applicationPostGet, ...createPostGet]

  allPosts.forEach((post) => {
    const raidTime = toKST(new Date(post.raid_time))
    console.log('각 요일별 :' + raidTime)
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
      <span className='text-lg'>• 이번주 일정</span>
      <div className='flex flex-row justify-end gap-3 text-sm'>
        <div className='flex flex-row gap-1'>
          <div className='rounded-full bg-green-200 p-2 px-3'></div>
          <span>등록</span>
        </div>
        <div className='flex flex-row gap-1'>
          <div className='rounded-full bg-red-200 p-2 px-3'></div>
          <span>신청, 미승인</span>
        </div>
        <div className='flex flex-row gap-1'>
          <div className='rounded-full bg-blue-200 p-2 px-3'></div>
          <span>신청, 승인</span>
        </div>
      </div>
      <div className='mt-2 grid w-full grid-cols-2 rounded-sm border-2 border-gray-400 sm:grid-cols-4 lg:grid-cols-8'>
        {[
          '수요일 (6시~)',
          '목요일',
          '금요일',
          '토요일',
          '일요일',
          '월요일',
          '화요일',
          '수요일 (~6시)',
        ].map((day, index) => (
          <div key={day} className={`flex min-h-48 flex-col border border-gray-400 p-1`}>
            <span
              className={`${index === 3 || index === 4 ? 'text-red-500' : ''} text-sm font-bold`}
            >
              {day}
            </span>
            {daysArray[index]?.map((item) => {
              // approval 속성이 있는지 확인
              let bgColorClass = 'bg-gray-200' // 기본 색상
              if ('approval' in item) {
                // item이 RaidPost인지 확인
                if (item.approval === undefined) {
                  bgColorClass = 'bg-green-200' // approval가 없을 때
                } else if (item.approval === false) {
                  bgColorClass = 'bg-red-200' // approval이 false일 때
                } else if (item.approval === true) {
                  bgColorClass = 'bg-blue-200' // approval이 true일 때
                }
              } else {
                bgColorClass = 'bg-green-200' // RaidCreatePost는 기본 색상
              }

              return (
                <div
                  key={item.post_id}
                  className={`${bgColorClass} mt-2 overflow-hidden truncate whitespace-nowrap rounded-md p-1`}
                >
                  {item.raid_name}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
