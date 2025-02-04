'use client'

import React, { useEffect, useState } from 'react'
import RaidGold from '@/components/utils/raidGold'
import { useCharacterInfoList } from '@/store/characterStore'
import { applicationListTage, wePostTage } from '@/app/action'
import CharacterSelectDropdown from '@/components/select/CharacterSelectDropdown'

interface RaidApplicationProps {
  userId: string
  raidLimitLevel: number
  postId: number
  post_user: string
  raid_name: string
  raid_level: string
  raid_gateway: string
  schedule: Date
}

export default function RaidApplicationForm({
  userId,
  raidLimitLevel,
  postId,
  post_user,
  raid_name,
  raid_level,
  raid_gateway,
  schedule,
}: RaidApplicationProps) {
  const [hope, setHope] = useState('')
  const [message, setMessage] = useState('')
  const { characterInfo } = useCharacterInfoList()
  const [loading, setLoading] = useState(0)

  /**
   * 지원자 DB에 저장
   * @returns 에러
   */
  const applicationSave = async () => {
    setMessage('')
    setLoading(1)
    if (characterInfo[0].character_name === '캐릭터 없음') {
      setMessage('지원가능 캐릭터가 없습니다.')
      setLoading(0)
      return
    }

    if (userId != '') {
      if (post_user === userId) {
        setMessage('본인이 개설한 모집글입니다.')
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
        raid_name: raid_name,
        raid_level: raid_level,
        raid_gateway: raid_gateway,
        raid_gold: RaidGold(raid_name + ' ' + raid_level + ' ' + raid_gateway),
        schedule: schedule,
      }
      try {
        const response = await fetch('/api/applicationAPI/applicationSave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationList),
        })

        const data = await response.json()
        if (response && response.status === 200) {
          await applicationListTage()
          await wePostTage()
          setLoading(0)
        } else {
          setMessage(data.message)
          setLoading(0)
        }
      } catch (error) {
        console.error(error)
        setMessage('서버의 연결 실패')
        setLoading(0)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHope(event.target.value)
  }

  useEffect(() => {
    setMessage('')
  }, [userId])

  useEffect(() => {
    if (message.length > 0) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 3000)

      // 타이머 정리(clean-up)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className='flex w-full flex-col items-center justify-center gap-8 rounded-lg border border-gray-400 p-6 shadow-lg'>
      {/* 캐릭터 선택 및 입력 섹션 */}
      <div className='flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8'>
        {/* 캐릭터 선택 */}
        <CharacterSelectDropdown raidLimitLevel={raidLimitLevel} userId={userId} />

        {/* 의견 입력 */}
        <div className='relative w-full max-w-md'>
          <input
            className='h-12 w-full rounded-lg border border-gray-600 bg-gray-800 px-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            name='hope'
            autoComplete='off'
            value={hope}
            maxLength={30}
            placeholder='의견을 입력하세요...'
            onChange={handleChange}
          />
        </div>

        {/* 지원 버튼 */}
        <button
          className='flex h-12 w-28 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50'
          disabled={loading === 1}
          onClick={applicationSave}
        >
          {loading === 0 ? (
            '지원 신청'
          ) : (
            <svg
              className='h-6 w-6 animate-spin text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              />
            </svg>
          )}
        </button>
      </div>

      {/* 메시지 출력 */}

      <div
        className={`${message.length > 0 ? '' : 'hidden'} flex items-center justify-center font-semibold ${message === '지원 성공' ? 'text-blue-400' : 'text-red-500'}`}
      >
        {message}
      </div>
    </div>
  )
}
