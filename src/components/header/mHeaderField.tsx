import LogField from '@/components/header/HeadlogField'
import Image from 'next/image'
import NaviBar from '@/components/header/NaviBar'
import Link from 'next/link'

export default function MHeaderField() {
  return (
    <nav className='flex h-24 w-full flex-col items-center justify-between sm:hidden'>
      <div className='flex w-full items-center justify-between'>
        <Link href='/' className='relative h-[30px] w-[30px]'>
          <Image
            src={'/logo/favicon.png'}
            alt='Logo 이미지'
            fill
            sizes='(max-width: 640px) 30px, (max-width: 768px) 35px, 50px'
            className='object-contain'
          />
        </Link>

        <LogField />
      </div>
      <div className={`text-sm`}>
        <NaviBar />
      </div>{' '}
    </nav>
  )
}
