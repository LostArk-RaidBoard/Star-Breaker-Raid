'use client' // 클라이언트 컴포넌트로 설정
import { signIn } from 'next-auth/react' // next-auth에서 signIn 가져오기
import Image from 'next/image'

export default function GoogleSignIn() {
  const handleSignIn = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/' }) // redirect를 true로 설정하여 로그인 후 리다이렉션
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <button
        type='button' // type을 'button'으로 변경
        onClick={handleSignIn} // 버튼 클릭 시 handleSignIn 호출
        className='mt-4 flex h-12 w-[90%] items-center justify-center rounded-md border border-black bg-gray-100 sm:w-[400px]'
      >
        <Image src='/google.png' alt='google' height={20} width={200} />
      </button>
    </div>
  )
}
