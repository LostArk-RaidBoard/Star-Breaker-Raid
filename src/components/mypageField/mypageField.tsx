import CharactorField from '@/components/mypageField/charactorField'
import MyPost from '@/components/mypageField/myPost'
import PasswordChange from '@/components/mypageField/passwordChange'
import UserDelete from '@/components/mypageField/userDelete'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import CharacterSorted from '@/components/utils/characterSorted'

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

async function dataFetch(userId: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/characterGet?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['mypageCharacter'] },
    })

    const data = await response.json()

    if (response.ok && data.result) {
      const getCharacterList = data.result
      const charcter = CharacterSorted(getCharacterList)
      return charcter
    }
  } catch (error) {
    console.error(error)

    return []
  }
}

export default async function MypageField() {
  const session = await getServerSession(authOptions)
  let userId = ''
  let serverCharacter: CharacterInfo[] = []
  if (session && session.user.id) {
    serverCharacter = (await dataFetch(session.user.id)) ?? []
    userId = session.user.id
  }

  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='w-full rounded-md border shadow-lg'>
        <CharactorField userId={userId} dbCharacter={serverCharacter} />
      </div>
      <div className='w-full rounded-md border shadow-lg'>
        <MyPost userId={userId} />
      </div>

      <div className='mt-8 flex h-96 w-full flex-col items-center justify-center gap-4 sm:h-56 sm:flex-row'>
        <PasswordChange userId={userId} />
        <UserDelete userId={userId} />
      </div>
    </div>
  )
}
