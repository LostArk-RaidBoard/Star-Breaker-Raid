'use client'

import { wePostTage } from '@/app/action'
import { useEffect } from 'react'

export default function RevaildatePostTageButton() {
  useEffect(() => {
    wePostTage()
  }, [])
  return (
    <button
      className={`rounded-md bg-gray-900 p-2 px-4 text-white`}
      onClick={() => {
        wePostTage()
      }}
    >
      갱신
    </button>
  )
}
