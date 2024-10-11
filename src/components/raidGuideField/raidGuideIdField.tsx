import RaidGudiePlayer from '@/components/raidGuideField/raidGuideVideo'
import Image from 'next/image'

const image_list = [
  'https://upload3.inven.co.kr/upload/2024/03/19/bbs/i15452189697.jpg?MW=800',
  'https://upload3.inven.co.kr/upload/2024/03/19/bbs/i15414152492.jpg?MW=800',
]

export default function RaidGuidedIdField() {
  return (
    <div className='flex h-full w-full flex-col rounded-md border p-4 shadow-lg'>
      <h1 className='text-2xl'> 레이드 가이드</h1>
      <h1 className='mt-4 text-xl'> 레이드 공략 추천 동영상</h1>

      <RaidGudiePlayer />

      <h3 className='mt-4 text-xl'>* 컨닝페이퍼</h3>

      <div className='mt-2 grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2'>
        {image_list.map((items, key) => (
          <div className='relative h-[400px] w-full sm:h-[700px]' key={key}>
            <Image
              src={items}
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
