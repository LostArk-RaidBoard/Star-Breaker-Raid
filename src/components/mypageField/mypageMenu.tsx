import Link from 'next/link'

export default function MypageMenu() {
  return (
    <div className='mt-8 flex w-full flex-row flex-nowrap justify-between gap-4 rounded-md border bg-gray-100 p-4 text-lg sm:sticky sm:top-[120px] sm:h-40 sm:w-36 sm:flex-col'>
      <div className='flex w-full items-center justify-center'>
        <Link href={'/mypage/'}>캐릭터</Link>
      </div>
      <span className='black sm:hidden'>|</span>
      <div className='flex w-full items-center justify-center'>
        <Link href={'/mypage/mypost'}>일정</Link>
      </div>
      <span className='black sm:hidden'>|</span>
      <div className='flex w-full items-center justify-center'>
        <Link href={'/mypage/myInfo'}>내 정보</Link>
      </div>
    </div>
  )
}
