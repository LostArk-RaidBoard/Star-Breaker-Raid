import bcrypt from 'bcryptjs'

const saltRounds = 10 // 해시의 복잡도

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}
