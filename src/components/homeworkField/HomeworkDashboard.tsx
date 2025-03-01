import { auth } from '@/auth'
import HomeworkSaveButton from '@/components/button/HomeworkSaveButton'
import HomeworkExpeditionTable from '@/components/homeworkField/HomeworkExpeditionTable'
import HomeworkChecklist from '@/components/homeworkField/HomeworkChecklist'
import GuildImage from '@image/image/길드.png'
import Image from 'next/image'
import Kulngan from '@image/image/쿠르잔전선.png'
import Guardian from '@image/image/guardian.png'
import Epona from '@image/image/에포나.png'
import FieldBoss from '@image/image/필드보스.png'
import CoseGate from '@image/image/카게.png'
import WisdomImage from '@image/image/영지.png'
import GatheringImage from '@image/image/생활.png'

interface HomeworkData {
  user_id: string
  character_name: string
  character_level: string
  chaso_dungeon: boolean[]
  epona: boolean[]
  guardian: boolean[]
  guild: boolean[]
}

interface ExpeditionData {
  user_id: string
  gathering: boolean[]
  wisdom: boolean[]
  daycontent: boolean[]
}
const homeworkGetHandler = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/homeworkAPI/homeworkGet?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['homework'] },
      },
    )
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return { homeworkGet: data.postRows, expedition: data.expedition }
    } else {
      return { homeworkGet: [], expedition: [] }
    }
  } catch (error) {
    console.error(error)
    return { homeworkGet: [], expedition: [] }
  }
}

export default async function HomeworkDashboard() {
  const session = await auth()
  let homeworkGet: HomeworkData[] = []
  let homeworkExpeditonGet: ExpeditionData[] = [
    {
      user_id: '',
      gathering: [false, false, false, false, false, false, false],
      wisdom: [false, false, false, false, false, false, false],
      daycontent: [false, false, false, false, false, false, false],
    },
  ]
  let userId = ''
  if (session && session.user.id) {
    userId = session.user.id
    const homeworkResponse = await homeworkGetHandler(userId)
    homeworkGet = homeworkResponse.homeworkGet
    homeworkExpeditonGet = homeworkResponse.expedition
  }

  const homeworkSortedList = homeworkSorted(homeworkGet)

  return (
    <div className='flex w-full flex-col rounded-md border border-gray-400 p-4'>
      <HomeworkSaveButton />

      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-lg font-extrabold text-gray-900'>원정대 숙제</h2>
        {/* 원정대 체크 설명 */}

        <div className='hidden items-center justify-end gap-4 sm:flex'>
          <div className='flex items-center gap-2'>
            <Image
              src={GatheringImage}
              alt='생활 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>생활</span>
          </div>
          <div className='flex items-center gap-2'>
            <Image
              src={WisdomImage}
              alt='영지 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>영지</span>
          </div>
          <div className='flex items-center gap-2'>
            <Image
              src={CoseGate}
              alt='day콘텐츠 카게 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />

            <span className='text-sm font-medium text-gray-700'>카오스게이드</span>
          </div>
          <div className='flex items-center gap-2'>
            <Image
              src={FieldBoss}
              alt='day콘텐츠 필보 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>필드 보스</span>
          </div>
        </div>
      </div>
      <HomeworkExpeditionTable homeworkExpeditionData={homeworkExpeditonGet} />

      <div className='mt-3 flex flex-row items-center justify-between'>
        <h2 className='text-lg font-extrabold text-gray-900'>일일 숙제</h2>
        <div className='hidden items-center justify-end gap-4 sm:flex'>
          {/* 길드 */}
          <div className='flex items-center gap-2'>
            <Image
              src={GuildImage}
              alt='길드 이미지'
              width={18}
              height={18}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>길드</span>
          </div>

          {/* 카던 */}
          <div className='flex items-center gap-2'>
            <Image
              src={Kulngan}
              alt='카던 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>카던</span>
          </div>

          {/* 가디언 */}
          <div className='flex items-center gap-2'>
            <Image
              src={Guardian}
              alt='가디언 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>가디언</span>
          </div>

          {/* 에포나 */}
          <div className='flex items-center gap-2'>
            <Image
              src={Epona}
              alt='에포나 이미지'
              width={20}
              height={20}
              className='h-5 w-5'
              priority
            />
            <span className='text-sm font-medium text-gray-700'>에포나</span>
          </div>
        </div>
      </div>
      <HomeworkChecklist homeworkSortedList={homeworkSortedList} />
    </div>
  )
}

function homeworkSorted(homeworkGet: HomeworkData[]): HomeworkData[] {
  return homeworkGet.sort((a, b) => {
    // character_level을 숫자로 변환하여 내림차순 정렬
    const levelA = parseFloat(a.character_level.replace(/,/g, ''))
    const levelB = parseFloat(b.character_level.replace(/,/g, ''))
    return levelB - levelA
  })
}
