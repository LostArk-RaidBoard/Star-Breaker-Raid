'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from '@image/icon/loading.svg'

interface RaidGuide {
  guide_id: number
  guide_name: string
  youtube_url: string[]
  image_url: string[]
  create_at: string
  update_at: string
  raid_main_image: string
  role_id: number
}

const raidGuideFetch = async (raidName: string) => {
  if (!raidName || raidName === '') {
    raidName = 'all'
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/raidGuideGet?raidGuide=${raidName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'default',
    })
    const data = await response.json()
    if (response.ok) {
      return data.guideRows
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export default function RaidGuideGrid() {
  const [raidGuides, setRaidGuides] = useState<RaidGuide[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const raidName = searchParams.get('raidName') || '' // 쿼리 파라미터에서 raidName 가져오기

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await raidGuideFetch(raidName)
      setRaidGuides(data)
      setLoading(false)
    }
    fetchData()
  }, [raidName])

  if (loading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loading className='h-12 w-12' />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {raidGuides.map((item: RaidGuide, key: number) => (
        <div className='h-72 rounded-md' key={key}>
          <div className='h-[90%] w-full rounded-md'>
            <Link href={`/raidguide/${item.guide_name}`}>
              <Image
                src={item.raid_main_image}
                alt='레이드 대표 이미지'
                width={200}
                height={200}
                loading='lazy'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='h-full w-full rounded-md object-cover'
              />
            </Link>
          </div>
          <span className='flex w-full justify-center text-lg font-medium text-[#222222]'>
            ✨ {item.guide_name} 공략 ✨
          </span>
        </div>
      ))}
    </div>
  )
}
