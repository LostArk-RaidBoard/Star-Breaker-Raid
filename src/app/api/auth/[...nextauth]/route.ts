// app/api/auth/[...nextauth]/route.ts
import { authOptions } from '@/auth' // authOptions의 경로가 맞는지 확인
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

// GET 및 POST 요청을 처리하는 핸들러 내보내기
export { handler as GET, handler as POST }
