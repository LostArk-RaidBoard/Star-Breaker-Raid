import Link from 'next/link'

export default function MainPost() {
  return (
    <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
      <div className='h-44 w-full rounded-md bg-gray-400 shadow-lg md:h-full md:w-[19%]'>
        <Link href={'/raidpost/create'} className='rounded-md bg-gray-200 p-2 shadow-lg'>
          레이드 개설
        </Link>
      </div>
      <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[49%]'>선생님 </div>
      <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[49%]'>우리 </div>
    </div>
  )
}
