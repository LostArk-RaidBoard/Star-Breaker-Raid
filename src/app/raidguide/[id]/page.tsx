import HeaderField from '@/components/header/headerField'
import RaidGuidedIdField from '@/components/raidGuideField/raidGuideIdField'
import Section from '@/components/utils/section'
import React from 'react'

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

const handleFetch = async (id: string) => {
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

type Params = Promise<{ id: string }>
export default async function Raidguide({ params }: { params: Params }) {
  const { id } = await params
  const raideGuide: RaidGuide[] = await handleFetch(id)

  return (
    <>
      <HeaderField />
      <Section>
        <main className='flex h-full w-full flex-col items-center gap-4'>
          <RaidGuidedIdField raideGuide={raideGuide[0]} />
        </main>
      </Section>
    </>
  )
}
