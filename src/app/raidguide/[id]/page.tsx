import HeaderField from '@/components/header/headerField'
import RaidGuidedIdField from '@/components/raidGuideField/raidGuideIdField'
import Section from '@/components/utils/section'

interface RaidGuide {
  guide_id: number
  guide_name: string
  youtube_url: string
  image_url: string
  create_at: string
  update_at: string
  raid_main_image: string
  role_id: number
}

interface IdParams {
  params: { id: number }
}
const handleFetch = async (id: number) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidGuidePerGet?raidGuideId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export default async function Raidguide({ params: { id } }: IdParams) {
  const raideGuide: RaidGuide[] = await handleFetch(id)

  return (
    <Section>
      <main className='flex h-full w-full flex-col items-center gap-4'>
        <HeaderField />
        <RaidGuidedIdField raideGuide={raideGuide[0]} />
      </main>
    </Section>
  )
}
