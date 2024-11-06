import Link from 'next/link'

export default function NaviBar() {
  return (
    <div className='flex h-8 w-auto items-center justify-center gap-12 text-base sm:text-lg'>
      <Link href={'/'} scroll={false}>
        <span className='hover:text-blue-500 sm:text-xl'>메인</span>
      </Link>
      <Link href={'/raidguide'} scroll={false}>
        <span className='hover:text-blue-500 sm:text-xl'>공략</span>
      </Link>
      <Link href={'/raidpost'} scroll={false}>
        <span className='hover:text-blue-500 sm:text-xl'>모집글</span>
      </Link>
      <Link href={'/mypage'} scroll={false}>
        <span className='hover:text-blue-500 sm:text-xl'>마이페이지</span>
      </Link>
    </div>
  )
}
