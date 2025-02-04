'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from '@image/icon/loading.svg'
import { wePostTage } from '@/app/action'
import RaidGold from '@/components/utils/raidGold'
import React from 'react'

/**
 * 모집 글 등록 버튼 입니다.
 * @returns DB에 모집 글 등록
 */
export default function RaidPostAddButton() {
  const router = useRouter()
  const [postSave, setPostSave] = useState(0)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(0)
  const {
    raidSelect,
    raidLevel,
    raidGateway,
    raidLimitPerson,
    raidMaxTime,
    raidNoti,
    raidDate,
    raidType,
    raidLimitLevel,
    setReset,
  } = useRaidSelect()
  const searchParams = useSearchParams()
  const search = searchParams.get('redirect') || ''

  const { characterInfo } = useCharacterInfoList()
  const { data: session } = useSession()

  // 현재 시간과 raidDate 간의 차이가 5분 이내인지 확인하는 함수
  const isWithinFiveMinutes = (date1: Date, date2: Date) => {
    const diffInMs = Math.abs(date1.getTime() - date2.getTime()) // 두 날짜의 차이 (밀리초 단위)
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60) // 밀리초를 분 단위로 변환
    return diffInMinutes <= 5
  }

  const raidCreateHandler = async () => {
    setLoading(1)

    if (!session || !session.user) {
      setMessage('로그인 해주세요.')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (session && session.user && session.user.nickName === '') {
      setMessage('넥네임이 없습니다.')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (raidLimitLevel == 0) {
      setMessage('레이드 선택을 해주세요')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (raidType == '') {
      setMessage('레이드 타입을 정해주세요')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (characterInfo[0].character_name === '캐릭터 없음') {
      setMessage('레이드에 알맞는 공대장 캐릭터를 선정해 주세요')
      setPostSave(2)
      setLoading(0)
      return
    }

    if (raidDate) {
      // 현재 시간과 초, 밀리초를 제외하고 5분 이내인지 비교
      if (isWithinFiveMinutes(new Date(), raidDate)) {
        setMessage('레이드 날짜를 선택해주세요')
        setPostSave(2)
        setLoading(0)
        return
      }
    }

    const raidGoldGetName = raidSelect + ' ' + raidLevel + ' ' + raidGateway
    const raidGold = RaidGold(raidGoldGetName)

    try {
      const response = await fetch(
        `/api/raidPostAPI/raidPostSave?raid_name=${raidSelect}&raid_time=${raidDate}&limit_level=${raidLimitLevel}&user_id=${session.user.id}&post_position=${session.user.role}&noti=${raidNoti}&character_name=${characterInfo[0].character_name}&character_classicon=${characterInfo[0].class_icon_url}&raid_limitperson=${raidLimitPerson}&raid_type=${raidType}&raid_maxtime=${raidMaxTime}&character_image=${characterInfo[0].class_image}&raid_gold=${raidGold}&raid_level=${raidLevel}&raid_gateway=${raidGateway}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const data = await response.json()
      if (response.ok) {
        if (response.status === 200) {
          setPostSave(1)
          setLoading(0)

          wePostTage()

          setTimeout(() => router.push(search), 1000)
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

  useEffect(() => {
    setReset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <span className={`${postSave === 1 ? '' : 'hidden'} text-blue-500`}>
        레이드 개설 성공 잠시 후 페이지 이동합니다.
      </span>
      <span className={`${postSave === 2 ? '' : 'hidden'} text-red-500`}>
        레이드 개설 실패 : {message}
      </span>
      <button
        className='mt-2 flex h-10 w-32 items-center justify-center rounded-md border bg-gray-800 px-4 py-3 text-lg text-white hover:bg-gray-500'
        disabled={loading === 1 || postSave === 1}
        onClick={raidCreateHandler}
      >
        <span className={`${loading === 0 ? '' : 'hidden'}`}>모집 글 등록</span>
        <span className={`${loading === 1 ? '' : 'hidden'}`}>
          <Loading className='h-8 w-8' />
        </span>
      </button>
    </div>
  )
}
