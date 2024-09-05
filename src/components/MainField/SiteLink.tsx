import Image from 'next/image'
import Link from 'next/link'

export default function SiteLink() {
  return (
    <div className='grid h-full w-full grid-cols-4 gap-2 md:gap-4'>
      <Link
        href='https://loa.icepeng.com/refining'
        className='flex h-full w-full items-center justify-center rounded-md bg-[#4350af] text-xl font-bold text-white shadow-lg'
      >
        Lostark Calculator
      </Link>
      <Link
        href='https://cho.elphago.work'
        className='flex h-full w-full items-center justify-center gap-1 rounded-md bg-[#3662e3] text-xl font-bold text-white shadow-lg'
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
        className='flex h-full w-full items-center justify-center rounded-md bg-[#3b3330] text-xl font-bold text-white shadow-lg'
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
        className='flex h-full w-full flex-col items-center justify-center rounded-md bg-[#16181d] text-white shadow-lg'
      >
        <span className='text-xl font-bold'>ILOA.GG</span>
        <span className='hidden text-sm sm:block'>로스트아크 종합 정보</span>
      </Link>
    </div>
  )
}
