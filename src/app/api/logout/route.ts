import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const cookieStore = await cookies()

  // 🔹 NextAuth의 세션 쿠키 삭제 (예: next-auth 사용 시)
  cookieStore.delete('next-auth.session-token')

  // 🔹 `userId`를 헤더에서 가져오기
  const userId = req.headers.get('user-id')
  if (userId) {
    cookieStore.delete(`mainMyInfoETag-${userId}`)
    cookieStore.delete(`mainMyScheduleETag-${userId}`)
  }

  return new Response(JSON.stringify({ message: '로그아웃 완료' }), {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  })
}
