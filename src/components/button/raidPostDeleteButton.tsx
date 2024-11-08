'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  postId: number
}
export default function RaidPostDeleteButton({ postId }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams() // searchParams를 통해 쿼리 파라미터에 접근
  const search = searchParams.get('redirect') || ''

  const deleteCreatePostHandler = async (post_id: number) => {
    try {
      const response = await fetch(`/api/mypageCreatePost?post_id=${post_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

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
        deleteCreatePostHandler(postId)
      }}
    >
      모집글 닫기
    </button>
  )
}
