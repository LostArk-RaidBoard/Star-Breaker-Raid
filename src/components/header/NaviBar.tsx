import Link from 'next/link'

export default function NaviBar() {
  return (
    <div className='flex h-12 w-auto items-center gap-4 text-gray-500'>
      <Link href={'/'}>
        <span className='hover:text-blue-500'>메인</span>
      </Link>
      <span> |</span>

      <Link href={'/raidguide'}>
        <span className='hover:text-blue-500'>레이드 공략</span>
      </Link>
      <span> |</span>
      <Link href={'/mypage'}>
        <span className='hover:text-blue-500'>마이페이지</span>
      </Link>
    </div>
  )
}
