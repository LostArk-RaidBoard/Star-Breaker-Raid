import RaidApplication from '@/components/raidPostField/raidApplication'
import RaidApplicationList from '@/components/raidPostField/raidApplicationList'
import RaidPost from '@/components/raidPostField/raidpost'

export default function RaidListField() {
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='h-96 w-full rounded-md border shadow-lg'>
        <RaidPost />
      </div>
      <div className='mt-8 h-24 w-full rounded-md border shadow-lg'>
        <RaidApplication />
      </div>
      <div className='mt-8 h-auto w-full rounded-md border shadow-lg'>
        <RaidApplicationList />
      </div>
    </div>
  )
}
