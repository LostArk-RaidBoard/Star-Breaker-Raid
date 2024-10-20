'use client'

import { applicationListTage, teacherTage, wePostTage } from '@/app/action'
import ApplicationCharacterSelect from '@/components/select/applicationCharacterSelect'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import { useCharacterInfoList } from '@/store/characterStore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

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

interface RaidApplicationProps {
  raidLimitLevel: number
  postId: number
  post_user: string
}

export default function RaidApplication({
  raidLimitLevel,
  postId,
  post_user,
}: RaidApplicationProps) {
  const [hope, setHope] = useState('')
  const [state, setState] = useState(1)
  const [message, setMessage] = useState('')
  const { data: session } = useSession()
  const { characterInfo } = useCharacterInfoList()
  const [loading, setLoading] = useState(0)
  const [getCharacterList, setGetCharacterList] = useState<CharacterInfo[]>([])

  /**
   * 지원자 DB에 저장
   * @returns 에러
   */
  const applicationSave = async () => {
    setLoading(1)
    if (characterInfo[0].character_name === '캐릭터 없음') {
      setMessage('지원가능 캐릭터가 없습니다.')
      setState(2)
      setLoading(0)
      return
    }

    if (session && session?.user.id) {
      if (post_user === session.user.id) {
        setMessage('본인이 개설한 모집글입니다.')
        setState(2)
        setLoading(0)
        return
      }

      const applicationList = {
        user_id: session.user.id,
        character_name: characterInfo[0].character_name,
        hope: hope,
        post_id: postId,
        character_image: characterInfo[0].class_image,
        character_icon: characterInfo[0].class_icon_url,
        character_elixir: characterInfo[0].elixir,
        character_transcendence: characterInfo[0].transcendence,
        character_level: characterInfo[0].character_level,
      }
      try {
        const response = await fetch('/api/applicationSave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationList),
        })

        const data = await response.json()
        if (response && response.status === 200) {
          setState(1)
          await applicationListTage()
          await wePostTage()
          await teacherTage()
          setLoading(0)
        } else {
          setMessage(data.message)
          setState(2)
          setLoading(0)
        }
      } catch (error) {
        console.error(error)
        setMessage('서버의 연결 실패')
        setState(2)
        setLoading(0)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHope(event.target.value)
  }

  useEffect(() => {
    const applicationFetch = async () => {
      if (session && session.user.id) {
        const applicationCharacter = await UtileCharacterDataFetch(session.user.id)
        setGetCharacterList(applicationCharacter)
      } else {
        setGetCharacterList([])
      }
    }

    applicationFetch()
    setMessage('')
    setState(0)
  }, [, session])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border p-4 shadow-lg'>
      <div className='flex w-full flex-col items-center justify-center gap-4 sm:flex-col lg:flex-row'>
        <ApplicationCharacterSelect
          raidLimitLevel={raidLimitLevel}
          applicationCharacter={getCharacterList}
        />

        <div className='w-full lg:basis-1/4'>
          <input
            className={`h-12 w-full rounded-md border border-gray-400 px-1 lg:min-w-[300px]`}
            type={'text'}
            name={'text'}
            autoComplete='off'
            value={hope}
            maxLength={30}
            placeholder={'희망사항'}
            onChange={handleChange}
          ></input>
        </div>

        <button
          className='flex w-24 items-center justify-center text-nowrap rounded-md border bg-gray-900 p-2 px-4 text-white sm:ml-4'
          disabled={loading === 1}
          onClick={() => {
            applicationSave()
          }}
        >
          <span className={`${loading === 0 ? '' : 'hidden'}`}>지원 신청</span>
          <span className={`${loading === 1 ? '' : 'hidden'}`}>로딩중...</span>
        </button>
      </div>
      <div className='flex w-full items-center justify-center'>
        <span className={`${state === 1 ? '' : 'hidden'} text-blue-500`}>지원 성공</span>
        <span className={`${state === 2 ? '' : 'hidden'} text-red-500`}>지원 실패 : {message}</span>
      </div>
    </div>
  )
}
