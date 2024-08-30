import CharactorField from '@/components/mypageField/charactorField'
import PasswordChange from '@/components/mypageField/passwordChange'
import UserDelete from '@/components/mypageField/userDelete'

export default function MypageField() {
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='h-96 w-full rounded-md border shadow-lg'>
        <CharactorField />
      </div>
      <div className='mt-8 flex h-56 w-full items-center justify-center gap-4'>
        <PasswordChange />
        <UserDelete />
      </div>
    </div>
  )
}
