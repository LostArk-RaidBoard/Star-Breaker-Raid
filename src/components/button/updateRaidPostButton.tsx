'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from '@image/icon/loading.svg'
import { applicationListTage, wePostTage } from '@/app/action'

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

interface Props {
  postId: number
  updateTime: Date
  updateRaidType: string
  updateRaidMaxTime: string
  updateCharacterSelect: CharacterInfo | undefined
  updateRaidNoti: string
  raidName: string
}

export default function RaidPostUpdateButton({
  postId,
  updateTime,
  updateRaidType,
  updateRaidMaxTime,
  updateCharacterSelect,
  updateRaidNoti,
  raidName,
}: Props) {
  const router = useRouter()
  const [postSave, setPostSave] = useState(0)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(0)

  const { data: session } = useSession()

  // 현재 시간과 raidDate 간의 차이가 5분 이내인지 확인하는 함수
  const isWithinFiveMinutes = (date1: Date, date2: Date) => {
    const diffInMs = Math.abs(date1.getTime() - date2.getTime()) // 두 날짜의 차이 (밀리초 단위)
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60) // 밀리초를 분 단위로 변환
    return diffInMinutes <= 5
  }

  const raidCreateHandler = async () => {
    setLoading(1)

    if (session?.user.nickName === '') {
      setMessage('넥네임이 없습니다.')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (updateRaidType == '') {
      setMessage('레이드 타입을 정해주세요')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (updateCharacterSelect?.character_name === '캐릭터 없음' || !updateCharacterSelect) {
      setMessage('레이드에 알맞는 공대장 캐릭터를 선정해 주세요')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (updateTime) {
      // 현재 시간과 초, 밀리초를 제외하고 5분 이내인지 비교
      if (isWithinFiveMinutes(new Date(), updateTime)) {
        setMessage('레이드 날짜를 선택해주세요')
        setPostSave(2)
        setLoading(0)
        return
      }
    }

    try {
      const raidPost = {
        postId: postId,
        raidName: raidName,
        raid_time: updateTime,
        noti: updateRaidNoti,
        character_name: updateCharacterSelect.character_name,
        character_classicon: updateCharacterSelect.class_icon_url,
        raid_type: updateRaidType,
        raid_maxtime: updateRaidMaxTime,
        character_image: updateCharacterSelect.class_image,
      }
      const response = await fetch('/api/raidPostAPI/raidPostUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(raidPost),
      })

      const data = await response.json()
      if (response.ok) {
        if (response.status === 200) {
          setPostSave(1)
          setLoading(0)
          await applicationListTage()
          await wePostTage()

          setTimeout(() => router.push(`/raidpost/${postId}`), 2000)
        }
      } else {
        setMessage(data.message)
        setPostSave(2) // 회원가입 실패
        setLoading(0)
      }
    } catch (error) {
      console.error(error)
      setMessage('api 연결 실패')
      setPostSave(2)
      setLoading(0)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <span className={`${postSave === 1 ? '' : 'hidden'} text-blue-500`}>
        레이드 수정 성공 잠시 후 모집글로 이동합니다.
      </span>
      <span className={`${postSave === 2 ? '' : 'hidden'} text-red-500`}>
        레이드 수정 실패 : {message}
      </span>
      <button
        className='mt-2 flex h-10 w-32 items-center justify-center rounded-md border bg-gray-900 p-1 px-2 text-lg text-white hover:bg-gray-500'
        disabled={loading === 1 || postSave === 1}
        onClick={raidCreateHandler}
      >
        <span className={`${loading === 0 ? '' : 'hidden'}`}>모집 글 수정</span>
        <span className={`${loading === 1 ? '' : 'hidden'}`}>
          <Loading className='h-8 w-8' />
        </span>
      </button>
    </div>
  )
}
