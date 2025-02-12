import RaidGuideImageViewer from '@/components/raidGuideField/RaidGuideImageViewer'
import RaidGuideVideoPlayer from '@/components/raidGuideField/RaidGuideVideoPlayer'
import RaidRewardView from '@/components/raidGuideField/RaidRewardView'
import React from 'react'

type raidRewardItem = {
  reward_id: number
  guide_id: number
  gate: number
  difficulty: string
  item_name: string
  quantity: string
  image_url: string
  is_extra_reward: boolean
}
interface Props {
  raideGuide: {
    guide_id: number
    guide_name: string
    youtube_url: string
    image_url: string
    create_at: string
    update_at: string
    raid_main_image: string
    role_id: number
  }
  raideReward: raidRewardItem[]
}

// 유튜브 nocookie URL에서 비디오 ID 추출 함수
const extractVideoId = (url: string) => {
  const regex = /\/embed\/([^?]*)/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function RaidGuideDetailView({ raideGuide, raideReward }: Props) {
  const youtubeURLs = JSON.parse(raideGuide.youtube_url) as string[]
  const raideImage = JSON.parse(raideGuide.image_url) as string[]
  const raideYoutubeURLsArray = Object.values(youtubeURLs)
  const raideImageArray = Object.values(raideImage)

  // youtubue URL에서 video Id 추출하기
  const raidYoutubeVideoId: string[] = []
  if (raideYoutubeURLsArray) {
    for (const youtube_url of raideYoutubeURLsArray) {
      const youtube_id = extractVideoId(youtube_url)
      if (youtube_id) {
        raidYoutubeVideoId.push(youtube_id)
      }
    }
  }

  return (
    <div className='flex h-full w-full flex-col rounded-md border border-gray-400 p-4 shadow-lg sm:px-12'>
      <h1 className='text-2xl font-semibold'>{raideGuide.guide_name} 레이드 공략</h1>
      <h2 className='mt-4 text-xl font-semibold'>{raideGuide.guide_name} 레이드 공략 동영상</h2>
      <RaidGuideVideoPlayer raidYoutubeVideoId={raidYoutubeVideoId} />
      <RaidGuideImageViewer raideImageArray={raideImageArray} />
      <RaidRewardView raideReward={raideReward} raidName={raideGuide.guide_name} />
    </div>
  )
}
