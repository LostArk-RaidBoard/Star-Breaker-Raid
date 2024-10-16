'use client'

import { memo, useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
interface Props {
  raideYoutubeURLsArray: string[]
}

// 최적화를 위해 Memo로 섬네일 컴포넌트 최적화
const Thumbnail = memo(
  ({ src, onClick, isSelected }: { src: string; onClick: () => void; isSelected: boolean }) => (
    <div
      onClick={onClick}
      className={`${isSelected ? 'bg-gray-500' : ''} relative rounded-md`}
      style={{ aspectRatio: '16 / 9', minWidth: '150px' }}
    >
      <Image
        src={src}
        alt='Thumbnail'
        fill
        loading='lazy'
        sizes='(max-width: 640px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 100%'
        className='pointer-events-none rounded-md object-cover p-2 md:p-3' // pointer-events-none 유지
      />
    </div>
  ),
)

// displayName 추가
Thumbnail.displayName = 'Thumbnail'

// 유튜브 nocookie URL에서 비디오 ID 추출 함수
const extractVideoId = (url: string) => {
  const regex = /\/embed\/([^?]*)/
  const match = url.match(regex)
  return match ? match[1] : null
}
export default function RaidGudiePlayer({ raideYoutubeURLsArray }: Props) {
  const [userChosie, setUserChosie] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)
  const videoRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((key: number) => {
    setUserChosie(key)
  }, [])

  // 동영상의 높이를 업데이트하는 함수
  const updateVideoHeight = useCallback(() => {
    if (videoRef.current) {
      setVideoHeight(videoRef.current.clientHeight)
    }
  }, [])

  // 창 크기 변경 시 동영상 높이를 업데이트
  useEffect(() => {
    window.addEventListener('resize', updateVideoHeight)
    updateVideoHeight() // 초기 로드 시 높이 설정
    return () => window.removeEventListener('resize', updateVideoHeight)
  }, [updateVideoHeight])

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 rounded-md bg-black md:flex-row'>
      <div ref={videoRef} className='relative w-full md:basis-3/4'>
        <div className='relative w-full' style={{ paddingBottom: '56.25%', height: '0' }}>
          <iframe
            id='video'
            className='absolute left-0 top-0 h-full w-full rounded-md'
            src={raideYoutubeURLsArray[userChosie]}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            sandbox='allow-same-origin allow-scripts allow-presentation'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </div>
      </div>
      <div
        className='flex h-full w-full flex-row gap-2 overflow-x-auto rounded-md md:basis-1/4 md:flex-col md:overflow-y-auto'
        style={{ maxHeight: `${videoHeight}px` }} // maxHeight를 100%로 변경
      >
        {raideYoutubeURLsArray.map((items, key) => {
          const videoId = extractVideoId(items)
          const thumbnailSrc = videoId
            ? `https://img.youtube.com/vi/${videoId}/0.jpg` // 절대 경로로 수정
            : '/fallback-thumbnail.jpg'

          return (
            <Thumbnail
              key={key}
              src={thumbnailSrc}
              onClick={() => handleClick(key)}
              isSelected={userChosie === key}
            />
          )
        })}
      </div>
    </div>
  )
}
