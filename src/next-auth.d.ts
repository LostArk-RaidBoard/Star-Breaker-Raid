// next-auth.d.ts 파일을 생성하거나 기존에 있는 파일에 추가합니다.
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string // 사용자 ID 타입 정의
    role: string // 역할 타입 정의
    nickName: string
  }

  interface Session {
    user: User // 세션의 사용자 타입 정의
  }

  interface JWT {
    id: string // JWT에 사용자 ID 추가
    role: string // JWT에 역할 추가
    nickName: string
  }
}
