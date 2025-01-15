'use client'

import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { YouTubeEmbed } from '@next/third-parties/google'

interface Props {
  raidYoutubeVideoId: string[]
}

// 최적화를 위해 Memo로 섬네일 컴포넌트 최적화
const Thumbnail = memo(
  ({ src, onClick, isSelected }: { src: string; onClick: () => void; isSelected: boolean }) => (
    <div
      onClick={onClick}
      className={`${isSelected ? 'bg-gray-900' : ''} group relative rounded-md`}
      style={{ aspectRatio: '16 / 9', minWidth: '150px' }}
    >
      <Image
        src={src}
        alt='Thumbnail'
        fill
        loading='lazy'
        sizes='(max-width: 640px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 100%'
        className='pointer-events-none object-cover p-2 group-hover:scale-110 md:p-3' // pointer-events-none 유지
      />
    </div>
  ),
)

// displayName 추가
Thumbnail.displayName = 'Thumbnail'

export default function RaidGudiePlayer({ raidYoutubeVideoId }: Props) {
  const [userChosie, setUserChosie] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)
  const videoRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // 모바일 기준 너비 설정
    }

    handleResize() // 초기 실행
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const containerStyle = {
    height: isMobile ? 'auto' : `${videoHeight}px`,
    width: '100%',
  }

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
    <div
      className={`mt-2 flex max-h-[550px] min-h-[250px] w-full flex-col justify-center gap-2 rounded-md md:flex-row`}
      style={{ height: '100%', alignItems: 'stretch' }}
    >
      {/* 비디오 부분 */}
      <div
        ref={videoRef}
        className='relative h-full w-full md:basis-3/4'
        style={{
          aspectRatio: '16 / 9',
          width: '100%', // 부모 요소가 가득 차도록 설정
          maxWidth: 'none',
        }}
      >
        <YouTubeEmbed
          videoid={raidYoutubeVideoId?.[userChosie] || ''}
          params='controls=0'
          style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-width: none;'
        />
      </div>

      {/* 이미지 선택 부분 */}

      <div
        className={`flex h-[100px] w-full flex-row gap-2 overflow-y-hidden rounded-md md:h-full md:basis-1/4 md:flex-col md:justify-start md:overflow-y-auto md:overflow-x-hidden`}
        style={containerStyle}
      >
        {raidYoutubeVideoId?.map((items, key) => {
          const thumbnailSrc = items
            ? `https://img.youtube.com/vi/${items}/0.jpg` // 절대 경로로 수정
            : '/fallback-thumbnail.jpg'

          return (
            <div key={key}>
              <Thumbnail
                key={key}
                src={thumbnailSrc}
                onClick={() => handleClick(key)}
                isSelected={userChosie === key}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
