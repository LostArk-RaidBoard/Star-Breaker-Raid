import RaidGuideGrid from '@/components/raidGuideField/raidGuideGrid'
import RaidGuideInput from '@/components/raidGuideField/raidGuideInput'

export default function RaidGuideField() {
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='h-12 w-full'>
        <RaidGuideInput />
      </div>
      <div className='mt-8 h-full w-full'>
        <RaidGuideGrid />
      </div>
    </div>
  )
}
