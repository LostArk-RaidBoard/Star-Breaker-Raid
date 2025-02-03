import React from 'react'
import { auth } from '@/auth'
import RaidSelector from '@/components/select/RaidSelector'
import CalendarPick from '@/components/calendar/CalendarPick'
import RaidPostCreateButton from '@/components/button/raidPostButton'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import RaidCharacterSelect from '@/components/select/raidCharacterSelect'
import RaidPersonLimitSelector from '@/components/select/RaidPersonLimitSelector'
import RaidTypeSelect from '@/components/raidPostField/raidPostCreate/RaidTypeSelect'
import RaidLevelPicker from '@/components/raidPostField/raidPostCreate/RaidLevelPicker'
import RaidNoticeField from '@/components/raidPostField/raidPostCreate/RaidNoticeField'
import RaidGatewayPicker from '@/components/raidPostField/raidPostCreate/RaidGatewayPicker'
import RaidMaxTimeSelect from '@/components/raidPostField/raidPostCreate/RaidMaxTimeSelect'

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
export default async function RaidCreateForm() {
  const session = await auth()
  let createPostCharacter: CharacterInfo[] = []
  if (session && session.user.id) {
    createPostCharacter = await UtileCharacterDataFetch(session.user.id)
  }

  return (
    <div className='h-full w-full p-6'>
      {session && session.user.id ? (
        <div className='flex flex-col gap-8 rounded-lg border border-gray-400 p-6 shadow-lg'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {session.user.nickName}님 모집 글 등록
          </h1>

          {/* 닉네임 미설정 경고 메시지 */}
          {session.user.nickName === '' && (
            <p className='rounded-md bg-red-500 p-3 text-sm font-medium text-white'>
              닉네임을 설정해야 모집 글 등록이 가능합니다.
              <br />
              마이페이지-내 정보-닉네임 설정에서 닉네임을 설정해주세요.
            </p>
          )}

          <div className='flex w-full flex-col gap-3 sm:flex-row'>
            {/* 왼쪽 섹션 */}
            <div className='flex w-full flex-col gap-3 sm:w-[50%]'>
              <RaidCharacterSelect createPostCharacter={createPostCharacter} />
              <RaidSelector />
              <RaidLevelPicker />
              <RaidGatewayPicker />
              <RaidPersonLimitSelector />
            </div>

            {/* 오른쪽 섹션 */}
            <div className='flex w-full flex-col gap-3 sm:w-[50%]'>
              <CalendarPick />
              <RaidTypeSelect />
              <RaidMaxTimeSelect />
              <RaidNoticeField />
            </div>
          </div>

          {/* 모집 글 등록 버튼 */}
          <div className='flex justify-center'>
            <RaidPostCreateButton />
          </div>
        </div>
      ) : (
        <div className='flex h-full items-center justify-center text-lg text-gray-200'>
          로그인 해주세요
        </div>
      )}
    </div>
  )
}
