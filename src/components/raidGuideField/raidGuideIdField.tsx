import RaidGudiePlayer from '@/components/raidGuideField/raidGuideVideo'
import Image from 'next/image'

export default function RaidGuidedIdField() {
  const test = `1. dnfkdkdkd
  2. dkdkkd
  3. dkjjfkjdk
  `
  return (
    <div className='flex h-full w-full flex-col rounded-md border p-4 shadow-lg'>
      <h1 className='text-2xl'> 레이드 가이드</h1>
      <h1 className='mt-4 text-xl'> 레이드 공략 추천 동영상</h1>

      <RaidGudiePlayer />

      <h3 className='mt-4 text-xl'>* 컨닝페이퍼</h3>

      <div className='relative h-[300px] w-full sm:h-[900px]'>
        <Image
          src='https://postfiles.pstatic.net/MjAyMjA5MTBfMjkw/MDAxNjYyNzg2MjMxMjkz.q2eNoRp79tPAe3lxDW6u5Vt6LKZdSnjTod6gh9mqAH4g.P-UmPrqKFpLj9JxpKRkMcJlyLfjxb-Vi02cK6f73K_sg.JPEG.have1n/%EB%B0%9C%ED%83%84.jpg?type=w966'
          alt={'발탄 1관문 페이지'}
          fill
          className='object-contain'
          priority // 우선 로드 속성 추가
        />
      </div>

      <h3 className='mt-4 text-xl'>* 레이드 디테일</h3>
      <p className='w-full' style={{ whiteSpace: 'pre-wrap' }}>
        {test}
      </p>
    </div>
  )
}
