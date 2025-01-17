import { auth } from '@/auth'
import HomeworkUpdateButton from '@/components/button/homeworkUpdateButton'
import HomeworkExpedition from '@/components/homeworkField/homeworkExpedition'
import HomeworkSetTable from '@/components/homeworkField/homeworkSetTable'

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
      <span className='text-lg font-semibold'>이번 주 숙제 체크</span>

      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>• 원정대 숙제</h3>
        <HomeworkExpedition homeworkExpeditionData={homeworkExpeditonGet} />
      </div>
      <div className='mt-2'>
        <h3 className='text-lg font-semibold'>• 일일 숙제</h3>

        <HomeworkSetTable homeworkSortedList={homeworkSortedList} />
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
