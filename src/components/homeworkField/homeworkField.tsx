import { auth } from '@/auth'
import HomeworkUpdateButton from '@/components/button/homeworkUpdateButton'
import HomeworkExpedition from '@/components/homeworkField/homeworkExpedition'
import HomeworkSetTable from '@/components/homeworkField/homeworkSetTable'
import GuildImage from '@image/asset/길드.png'
import Image from 'next/image'

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
      `${process.env.API_URL}/api/homework/homeworkGet?userId=${userId}`,
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

export default async function HomeWorkField() {
  const session = await auth()
  let homeworkGet: HomeworkData[] = []
  let homeworkExpeditonGet: ExpeditionData[] = []
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
      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>• 원정대 숙제</h3>
        <HomeworkExpedition homeworkExpeditionData={homeworkExpeditonGet} />
        <div className='mt-1 flex hidden items-center justify-end sm:flex'>
          <p className='flex flex-row gap-2'>
            <span>* 생활 체크 </span>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/67f271a84b4d488f8dfefc1ed5bbded2.png'
              }
              alt='생활 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
            <span>영지 체크</span>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/f02b26325c624484a4dd4981561c2ab4.png'
              }
              alt='영지 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
            <span>카오스케이드 또는 필드 보스 체크</span>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/cc62912424ee4eb7ad5b233c546ff35a.png'
              }
              alt='day콘텐츠 카게 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/f2d851bf847a486a81bb44be5c938de0.png'
              }
              alt='day콘텐츠 필보 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
          </p>
        </div>
      </div>
      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>• 일일 숙제</h3>

        <HomeworkSetTable homeworkSortedList={homeworkSortedList} />
        <div className='mt-1 flex hidden items-center justify-end sm:flex'>
          <p className='flex flex-row gap-2'>
            <span>* 길드 체크 </span>
            <Image
              src={GuildImage}
              alt='길드 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
            <span>카던 체크</span>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/2d6d1f84c0d2492e963629a784925092.png'
              }
              alt='카던 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
            <span>가디언 체크</span>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/204f46e984a64c71b5a059d3c9fcea2b.png'
              }
              alt='가디언 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
            <span>에포나 체크</span>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/uploadfiles/notice/de4dd870c84240bb8beebde650ed18d0.png'
              }
              alt='에포나 이미지'
              width={20}
              height={20}
              style={{
                width: '20px',
                height: '20px',
              }}
              priority
            />
          </p>
        </div>
        <HomeworkUpdateButton />
      </div>
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
