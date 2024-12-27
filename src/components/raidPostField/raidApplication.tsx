'use client'

import { applicationListTage, wePostTage } from '@/app/action'
import ApplicationCharacterSelect from '@/components/select/applicationCharacterSelect'
import RaidGold from '@/components/utils/raidGold'
import { useCharacterInfoList } from '@/store/characterStore'
import { useEffect, useState } from 'react'

interface RaidApplicationProps {
  userId: string
  raidLimitLevel: number
  postId: number
  post_user: string
  raid_name: string
  schedule: Date
}

export default function RaidApplication({
  userId,
  raidLimitLevel,
  postId,
  post_user,
  raid_name,
  schedule,
}: RaidApplicationProps) {
  const [hope, setHope] = useState('')
  const [state, setState] = useState(1)
  const [message, setMessage] = useState('')
  const { characterInfo } = useCharacterInfoList()
  const [loading, setLoading] = useState(0)

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

    if (userId != '') {
      if (post_user === userId) {
        setMessage('본인이 개설한 모집글입니다.')
        setState(2)
        setLoading(0)
        return
      }

      const applicationList = {
        user_id: userId,
        character_name: characterInfo[0].character_name,
        hope: hope,
        post_id: postId,
        character_image: characterInfo[0].class_image,
        character_icon: characterInfo[0].class_icon_url,
        character_elixir: characterInfo[0].elixir,
        character_transcendence: characterInfo[0].transcendence,
        character_level: characterInfo[0].character_level,
        raid_name: raid_name,
        raid_gold: RaidGold(raid_name),
        schedule: schedule,
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
    setMessage('')
    setState(0)
  }, [userId])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border border-gray-400 p-4 shadow-lg'>
      <div className='flex w-full flex-col items-center justify-center gap-4 sm:flex-col xl:flex-row'>
        <ApplicationCharacterSelect raidLimitLevel={raidLimitLevel} userId={userId} />

        <div className='w-full lg:basis-1/4'>
          <input
            className={`h-12 w-full rounded-md border border-gray-400 px-1 xl:min-w-[300px]`}
            type={'text'}
            name={'text'}
            autoComplete='off'
            value={hope}
            maxLength={30}
            placeholder={'의견'}
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
