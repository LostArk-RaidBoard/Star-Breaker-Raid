import { signIn } from '@/auth'
import Image from 'next/image'

export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google', { redirectTo: '/' })
      }}
    >
      <button
        type='submit'
        className='mt-4 flex h-12 w-[400px] items-center justify-center rounded-md border border-black bg-gray-100'
      >
        <Image src='/google.png' alt='google' height={20} width={200} />
      </button>
    </form>
  )
}
