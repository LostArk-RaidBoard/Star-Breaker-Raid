import GoogleSignIn from '@/components/login/googleSignIn'
import LoginField from '@/components/login/loginField'
import LoginLinkField from '@/components/login/loginLinkField'
import Section from '@/components/utils/section'

export default function Login() {
  return (
    <Section>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <LoginField />
        <GoogleSignIn />
        <LoginLinkField />
      </div>
    </Section>
  )
}
