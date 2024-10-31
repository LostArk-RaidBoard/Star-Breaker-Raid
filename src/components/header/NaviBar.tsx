import Link from 'next/link'

export default function NaviBar() {
  return (
    <div className='flex h-8 w-auto items-center justify-center gap-8 sm:text-lg'>
      <Link href={'/'}>
        <span className='text-lg hover:text-blue-500 sm:text-xl'>메인</span>
      </Link>
      <span>|</span>

      <Link href={'/raidguide'}>
        <span className='text-lg hover:text-blue-500 sm:text-xl'> 공략</span>
      </Link>
      <span>|</span>
      <Link href={'/mypage'}>
        <span className='text-lg hover:text-blue-500 sm:text-xl'>마이페이지</span>
      </Link>
    </div>
  )
}
