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
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src='/google.png'
            alt='google'
            fill // fill을 사용하여 부모 div에 맞게 조정
            style={{ objectFit: 'contain' }} // 비율 유지
            priority // LCP 최적화를 위한 priority 속성 추가
          />
        </div>
      </button>
    </div>
  )
}
