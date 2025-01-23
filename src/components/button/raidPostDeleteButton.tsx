'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  postId: number
  userId: string
  raidName: string
  characterName: string
}
export default function RaidPostDeleteButton({ postId, userId, raidName, characterName }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams() // searchParams를 통해 쿼리 파라미터에 접근
  const search = searchParams.get('redirect') || ''

  const deleteCreatePostHandler = async (
    postId: number,
    userId: string,
    raidName: string,
    characterName: string,
  ) => {
    try {
      const response = await fetch(
        `/api/raidPostAPI/createPost?post_id=${postId}&character_name=${characterName}&user_id=${userId}&raid_name=${raidName}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok && response.status === 200) {
        router.push(search)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      className='rounded-md bg-gray-900 px-3 py-1 text-white'
      onClick={() => {
        deleteCreatePostHandler(postId, userId, raidName, characterName)
      }}
    >
      모집 글 닫기
    </button>
  )
}
