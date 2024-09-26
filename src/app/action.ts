'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  revalidateTag('posts') // 'posts' 태그 재검증
}

export async function revaildTage() {
  revalidateTag('mypageCharacter')
}

export async function applicationTage() {
  revalidateTag('applicationTage')
}

export async function createPostTage() {
  revalidateTag('createPostTage')
}

export async function teacherTage() {
  revalidateTag('teacherPost')
}
export async function wePostTage() {
  revalidateTag('wePost')
}
