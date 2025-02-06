'use client'

import UpdateRaidButton from '@/components/button/UpdateRaidButton'
import RaidUpdateCalendarPick from '@/components/calendar/RaidUpdateCalendarPick'
import UpdateRaidDetail from '@/components/raidPostField/raidPostUpdate/UpdateRaidDetail'
import UpdateRaidMaxTime from '@/components/raidPostField/raidPostUpdate/UpdateRaidMaxTime'
import UpdateRaidNoti from '@/components/raidPostField/raidPostUpdate/UpdateRaidNoti'
import UpdateRaidCharacterSelect from '@/components/select/UpdateRaidCharacterSelect'
import React, { useEffect, useState } from 'react'

interface Post {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
  nickname: string
  raid_level: string
  raid_gateway: string
}

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
  postData: Post
  createPostCharacter: CharacterInfo[]
}

export default function UpdateField({ postData, createPostCharacter }: Props) {
  const [updateTime, setUpdateTime] = useState<Date>(new Date(postData.raid_time))
  const [updateRaidType, setUpdateRaidType] = useState(postData.raid_type)
  const [updateRaidMaxTime, setUpdateRaidMaxTime] = useState(postData.raid_maxtime)
  const [updateCharacterSelect, setUpdateCharacterSelect] = useState<CharacterInfo | undefined>()
  const [updateRaidNoti, setUpdateRaidNoti] = useState(postData.noti)
  useEffect(() => {
    setUpdateTime(new Date(postData.raid_time))
    setUpdateRaidType(postData.raid_type)
    setUpdateRaidMaxTime(postData.raid_maxtime)
    const selectedCharacter = createPostCharacter.find(
      (char) => char.character_name === postData.character_name,
    )
    setUpdateCharacterSelect(selectedCharacter)
    setUpdateRaidNoti(postData.noti)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='rounded-xl border border-gray-400 p-6 shadow-lg'>
      <div className='flex flex-col gap-8 sm:flex-row'>
        {/* 왼쪽 섹션 */}
        <div className='flex flex-col gap-6 sm:w-1/2'>
          {/* 캐릭터 선택 */}
          <div className='p-4'>
            <h2 className='mb-2 text-lg font-semibold text-gray-900'>캐릭터 선택</h2>
            <UpdateRaidCharacterSelect
              createPostCharacter={createPostCharacter}
              limitLevel={postData.limit_level}
              updateCharacterSelect={updateCharacterSelect}
              setUpdateCharacterSelect={setUpdateCharacterSelect}
            />
          </div>

          {/* 날짜 및 시간 선택 */}

          <RaidUpdateCalendarPick updateTime={updateTime} setUpdateTime={setUpdateTime} />

          {/* 레이드 타입 */}
          <UpdateRaidDetail updateRaidType={updateRaidType} setUpdateRaidType={setUpdateRaidType} />
        </div>

        {/* 오른쪽 섹션 */}
        <div className='flex flex-col gap-6 sm:w-1/2'>
          {/* 최대 시간 설정 */}

          <UpdateRaidMaxTime
            updateRaidMaxTime={updateRaidMaxTime}
            setUpdateRaidMaxTime={setUpdateRaidMaxTime}
          />

          {/* 공지사항 수정 */}

          <UpdateRaidNoti setUpdateRaidNoti={setUpdateRaidNoti} updateRaidNoti={updateRaidNoti} />
        </div>
      </div>

      {/* 업데이트 버튼 */}
      <div className='mt-8 flex justify-center'>
        <UpdateRaidButton
          postId={postData.post_id}
          raidName={postData.raid_name}
          updateTime={updateTime}
          updateRaidType={updateRaidType}
          updateRaidMaxTime={updateRaidMaxTime}
          updateCharacterSelect={updateCharacterSelect}
          updateRaidNoti={updateRaidNoti}
        />
      </div>
    </div>
  )
}
