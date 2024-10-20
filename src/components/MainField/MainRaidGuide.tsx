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
}

const raidGuideFetch = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidGuideGet?raidGuide=all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600, must-revaildate',
      },
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

export default async function MainRaidGuide() {
  const raideGuide: RaidGuide[] = await raidGuideFetch()
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
