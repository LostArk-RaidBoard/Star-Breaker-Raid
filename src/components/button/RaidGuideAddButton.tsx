import Link from 'next/link'
import React from 'react'

export default function RaidGuideAddButton() {
  return (
    <Link href='/raidguide/create'>
      <button className='rounded-md bg-gray-800 px-4 py-3 text-gray-100'>가이드 생성</button>
    </Link>
  )
}
