import Image from 'next/image'
import Link from 'next/link'
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
  like_count: number
}

interface Props {
  userId: string
}
const raidGuideFetch = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/mainAPI/raidGuideMainGet?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['raidGudieLike'], revalidate: 10 },
      },
    )

    const data = await response.json()
    if (response.ok) {
      return data.guideRows
    } else {
      return []
    }
  } catch (error) {
    console.error('MainraidGuide Error : ' + error)
    return []
  }
}

export default async function MainRaidGuide({ userId }: Props) {
  const raideGuide = await raidGuideFetch(userId)
  return (
    <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {raideGuide.map((item: RaidGuide, key: number) => (
        <div
          key={key}
          className='flex flex-col items-center overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl'
        >
          {/* 이미지 영역 */}
          <div className='relative h-60 w-full overflow-hidden rounded-t-xl'>
            <Link href={`/raidguide/${item.guide_id}`} scroll={false}>
              <Image
                src={item.raid_main_image}
                alt='레이드 대표 이미지'
                width={200}
                height={200}
                sizes='(max-width: 768px) 100vw, (min-width: 769px) 50vw'
                loading='lazy'
                className='h-full w-full object-cover'
              />
              {/* 오버레이 효과 */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
            </Link>
          </div>

          {/* 텍스트 영역 */}
          <div className='flex w-full items-center justify-center bg-gray-800 p-3'>
            <span className='truncate text-center text-lg font-semibold text-white'>
              {item.guide_name} 공략
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
