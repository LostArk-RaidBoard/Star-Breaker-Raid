'use client'

import RaidLevelPicker from '@/components/raidPostField/raidPostCreate/RaidLevelPicker'
import RaidGatewayPicker from '@/components/raidPostField/raidPostCreate/RaidGatewayPicker'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import ScheduleCalendarSelect from '@/components/calendar/ScheduleCalendarSelect'
import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import RaidSelect from '@/components/select/RaidSelector'
import React, { useEffect, useState } from 'react'
import GetRaidGold from '@/components/utils/GetRaidGold'
import { createPostTage } from '@/app/action'
import { useSession } from 'next-auth/react'

interface Props {
  userId: string
}

/**
 * 마이페이지 일정 추가 버튼
 * @param userId : 유저 식별 ID
 * @returns
 */
export default function ScheduleCreateButton({ userId }: Props) {
  const [moOpen, setMoOpen] = useState(false)
  const { setReset, raidDate, raidSelect, raidGateway, raidLevel } = useRaidSelect()
  const { setCharacterAllList, characterAllList, setCharacterInfo, characterInfo } =
    useCharacterInfoList()
  const [fetchSuccess, setFetchSuccess] = useState(0)
  const { data: session } = useSession()

  const addScheduleHandler = () => {
    setMoState()
  }

  const setMoState = () => {
    setMoOpen(!moOpen)
  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const characterName = e.target.value
    const characterSelectInfo = characterAllList.find(
      (item) => item.character_name === characterName,
    )
    if (characterSelectInfo) {
      setCharacterInfo([characterSelectInfo])
    }
  }

  const scheduleFetchHandler = async () => {
    const raidGoldGetName = raidSelect + ' ' + raidLevel + ' ' + raidGateway

    const gold = GetRaidGold(raidGoldGetName)

    try {
      const response = await fetch(
        `/api/scheduleAPI/schedulePost?user_id=${userId}&raid_gold=${gold}&schedule_time=${raidDate}&character_name=${characterInfo[0].character_name}&raid_name=${raidSelect}&raid_gateway=${raidGateway}&raid_level=${raidLevel}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.ok && response.status === 200) {
        createPostTage()
        setFetchSuccess(1)
        setMoOpen(!moOpen)
      } else if (response.status === 409) {
        setFetchSuccess(2)
      } else {
        setFetchSuccess(3)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setReset()
    const characterFetch = async (userId: string) => {
      const characterlist = await UtileCharacterDataFetch(userId)
      setCharacterAllList(characterlist)
      if (characterlist.length > 0) {
        setCharacterInfo([characterlist[0]])
      }
    }
    if (userId) {
      characterFetch(userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <button
        className='rounded-md bg-gray-800 px-4 py-2 text-white'
        onClick={() => {
          if (!session || !session.user) {
            alert('로그인 해주세요')
          } else {
            addScheduleHandler()
            setFetchSuccess(0)
          }
        }}
      >
        일정 추가
      </button>

      {/* bg-black bg-opacity-50 */}
      {moOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30'>
          <div className='flex w-[350px] flex-col rounded-lg bg-white p-4 shadow-lg'>
            <h1 className='text-xl font-bold'>일정 추가</h1>
            {/* 일정 모달 캐릭터 선택 */}
            <div className='p-4'>
              <h2 className='mb-1 text-base font-semibold text-gray-900'>캐릭터 선택</h2>
              <select
                name='scheduleCharacterSelect'
                aria-label='스케줄 케릭터 선택'
                className='h-12 w-full rounded-md border border-gray-400 px-1 text-lg'
                value={characterInfo[0].character_name}
                onChange={selectHandler}
              >
                {characterAllList.map((item, index) => (
                  <option key={index} className='text-base' value={item.character_name}>
                    {item.character_name}
                  </option>
                ))}
              </select>
            </div>
            {/* 일정 모달 레이드 스케줄 선택 */}
            <RaidSelect />
            <RaidLevelPicker />
            <RaidGatewayPicker />
            {/* 일정 모달 날짜 선택 */}
            <ScheduleCalendarSelect />

            <div className='mt-2 flex w-full items-center justify-center'>
              <span className={`${fetchSuccess === 1 ? '' : 'hidden'} text-blue-500`}>
                일정 추가 성공
              </span>
              <span className={`${fetchSuccess === 2 ? '' : 'hidden'} text-red-500`}>
                일정 추가 실패 : 동일 캐릭터 중복된 일정
              </span>
              <span className={`${fetchSuccess === 3 ? '' : 'hidden'} text-red-500`}>
                일정 추가 실패 : 서버 연결 실패
              </span>
            </div>

            <div className='mt-2 flex w-full items-center justify-center gap-4'>
              <button
                className='w-24 rounded-md bg-gray-800 px-3 py-2 text-gray-100 hover:bg-gray-500'
                onClick={() => {
                  scheduleFetchHandler()
                }}
              >
                저장
              </button>
              <button
                className='w-24 rounded-md bg-gray-800 px-3 py-2 text-gray-100 hover:bg-gray-500'
                onClick={setMoState}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
