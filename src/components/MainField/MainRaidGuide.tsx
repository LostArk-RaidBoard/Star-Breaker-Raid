import Image from 'next/image'
import Link from 'next/link'
export default function MainRaidGuide() {
  return (
    <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      <div className='h-72 rounded-md'>
        <div className='h-[90%] w-full rounded-md'>
          <Link href='/raidguide/발탄'>
            <Image
              src={'/guideImage/발탄.png'}
              alt='발탄'
              width={200}
              height={200}
              className='h-full w-full rounded-md object-cover'
            />
          </Link>
        </div>
        <span className='flex w-full justify-center text-lg font-medium text-[#222222]'>
          ✨ 발탄 공략 ✨
        </span>
      </div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
      <div className='h-72 rounded-md bg-gray-300'>1</div>
    </div>
  )
}
