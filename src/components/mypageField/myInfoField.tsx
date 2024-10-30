import PasswordChange from '@/components/mypageField/passwordChange'
import UserDelete from '@/components/mypageField/userDelete'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import MyInfoComponent from '@/components/mypageField/myInfoComponent'
import MyInfoNickName from '@/components/mypageField/myInfoNickName'

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
  } catch (error) {
    console.error('myInfoFetch 에러')
  }
  return []
}

export default async function MyInfoField() {
  const session = await getServerSession(authOptions)
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
    <div className='flex w-full flex-col items-center justify-center gap-4 sm:mt-8'>
      <MyInfoComponent myInfoData={myInfoData} />
      <MyInfoNickName userId={userId} />
      <PasswordChange userId={userId} />
      <UserDelete userId={userId} />
    </div>
  )
}
