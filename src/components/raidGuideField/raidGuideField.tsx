import RaidGuideGrid from '@/components/raidGuideField/raidGuideGrid'
import RaidGuideInput from '@/components/raidGuideField/raidGuideInput'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import RadiGuideCreateButton from '@/components/button/raidGuideCreateButton'

export default async function RaidGuideField() {
  const session = await getServerSession(authOptions)
  const role = session?.user.role
  const roleCheck = role === 'teacher'

  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='h-12 w-full'>
        <RaidGuideInput />
      </div>
      <div className={`flex h-12 w-full items-center justify-end ${roleCheck ? '' : 'hidden'}`}>
        <RadiGuideCreateButton />
      </div>
      <div className='mt-8 h-full w-full'>
        <RaidGuideGrid />
      </div>
    </div>
  )
}
