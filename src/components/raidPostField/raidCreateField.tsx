import RaidPostCreateButton from '@/components/button/raidPostButton'
import CalendarPick from '@/components/raidPostField/calendar'
import RaidDetail from '@/components/raidPostField/raidDetail'
import RaidMaxTime from '@/components/raidPostField/raidMaxTime'
import RaidNoti from '@/components/raidPostField/raidNoti'
import RaidCharacterSelect from '@/components/select/raidCharacterSelect'
import RaidLimitPersonSelect from '@/components/select/raidLimitPerson'
import RaidSelect from '@/components/select/raidSelect'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'

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
  const session = await getServerSession(authOptions)
  let createPostCharacter: CharacterInfo[] = []
  if (session && session.user.id) {
    createPostCharacter = await UtileCharacterDataFetch(session.user.id)
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 rounded-md border p-4 shadow-lg'>
      {session && session.user.id ? (
        <>
          <h1 className='text-xl'>* {session.user.nickName} 레이드 개설</h1>
          <p className={`${session.user.nickName === '' ? '' : 'hidden'} text-red-500`}>
            닉네임을 설정해야 모집 글 등록이 가능합니다.
            <br /> 마이페이지-내 정보-닉네임 설정
          </p>
          <div className='flex w-full flex-col gap-8 sm:flex-row'>
            {/* 왼쪽 */}
            <div className='flex w-full flex-col gap-5 sm:w-[50%]'>
              <RaidSelect />
              <RaidLimitPersonSelect />
              <CalendarPick />
              <RaidDetail />
            </div>
            {/* 오른쪽 */}
            <div className='flex w-full flex-col gap-5 sm:w-[50%]'>
              <RaidCharacterSelect createPostCharacter={createPostCharacter} />
              <RaidMaxTime />
              <RaidNoti />
            </div>
          </div>
          <RaidPostCreateButton />
        </>
      ) : (
        <div className='flex items-center justify-center text-lg'>로그인 해주세요</div>
      )}
    </div>
  )
}
