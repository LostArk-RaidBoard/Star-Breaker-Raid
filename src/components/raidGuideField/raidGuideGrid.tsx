'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from '@image/icon/loading.svg'
import Like from '@image/icon/like.svg'
import { raidGuideLike } from '@/app/action'

interface RaidGuide {
  guide_id: number
  guide_name: string
  youtube_url: string[]
  image_url: string[]
  create_at: string
  update_at: string
  raid_main_image: string
  role_id: number
  like_count: number
}

const raidGuideFetch = async (raidName: string, userId: string) => {
  if (!raidName || raidName === '') {
    raidName = 'all'
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/raidGuideGet?raidGuide=${raidName}&userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      },
    )
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
interface Props {
  userId: string
}

export default function RaidGuideGrid({ userId }: Props) {
  const [raidGuides, setRaidGuides] = useState<RaidGuide[]>([])
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const raidName = searchParams.get('raidName') || '' // 쿼리 파라미터에서 raidName 가져오기

  const likeHandler = async (guide_id: number) => {
    if (userId === '') {
      alert('로그인 후 가능합니다.')
      return
    }

    try {
      const response = await fetch(`/api/raidGuideLikePost?guide_id=${guide_id}&userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok) {
        raidGuideLike()

        const data = await raidGuideFetch(raidName, userId)
        setRaidGuides(data)
      } else {
        alert('오류가 발생')
        return
      }
    } catch (error) {
      console.error('like Fetch Error: ' + error)
    }
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await raidGuideFetch(raidName, userId)
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
          <div className='relative h-[90%] w-full rounded-md'>
            <button
              className='hover:-translate-all absolute right-3 top-3 stroke-white stroke-1 hover:scale-110'
              onClick={() => {
                likeHandler(item.guide_id)
              }}
            >
              <Like className={`${item.like_count != 0 ? 'fill-red-500' : ''}`} />
            </button>
            <Link href={`/raidguide/${item.guide_id}`}>
              <Image
                src={item.raid_main_image}
                alt='레이드 대표 이미지'
                width={200}
                height={200}
                priority
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
