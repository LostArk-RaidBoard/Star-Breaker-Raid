import Image from 'next/image'
import User from '@image/icon/user.svg'
import Hand from '@image/icon/hand.svg'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'

export default function MainWePosts() {
  return (
    <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[45%]'>
      <div className='grid grid-cols-8 rounded-t-md bg-gray-200 p-1'>
        <div className='col-span-2 flex items-center justify-center gap-1'>
          <Fire className='h-4 w-4' />
          레이드
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1'>
          <Megaphone className='h-4 w-4' />
          공대장
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1'>
          <Clock className='h-4 w-4' />
          시간
        </div>
        <div className='flex items-center justify-center gap-1'>
          <User className='h-4 w-4' />
          인원
        </div>
        <div className='flex items-center justify-center gap-1'>
          <Hand className='h-4 w-4' /> 신청
        </div>
      </div>
      <div className='mt-2 flex w-full flex-col gap-3 p-1'>
        <div className='grid h-9 grid-cols-8 rounded-md border border-gray-900 bg-gray-100 p-1'>
          <div className='col-span-2 flex items-center justify-center border-r border-gray-500'>
            에키르 하드
          </div>
          <div className='col-span-2 flex w-full flex-nowrap items-center justify-center gap-1 truncate border-r border-gray-500'>
            <Image
              src='/classIcon/브레이커.svg'
              alt='아이콘'
              width={100}
              height={100}
              className='h-6 w-6 fill-yellow-600'
            />
            <span className='overflow-hidden truncate whitespace-nowrap'>별부수기</span>
          </div>
          <div className='col-span-2 flex items-center justify-center border-r border-gray-500'>
            금, 21:00
          </div>
          <div className='flex items-center justify-center border-r border-gray-500'>8/8</div>
          <div className='flex items-center justify-center'>
            <button className='rounded-md bg-gray-900 px-2 text-white'>신청</button>
          </div>
        </div>
      </div>
    </div>
  )
}
