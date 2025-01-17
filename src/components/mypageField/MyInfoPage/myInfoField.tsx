import PasswordChange from '@/components/mypageField/MyInfoPage/passwordChange'
import UserDelete from '@/components/mypageField/MyInfoPage/userDelete'
import { auth } from '@/auth'
import React from 'react'
import MyInfoComponent from '@/components/mypageField/MyInfoPage/myInfoComponent'
import MyInfoNickName from '@/components/mypageField/MyInfoPage/myInfoNickName'

interface MyinfoFetch {
  user_id: string
  user_name: string
  birthday: number
  nickname: string
  role: string
  applicants_count: number
  applicants_approval: number
  raid_posts_count: number
  character_count: number
}

const myInfoFetch = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypageMyInfoGet?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['myInfo'] },
    })
    const data = await response.json()
    if (response.ok) {
      return data.postRows[0]
    } else {
      return []
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Error 객체인 경우
      console.error('myInfoFetch 에러:', error.message)
    } else {
      // 그 외의 객체나 값인 경우
      console.error('myInfoFetch 에러:', error)
    }
  }
  return []
}

export default async function MyInfoField() {
  const session = await auth()
  let userId = ''
  let myInfoData: MyinfoFetch = {
    user_id: '',
    user_name: '',
    birthday: 0,
    nickname: '',
    role: '',
    applicants_count: 0,
    applicants_approval: 0,
    raid_posts_count: 0,
    character_count: 0,
  }
  if (session && session.user.id) {
    userId = session.user.id
    myInfoData = await myInfoFetch(userId)
  }
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      {/* 내 정보 현황 */}
      <MyInfoComponent myInfoData={myInfoData} />
      {/* 닉네임 변경 */}
      <MyInfoNickName userId={userId} />
      {/* 비밀번호 변경 */}
      <PasswordChange userId={userId} />
      {/* 회원 탈퇴 */}
      <UserDelete userId={userId} />
    </div>
  )
}
