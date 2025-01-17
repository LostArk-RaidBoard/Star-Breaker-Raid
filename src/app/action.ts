'use server'
import { revalidateTag } from 'next/cache'

export default async function submit() {
  revalidateTag('posts')
}

export async function applicationTage() {
  revalidateTag('applicationTage')
}

export async function createPostTage() {
  revalidateTag('createPostTage')
}

export async function wePostTage() {
  revalidateTag('wePost')
}

export async function applicationListTage() {
  revalidateTag('applicationList')
}

export async function raidGuideTage() {
  revalidateTag('raidGuideTage')
}

export async function myInfoTage() {
  revalidateTag('myInfo')
}

export async function raidGuideLike() {
  revalidateTag('raidGudieLike')
}

export async function homework() {
  revalidateTag('homework')
}
