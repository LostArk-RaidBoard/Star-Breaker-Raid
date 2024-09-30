import Link from 'next/link'

export default function LoginLinkField() {
  return (
    <div className='flex h-12 w-full items-center justify-center gap-1 overflow-hidden truncate whitespace-nowrap text-sm sm:gap-2 sm:text-base'>
      <Link href={'/'} className='truncate hover:text-blue-500'>
        메인 화면
      </Link>
      <span> | </span>
      <Link href={'/login/search'} className='truncate hover:text-blue-500'>
        아이디 & 비밀번호 변경
      </Link>
      <span> | </span>
      <Link href={'/law'} className='truncate hover:text-blue-500'>
        회원가입
      </Link>
    </div>
  )
}
