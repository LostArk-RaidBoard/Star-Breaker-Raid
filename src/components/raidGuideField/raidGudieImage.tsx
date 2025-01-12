'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
interface Props {
  raideImageArray: string[]
}
export default function RaidGuideImage({ raideImageArray }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 })

  const openFullscreen = (imageUrl: string) => {
    setCurrentImage(imageUrl)
    setIsFullscreen(true)
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setCurrentImage(null)
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    const { clientX, clientY } = event
    setStartOffset({ x: clientX - offset.x, y: clientY - offset.y })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const { clientX, clientY } = event
      setOffset({
        x: clientX - startOffset.x,
        y: clientY - startOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // 컴포넌트 언마운트 시 스크롤 상태 복원
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isFullscreen])
  return (
    <>
      <div className='mt-2 grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2'>
        {raideImageArray.map((imageUrl, key: number) => (
          <div
            className='relative w-full p-4'
            key={key}
            onClick={() => openFullscreen(imageUrl as string)}
          >
            <Image
              src={imageUrl as string}
              alt={'컨닝페이퍼'}
              width={800}
              height={1250}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                border: 0,
              }}
              className='object-cover'
              loading='lazy'
            />
          </div>
        ))}
      </div>

      {isFullscreen && currentImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'
          onClick={closeFullscreen}
        >
          <div
            className='relative flex items-center justify-center'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
              transition: 'transform 0.2s',
              cursor: isDragging ? 'grabbing' : 'grab',
              overflow: 'hidden',
            }}
          >
            <Image
              src={currentImage}
              alt={'컨닝페이퍼'}
              width={800}
              height={1250}
              style={{
                maxWidth: '80%',
                height: '100%',
                objectFit: 'contain',
                border: 0,
              }}
              className='object-cover'
              loading='lazy'
            />
          </div>
        </div>
      )}
    </>
  )
}
