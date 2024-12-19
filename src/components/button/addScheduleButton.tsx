'use client'

import { createPostTage } from '@/app/action'
import CalendarSelect from '@/components/raidPostField/calendarSelect'

import RaidSelect from '@/components/select/raidSelect'
import raidGold from '@/components/utils/raidGold'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import { useEffect, useState } from 'react'

interface Props {
  userId: string
}

export default function AddScheduleButton({ userId }: Props) {
  const [moOpen, setMoOpen] = useState(false)
  const { setReset, raidDate, raidSelect } = useRaidSelect()
  const { setCharacterAllList, characterAllList } = useCharacterInfoList()
  const [characterName, setCharacterName] = useState('')

  const addScheduleHandler = () => {
    setMoState()
  }

  const setMoState = () => {
    setMoOpen(!moOpen)
  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacterName(e.target.value)
  }

  const scheduleFetchHandler = async () => {
    const gold = raidGold(raidSelect)
    try {
      const response = await fetch(
        `/api/mypageSchedulePost?user_id=${userId}&raid_gold=${gold}&schedule_time=${raidDate}&character_name=${characterName}&raid_name=${raidSelect}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.ok && response.status === 200) {
        createPostTage()
        setMoOpen(!moOpen)
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
      setCharacterName(characterlist[0].character_name)
    }
    characterFetch(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <button
        className='rounded-md bg-gray-900 p-1 px-2 text-white'
        onClick={() => {
          addScheduleHandler()
        }}
      >
        일정 추가
      </button>

      {/* bg-black bg-opacity-50 */}
      {moOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30'>
          <div className='flex w-[300px] flex-col rounded-lg bg-white p-4 shadow-lg'>
            <h1 className='text-xl font-bold'>일정 추가</h1>
            <RaidSelect />
            <CalendarSelect />
            <span className='text-lg'>• 캐릭터 선택</span>
            <select
              name='scheduleCharacterSelect'
              aria-label='스케줄 케릭터 선택'
              className='mt-1 h-12 w-full rounded-md border px-1 text-lg'
              value={characterName}
              onChange={selectHandler}
            >
              {characterAllList.map((item, index) => (
                <option key={index} className='text-base' value={item.character_name}>
                  {item.character_name}
                </option>
              ))}
            </select>

            <div className='flex w-full items-center justify-center gap-4'>
              <button
                className='mt-4 w-24 rounded-md bg-gray-900 p-1 px-2 text-white'
                onClick={() => {
                  scheduleFetchHandler()
                }}
              >
                저장
              </button>
              <button
                className='mt-4 w-24 rounded-md bg-gray-900 p-1 px-2 text-white'
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
