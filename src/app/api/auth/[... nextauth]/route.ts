import NextAuth from 'next-auth'
import { handlers } from '@/auth' // Referring to the auth.ts we just created
import GoogleProvider from 'next-auth/providers/google'

const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(
  //NextAuth.js를 사용하여 인증과 관련된 작업을 처리하는 핵심 함수이다.
  authOption,
)

export const { GET, POST } = handlers
