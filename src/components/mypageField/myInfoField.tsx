import PasswordChange from '@/components/mypageField/passwordChange'
import UserDelete from '@/components/mypageField/userDelete'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import MyInfoComponent from '@/components/mypageField/myInfoComponent'

export default async function MyInfoField() {
  const session = await getServerSession(authOptions)
  let userId = ''
  if (session && session.user.id) {
    userId = session.user.id
  }
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 sm:mt-8'>
      <MyInfoComponent userId={userId} />
      <PasswordChange userId={userId} />
      <UserDelete userId={userId} />
    </div>
  )
}
