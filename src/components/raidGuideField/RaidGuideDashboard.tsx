import RaidGuideGallery from '@/components/raidGuideField/RaidGuideGallery'
import RaidGuideInputForm from '@/components/raidGuideField/RaidGuideInputForm'
import { auth } from '@/auth'
import RaidGuideAddButton from '@/components/button/RaidGuideAddButton'
import React from 'react'

export default async function RaidGuideDashboard() {
  const session = await auth()
  const role = session?.user.role
  let userId = ''
  if (session && session.user.id) {
    userId = session.user.id
  }
  const roleCheck = role === 'admin'

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='h-12 w-full'>
        <RaidGuideInputForm />
      </div>
      <div className={`flex h-12 w-full items-center justify-end ${roleCheck ? '' : 'hidden'}`}>
        <RaidGuideAddButton />
      </div>
      <div className='mt-8 h-full w-full'>
        <RaidGuideGallery userId={userId} />
      </div>
    </div>
  )
}
