import React from 'react'

export default function Footer() {
  return (
    <footer className='flex hidden w-full flex-col items-center justify-center overflow-hidden truncate whitespace-nowrap p-4 text-sm text-black sm:flex'>
      <span className='overflow-hidden truncate'>[로아 이미지 저작자] Smilegate RPG</span>

      <span className='overflow-hidden truncate'>
        문의 | 버그 : <span className='underline'>wjd15sheep@gmail.com</span>
      </span>
      <span className='overflow-hidden truncate'>
        copyright © 2024 wjd15sheep All rights reserved
      </span>
      <span className='overflow-hidden truncate'>
        [컨닝페이퍼 출처] 로아인벤 게시글, [공략 유튜브 출처] 유튜브
      </span>
    </footer>
  )
}
