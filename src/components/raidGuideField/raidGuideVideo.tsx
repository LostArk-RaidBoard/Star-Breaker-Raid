'use client'

import { useState } from 'react'

const list = [
  'https://www.youtube-nocookie.com/embed/7_uhI7PcjQU?si=vRakcnT3PddQLWIe',
  'https://www.youtube-nocookie.com/embed/TvA5pz2AgdY?si=4KlBYBRXbxzBZ4q1',
  'https://www.youtube-nocookie.com/embed/WyDvPfR7yJk?si=Mu6AIKaCPa5sh8M8',
  'https://www.youtube-nocookie.com/embed/UBInplp2a10?si=VKmv7p1Am1eX6K9L',
]

export default function RaidGudiePlayer() {
  const [userChosie, setUserChosie] = useState(0)
  return (
    <div className='flex h-[350px] w-full flex-col items-center justify-center gap-4 sm:h-[500px] sm:flex-row'>
      <div className='h-[200px] w-full sm:h-full sm:basis-3/4'>
        <iframe
          className='h-full w-full object-contain'
          src={list[userChosie]}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          sandbox='allow-same-origin allow-scripts allow-presentation'
          allowFullScreen
        ></iframe>
      </div>
      <div className='flex h-[150px] w-full flex-row gap-4 overflow-x-auto sm:h-full sm:basis-1/4 sm:flex-col sm:overflow-y-auto'>
        {list.map((items, key) => (
          <div
            key={key}
            onClick={() => {
              console.log(key)
              setUserChosie(key)
            }}
            className={`${userChosie === key ? 'bg-gray-500' : ''} min-w-[150px] rounded-md p-4`}
          >
            <iframe
              className='pointer-events-none left-0 top-0 h-full w-full'
              src={items}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              sandbox='allow-same-origin allow-scripts allow-presentation'
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  )
}
