import GoogleLoginButton from '@/components/login/GoogleLoginButton'
import SignInForm from '@/components/login/SignInForm'
import LoginNavigation from '@/components/login/LoginNavigation'
import Section from '@/components/utils/section'
import React from 'react'

export default function Login() {
  return (
    <Section>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <SignInForm />
        <GoogleLoginButton />
        <LoginNavigation />
      </div>
    </Section>
  )
}
