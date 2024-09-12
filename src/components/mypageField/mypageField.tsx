import CharactorField from '@/components/mypageField/charactorField'
import PasswordChange from '@/components/mypageField/passwordChange'
import UserDelete from '@/components/mypageField/userDelete'

export default async function MypageField() {
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='w-full rounded-md border shadow-lg'>
        <CharactorField />
      </div>
      <div className='mt-8 flex h-96 w-full flex-col items-center justify-center gap-4 sm:h-56 sm:flex-row'>
        <PasswordChange />
        <UserDelete />
      </div>
    </div>
  )
}
