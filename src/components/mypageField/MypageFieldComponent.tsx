import CharacterManagementField from '@/components/mypageField/characterPage/CharacterManagementField'
import React from 'react'
import { auth } from '@/auth'
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

export default async function MypageFieldComponent() {
  const session = await auth()
  let userId = ''
  let serverCharacter: CharacterInfo[] = []

  if (session && session.user.id) {
    serverCharacter = await UtileCharacterDataFetch(session.user.id)
    userId = session.user.id
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='w-full rounded-md border border-gray-400 shadow-lg'>
        <CharacterManagementField userId={userId} dbCharacter={serverCharacter} />
      </div>
    </div>
  )
}
