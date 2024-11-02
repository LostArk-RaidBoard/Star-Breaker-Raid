'use server'
import Image from 'next/image'
import Link from 'next/link'

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

const raidGuideFetch = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidGuideMainGet?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['raidGudieLike'] },
    })
    console.log('MainGuideFetch')
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

interface Props {
  userId: string
}
export default async function MainRaidGuide({ userId }: Props) {
  const raideGuide: RaidGuide[] = await raidGuideFetch(userId)

  return (
    <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {raideGuide.map((item: RaidGuide, key: number) => (
        <div className='h-72 rounded-md' key={key}>
          <div className='h-[90%] w-full rounded-md'>
            <Link href={`/raidguide/${item.guide_name}`}>
              <Image
                src={item.raid_main_image}
                alt='레이드 대표 이미지'
                width={200}
                height={200}
                sizes='(max-width: 768px) 100vw, (min-width: 769px) 50vw'
                loading='lazy'
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
