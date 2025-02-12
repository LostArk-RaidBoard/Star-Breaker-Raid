import HeaderLayout from '@/components/header/HeaderLayout'
import RaidGuideDetailView from '@/components/raidGuideField/RaidGuideDetailView'
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

interface RaidReward {
  reward_id: number
  guide_id: number
  gate: number
  difficulty: string
  item_name: string
  quantity: string
  image_url: string
  is_extra_reward: boolean
}

const handleFetch = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/raidGuideAPI/raidGuidePerGet?raidGuideId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    if (response.ok) {
      return data.guideRows
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

const rewardHandler = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/raidGuideAPI/raidRewardGet?raidGuideId=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
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
  const raideReward: RaidReward[] = await rewardHandler(id)

  return (
    <>
      <HeaderLayout />
      <Section>
        <main className='flex h-full w-full flex-col items-center gap-4 sm:px-32'>
          <RaidGuideDetailView raideGuide={raideGuide[0]} raideReward={raideReward} />
        </main>
      </Section>
    </>
  )
}
