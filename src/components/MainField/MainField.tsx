import Embeded from '@/components/MainField/Embeded'
import MainPost from '@/components/MainField/MainPost'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'

export default function MainField() {
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-96 w-full gap-4'>
        <MainPost />
        <div className='h-full w-[19%] rounded-md bg-gray-400 shadow-lg'>내 정보</div>
      </div>
      <div className='mt-8 h-24 w-full'>
        <Embeded />
      </div>
      <div className='mt-8 w-full'>
        <MainRaidGuide />
      </div>
    </div>
  )
}
