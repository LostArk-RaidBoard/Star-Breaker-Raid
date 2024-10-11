import RaidGuideGrid from '@/components/raidGuideField/raidGuideGrid'
import RaidGuideInput from '@/components/raidGuideField/raidGuideInput'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import RadiGuideCreateButton from '@/components/button/raidGuideCreateButton'

interface RaidGuide {
  guide_id: number
  guide_name: string
  youtube_url: string
  detail_guide: string
  image_url: string
  create_at: string
  update_at: string
  guide_image: string
  role_id: number
}

const raidGuideFetch = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidGuideGet?raidGuide=all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['raidGuideTage'] },
    })
    const data = await response.json()
    if (response.ok) {
      return data.guideRows
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function RaidGuideField() {
  const raideGuide: RaidGuide[] = await raidGuideFetch()
  const session = await getServerSession(authOptions)
  const role = session.user.role
  console.log(role)
  let roleCheck = false
  if (role === 'teacher') {
    roleCheck = true
  }

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
