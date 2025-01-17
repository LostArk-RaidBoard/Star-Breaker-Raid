import { auth } from '@/auth'
import HomeworkCheck from '@/components/homeworkField/homeworkCheck'

interface HomeworkData {
  user_id: string
  character_name: string
  character_level: string
  chaso_dungeon: boolean[]
  epona: boolean[]
  guardian: boolean[]
  guild: boolean[]
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
      return data.postRows
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export default async function HomeWorkField() {
  const session = await auth()
  let homeworkGet: HomeworkData[] = []
  if (session && session.user.id) {
    const userId = session.user.id
    homeworkGet = await homeworkGetHandler(userId)
  }
  return (
    <div className='flex w-full flex-col rounded-md border border-gray-400 p-4'>
      <span className='text-lg font-semibold'>• 이번 주 숙제 체크</span>

      {/* 올바른 Props 전달 */}
      <HomeworkCheck homeworkGet={homeworkGet} />
    </div>
  )
}
