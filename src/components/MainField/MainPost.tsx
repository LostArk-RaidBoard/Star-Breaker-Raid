import MainCharacter from '@/components/MainField/MainCharacter'
import Link from 'next/link'

export default function MainPost() {
  return (
    <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
      <MainCharacter />
      <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[45%]'>선생님 </div>
      <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[45%]'>우리 </div>
    </div>
  )
}
