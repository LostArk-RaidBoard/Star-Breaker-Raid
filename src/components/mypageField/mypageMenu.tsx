import Link from 'next/link'

export default function MypageMenu() {
  return (
    <div className='flex h-12 w-full flex-row flex-nowrap justify-between gap-4 rounded-md border border-gray-300 bg-gray-200 p-4 text-lg sm:sticky sm:top-[90px] sm:h-40 sm:w-36 sm:flex-col'>
      <div className='flex w-full items-center justify-center sm:justify-start'>
        <Link href={'/mypage/'}>캐릭터</Link>
      </div>

      <div className='flex w-full items-center justify-center sm:justify-start'>
        <Link href={'/mypage/mypost'}>일정</Link>
      </div>

      <div className='flex w-full items-center justify-center sm:justify-start'>
        <Link href={'/mypage/myInfo'}>내 정보</Link>
      </div>
    </div>
  )
}
