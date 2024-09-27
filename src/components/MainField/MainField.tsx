import SiteLink from '@/components/MainField/SiteLink'
import MainPost from '@/components/MainField/MainPost'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'

export default function MainField() {
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-[1000px] w-full flex-col gap-4 md:h-[400px] md:flex-row'>
        <MainPost />
      </div>
      <div className='mt-8 h-24 w-full'>
        <SiteLink />
      </div>
      <div className='mt-8 w-full'>
        <MainRaidGuide />
      </div>
    </div>
  )
}
