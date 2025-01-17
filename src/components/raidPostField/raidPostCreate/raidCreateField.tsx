import RaidPostCreateButton from '@/components/button/raidPostButton'

import RaidDetail from '@/components/raidPostField/raidPostCreate/raidDetail'
import RaidMaxTime from '@/components/raidPostField/raidPostCreate/raidMaxTime'
import RaidNoti from '@/components/raidPostField/raidPostCreate/raidNoti'
import RaidCharacterSelect from '@/components/select/raidCharacterSelect'
import RaidLimitPersonSelect from '@/components/select/raidLimitPerson'
import RaidSelect from '@/components/select/raidSelect'
import { auth } from '@/auth'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import React from 'react'
import CalendarPick from '@/components/calendar/calendar'

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
export default async function RaidCreateField() {
  const session = await auth()
  let createPostCharacter: CharacterInfo[] = []
  if (session && session.user.id) {
    createPostCharacter = await UtileCharacterDataFetch(session.user.id)
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 rounded-md border border-gray-400 p-4 shadow-lg'>
      {session && session.user.id ? (
        <>
          <h1 className='text-xl font-bold'>{session.user.nickName}님 모집 글 등록</h1>
          <p className={`${session.user.nickName === '' ? '' : 'hidden'} text-red-500`}>
            닉네임을 설정해야 모집 글 등록이 가능합니다.
            <br /> 마이페이지-내 정보-닉네임 설정
          </p>
          <div className='flex w-full flex-col gap-8 sm:flex-row'>
            {/* 왼쪽 : 레이드 선택, 레이드 최대 정원, 날짜 선택, 레이드 숙련도 선택 */}
            <div className='flex w-full flex-col gap-5 sm:w-[50%]'>
              <RaidSelect />
              <RaidLimitPersonSelect />
              <CalendarPick />
              <RaidDetail />
            </div>
            {/* 오른쪽 : 캐릭터 선택, 레이드 최대 시간, 공지 사항 선택*/}
            <div className='flex w-full flex-col gap-5 sm:w-[50%]'>
              <RaidCharacterSelect createPostCharacter={createPostCharacter} />
              <RaidMaxTime />
              <RaidNoti />
            </div>
          </div>
          {/* 모집 글 등록 버튼 */}
          <RaidPostCreateButton />
        </>
      ) : (
        <div className='flex items-center justify-center text-lg'>로그인 해주세요</div>
      )}
    </div>
  )
}
