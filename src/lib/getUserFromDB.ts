import { sql } from '@vercel/postgres'

export async function getUserFromDb(email: string) {
  try {
    const res = await sql`SELECT 
    users.user_id,
    users.password,
    users.user_name,
    users.birthday,
    roles.role
FROM users
LEFT OUTER JOIN roles ON users.role_id = roles.role_id WHERE user_id=${email}`

    if (res.rowCount === 0) {
      return null // 사용자 없음
    }

    return res.rows[0] // 사용자 정보 반환
  } catch (e) {
    console.error(e)
    return null // 오류 발생 시 null 반환
  }
}
