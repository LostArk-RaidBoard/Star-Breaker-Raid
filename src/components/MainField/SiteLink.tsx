import Image from 'next/image'
import Link from 'next/link'

export default function SiteLink() {
  return (
    <div className='flex h-full gap-4 overflow-x-auto whitespace-nowrap md:grid md:grid-cols-4 md:gap-4'>
      <Link
        href='https://loa.icepeng.com/refining'
        className='inline-flex h-full min-w-[100px] flex-col flex-nowrap items-center justify-center overflow-hidden rounded-md bg-[#4350af] text-sm font-bold text-white shadow-lg sm:flex-row sm:text-xl'
      >
        <span>Lostark</span> <span>Calculator</span>
      </Link>
      <Link
        href='https://cho.elphago.work'
        className='inline-flex h-full min-w-[100px] flex-nowrap items-center justify-center gap-1 rounded-md bg-[#3662e3] text-sm font-bold text-white shadow-lg sm:text-xl'
      >
        <Image
          src={'/초월.png'}
          alt='초파고'
          width={48}
          height={48}
          className='hidden p-1 sm:block'
        />
        초파고
      </Link>
      <Link
        href='https://loatool.taeu.kr/'
        className='inline-flex h-full min-w-[100px] items-center justify-center rounded-md bg-[#3b3330] text-sm font-bold text-white shadow-lg sm:text-xl'
      >
        <div className='hidden h-12 w-12 sm:block'>
          <Image
            src={'/loatTool.png'}
            alt='로아도구'
            width={70}
            height={70}
            className='h-full w-full object-cover'
          />
        </div>
        로아도구
      </Link>
      <Link
        href='https://iloa.gg/'
        className='inline-flex h-full min-w-[100px] flex-col items-center justify-center overflow-hidden rounded-md bg-[#16181d] text-white shadow-lg'
      >
        <span className='text-sm font-bold sm:text-xl'>ILOA.GG</span>
        <span className='hidden text-sm sm:block'>로스트아크 종합 정보</span>
      </Link>
    </div>
  )
}
