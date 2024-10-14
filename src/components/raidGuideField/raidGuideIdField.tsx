import RaidGudiePlayer from '@/components/raidGuideField/raidGuideVideo'
import Image from 'next/image'
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
}

export default function RaidGuidedIdField({ raideGuide }: Props) {
  const youtubeURLs = JSON.parse(raideGuide.youtube_url) as string[]
  const raideImage = JSON.parse(raideGuide.image_url) as string[]
  const raideYoutubeURLsArray = Object.values(youtubeURLs)
  const raideImageArray = Object.values(raideImage)

  return (
    <div className='flex h-full w-full flex-col rounded-md border p-4 shadow-lg'>
      <h1 className='text-2xl'>{raideGuide.guide_name} 레이드 가이드</h1>
      <h1 className='mt-4 text-xl'>{raideGuide.guide_name} 레이드 공략 추천 동영상</h1>

      <RaidGudiePlayer raideYoutubeURLsArray={raideYoutubeURLsArray} />

      <h3 className='mt-4 text-xl'>* 컨닝페이퍼</h3>

      <div className='mt-2 grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2'>
        {raideImageArray.map((imageUrl, key: number) => (
          <div className='relative h-[400px] w-full sm:h-[700px]' key={key}>
            <Image
              src={imageUrl as string}
              alt={'발탄 1관문 페이지'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-fill'
              priority // 우선 로드 속성 추가
            />
          </div>
        ))}
      </div>
    </div>
  )
}
