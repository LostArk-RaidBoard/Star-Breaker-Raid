'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  console.log('실행됨')
  revalidateTag('posts') // 'posts' 태그 재검증
}

export async function revaildTage() {
  revalidateTag('mypageCharacter')
}
