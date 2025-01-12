import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { verifyPassword } from '@/components/utils/bcrypt'
import { getUserFromDb } from '@/lib/getUserFromDB'
import { signInSchema } from '@/lib/zod'
import getUserBirthday from '@/lib/getUserBirthday'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
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

          const isValid = await verifyPassword(password, user.password)
          if (!isValid) {
            throw new Error('Invalid password.')
          }

          console.log('로그인 : ' + user.user_id)
          return { id: user.user_id, nickName: user.nickname, role: user.role }
        } catch (error) {
          console.error('Login error:', error)
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.nickName = user.nickName
        if (account && account.access_token) {
          token.accessToken = account.access_token
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.nickName = token.nickName as string
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        const existingUser = await getUserFromDb(profile.email)
        if (!existingUser) {
          const userName = profile.given_name || '이름 없음'
          const birthday = account.access_token ? await getUserBirthday(account.access_token) : null

          const userRegistrationResponse = await fetch(`${process.env.API_URL}/api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName,
              userEmail: profile.email,
              userPassword: '12345678',
              birthday,
            }),
          })

          if (!userRegistrationResponse.ok) {
            const errorData = await userRegistrationResponse.json()
            throw new Error(errorData.message)
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
      return true
    },
  },
  pages: {
    signIn: '/login',
  },
})
