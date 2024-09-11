import google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'

export default { providers: [google] } satisfies NextAuthConfig
