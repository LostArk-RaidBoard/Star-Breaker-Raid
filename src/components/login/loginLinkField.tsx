import Link from 'next/link'

export default function LoginLinkField() {
  return (
    <div className='flex h-12 w-full items-center justify-center gap-2'>
      <Link href={'/'} className='hover:text-blue-500'>
        메인 화면
      </Link>
      <span> | </span>
      <Link href={'/login/search'} className='hover:text-blue-500'>
        아이디 & 비밀번호 변경
      </Link>
      <span> | </span>
      <Link href={'/login/signup'} className='hover:text-blue-500'>
        회원가입하기
      </Link>
    </div>
  )
}
