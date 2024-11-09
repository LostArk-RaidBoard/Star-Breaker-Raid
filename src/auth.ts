// auth.ts
import NextAuth from 'next-auth'
import { ZodError } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { verifyPassword } from '@/components/utils/bcrypt'
import { getUserFromDb } from '@/lib/getUserFromDB'
import { signInSchema } from '@/lib/zod'
import getUserBirthday from '@/lib/getUserBirthday'

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)
          const user = await getUserFromDb(email)

          if (!user) {
            throw new Error('User not found.')
          }

          // 비밀번호 확인
          const isValid = await verifyPassword(password, user.password)
          if (!isValid) {
            throw new Error('Invalid password.')
          }

          console.log('로그인 : ' + user.user_id)

          // 유저 반환
          return { id: user.user_id, nickName: user.nickname, role: user.role }
        } catch (error) {
          console.error('Login error:', error)
          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/user.birthday.read',
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role // 역할 추가
        token.nickName = user.nickName
        if (account && account.access_token) {
          token.accessToken = account.access_token
        }
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id as string
      session.user.role = token.role as string // 세션에 역할 추가
      session.user.nickName = token.nickName
      return session
    },
    async signIn({ user, account, profile }: any) {
      if (account && account.provider === 'google' && profile && profile.email) {
        const existingUser = await getUserFromDb(profile.email)
        if (!existingUser) {
          const userName = profile.given_name || '이름 없음' // 이름이 없는 경우 기본값 설정
          const birthday = account.access_token ? await getUserBirthday(account.access_token) : null

          const userRegistrationResponse = await fetch(`${process.env.API_URL}/api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName,
              userEmail: profile.email,
              userPassword: '12345678', // 임시 비밀번호 설정
              birthday: birthday,
            }),
          })

          if (!userRegistrationResponse.ok) {
            const errorData = await userRegistrationResponse.json()
            throw new Error(errorData.message) // 에러 처리
          }

          user.id = profile.email
          user.role = 'user'
          user.nickName = ''
          console.log('로그인 : ' + profile.email)
        } else {
          user.id = existingUser.user_id
          user.role = existingUser.role
          user.nickName = existingUser.nickname
          console.log('로그인 : ' + existingUser.user_id)
        }
      }

      return true // 로그인 성공
    },
  },
  pages: {
    signIn: '/login',
  },
}

// 핸들러 내보내기
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
