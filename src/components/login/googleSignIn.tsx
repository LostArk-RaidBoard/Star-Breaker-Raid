import { signIn } from '@/auth'

export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <button type='submit' className='mt-4 h-12 w-[400px] rounded-md border border-black'>
        Google
      </button>
    </form>
  )
}
