import 'next-auth'
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
    accessToken?: string // 외부 서비스 액세스 토큰
  }
}
