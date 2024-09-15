import Image from 'next/image'
import Xmark from '@image/icon/xmark.svg'

export default function DBCharacterField() {
  return (
    <div className='mt-4 flex flex-col'>
      <span className='text-xl'>캐릭터</span>
      <div className='mt-2 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {/* 캐릭터 창 */}
        <div className='flex h-20 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'>
          <div className='h-12 w-12 overflow-hidden rounded-full'>
            <Image
              src={
                'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter_m.png'
              }
              alt={'이미지'}
              width={70}
              height={70}
              className='h-full w-full object-cover'
            />
          </div>

          <div className='grow flex-col overflow-hidden'>
            <div className='flex items-center gap-1 overflow-hidden truncate whitespace-nowrap'>
              <div className='h-6 w-6 overflow-hidden rounded-full'>
                <Image
                  src={'/classIcon/인파이터.svg'}
                  alt={'이미지'}
                  width={70}
                  height={70}
                  className='h-full w-full object-cover'
                />
              </div>
              <span className='overflow-hidden truncate whitespace-nowrap'>슈가양양</span>
              <span className='ml-1 hidden overflow-hidden truncate whitespace-nowrap sm:block'>
                루페온
              </span>
            </div>
            <span> 1645</span>
          </div>

          <Xmark
            className='h-5 w-5 flex-none rounded-sm border border-gray-400 bg-gray-100 stroke-[4px] text-red-500 hover:cursor-pointer hover:bg-gray-500'
            onClick={() => {
              alert('dldld')
            }}
          />
        </div>
        <div className='flex h-20 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'></div>
        <div className='flex h-20 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'></div>
        <div className='flex h-20 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'></div>
        <div className='flex h-20 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'></div>
      </div>
    </div>
  )
}
