import CharactorField from '@/components/mypageField/charactorField'
import MyPost from '@/components/mypageField/myPost'
import PasswordChange from '@/components/mypageField/passwordChange'
import UserDelete from '@/components/mypageField/userDelete'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import CharacterSorted from '@/components/utils/characterSorted'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'

interface CharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  transcendence: number
  leap: number
  evolution: number
  enlightenment: number
  elixir: number
  class_icon_url: string
  disable: boolean
}

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  fixed: boolean
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
}

const applicationPostGetHandler = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypagePostGet?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['applicationTage'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 201) {
      return data.postRows
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

const createPostGetHandler = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypageCreatePost?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['createPostTage'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 201) {
      return data.postRows
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

const fetchCreateCount = async (postsRows: RaidPost[]) => {
  const counts: { [key: number]: number } = {}
  const promises = postsRows.map(async (item) => {
    const response = await fetch(
      `${process.env.API_URL}/api/applicationCount?post_id=${item.post_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    )
    if (response.ok) {
      const data = await response.json()
      counts[item.post_id] = data.count + 1 || 1
    } else {
      counts[item.post_id] = 1
    }
  })
}

export default async function MypageField() {
  const session = await getServerSession(authOptions)
  let userId = ''
  let serverCharacter: CharacterInfo[] = []
  let applicationPostGet: RaidPost[] = []
  let createPostGet: RaidPost[] = []

  if (session && session.user.id) {
    serverCharacter = await UtileCharacterDataFetch(session.user.id)
    applicationPostGet = await applicationPostGetHandler(session.user.id)
    createPostGet = await createPostGetHandler(session.user.id)
    fetchCreateCount(createPostGet)
    userId = session.user.id
  }

  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='w-full rounded-md border shadow-lg'>
        <CharactorField userId={userId} dbCharacter={serverCharacter} />
      </div>
      <div className='w-full rounded-md border shadow-lg'>
        <MyPost
          userId={userId}
          applicationPostGet={applicationPostGet}
          createPostGet={createPostGet}
        />
      </div>

      <div className='mt-8 flex h-96 w-full flex-col items-center justify-center gap-4 sm:h-56 sm:flex-row'>
        <PasswordChange userId={userId} />
        <UserDelete userId={userId} />
      </div>
    </div>
  )
}
