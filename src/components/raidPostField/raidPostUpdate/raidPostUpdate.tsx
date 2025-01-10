import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import UpdateFieldComponent from '@/components/raidPostField/raidPostUpdate/updateFieldComponents'

interface Post {
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
  character_image: string
  nickname: string
}

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

const fetchPostData = async (postId: number) => {
  console.log('raidPostUpdate 호출됨')
  try {
    const response = await fetch(`${process.env.API_URL}/api/postPagePostGet?postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['applicationList'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return data.postRows[0]
    }
  } catch (error) {
    console.error('postPagePostGet: ' + error)
    return null
  }
}

interface Props {
  postId: number
}

export default async function RaidPostUpdate({ postId }: Props) {
  const postData: Post = await fetchPostData(postId)
  const session = await getServerSession(authOptions)
  let createPostCharacter: CharacterInfo[] = []
  if (session && session.user.id) {
    createPostCharacter = await UtileCharacterDataFetch(session.user.id)
  }
  return (
    <div className='flex h-full w-full flex-col justify-center rounded-md border border-gray-400 p-4'>
      <span className='flex h-14 items-center justify-center rounded-md border border-gray-500 bg-gray-900 p-2 text-xl text-white'>
        📝 &nbsp; <span className='font-semibold'>{postData.raid_name} 수정 중</span> &nbsp; 📝
      </span>
      <UpdateFieldComponent postData={postData} createPostCharacter={createPostCharacter} />
    </div>
  )
}
