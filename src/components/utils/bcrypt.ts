import bcrypt from 'bcryptjs'

const saltRounds = 10 // 해시의 복잡도

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hashedPassword)
  return isValid
}
