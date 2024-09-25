'use client'

import ApplicationCharacterSelect from '@/components/select/applicationCharacterSelect'
import InputLayout from '@/components/ui/inputLayout'
import { useCharacterInfoList } from '@/store/characterStore'
import { useTrigger } from '@/store/triggerStore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

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
  const { applicationTrigger, setApplicationTrigger } = useTrigger()

  const applicationSave = async () => {
    if (characterInfo[0].character_name === '캐릭터 없음') {
      setMessage('지원가능 캐릭터가 없습니다.')
      setState(2)
      return
    }

    if (session && session?.user.id) {
      if (post_user === session.user.id) {
        setMessage('본인이 개설한 모집글입니다.')
        setState(2)
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
      console.log(applicationList)
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
          setApplicationTrigger(!applicationTrigger)
        } else {
          setMessage(data.message)
          setState(2)
        }
      } catch (error) {
        console.error(error)
        setMessage('서버의 연결 실패')
        setState(2)
      }
    }
  }

  useEffect(() => {
    setMessage('')
    setState(0)
  }, [])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border p-4 shadow-lg'>
      <div className='flex flex-col items-center justify-center gap-4 sm:flex-col lg:flex-row'>
        <ApplicationCharacterSelect raidLimitLevel={raidLimitLevel} />

        <div className='w-full lg:basis-1/4'>
          <InputLayout
            setType={'text'}
            setName={'text'}
            setPlaceholder={'희망사항'}
            setCSS={'rounded-md w-full lg:min-w-[300px] border h-12'}
            setValue={setHope}
            value={hope}
          />
        </div>

        <button
          className='ml-4 text-nowrap rounded-md border bg-gray-900 p-2 px-4 text-white'
          onClick={() => {
            applicationSave()
          }}
        >
          지원 신청
        </button>
      </div>
      <div className='flex w-full items-center justify-center'>
        <span className={`${state === 1 ? '' : 'hidden'} text-blue-500`}>지원 성공</span>
        <span className={`${state === 2 ? '' : 'hidden'} text-red-500`}>지원 실패 : {message}</span>
      </div>
    </div>
  )
}
