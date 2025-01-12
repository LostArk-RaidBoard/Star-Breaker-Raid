import Link from 'next/link'
import React from 'react'

export default function RadiGuideCreateButton() {
  return (
    <Link href='/raidguide/create'>
      <button className='h-8 w-24 rounded-md bg-gray-900 px-1 text-white'>가이드 생성</button>
    </Link>
  )
}
