'use client'
import InputLayout from '@/components/ui/inputLayout'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RaidGuideEditor() {
  const router = useRouter()
  const [raidGuideName, setRaidGuideName] = useState('') // 레이드 명칭
  const [raideGuideMainImage, setRaideGuideMainImage] = useState('')
  const [youtubeUrls, setYoutubeUrls] = useState(['']) // youtube URL을 저장하는 배열
  const [raidGuideImages, setRaidGuideImages] = useState([''])
  const [saveStatues, setSaveStatues] = useState(0)
  const [imageError, setImageError] = useState(false)

  // URL 추가
  const addYoutubeUrl = () => {
    setYoutubeUrls([...youtubeUrls, '']) // 빈 값의 URL input을 추가
  }

  // URL 삭제
  const removeYoutubeUrl = () => {
    if (youtubeUrls.length > 1) {
      setYoutubeUrls(youtubeUrls.slice(0, -1)) // 마지막 URL input을 제거
    }
  }

  // Image URL 추가
  const addImageUrl = () => {
    setRaidGuideImages([...raidGuideImages, '']) // 빈 값의 URL input을 추가
  }

  // Image URL 추가
  const removeImageUrl = () => {
    if (raidGuideImages.length > 1) {
      setRaidGuideImages(raidGuideImages.slice(0, -1)) // 마지막 URL input을 제거
    }
  }

  // 각각의 InputLayout 값 업데이트
  const handleUrlChange = (index: number, value: string) => {
    const updatedUrls = [...youtubeUrls]
    updatedUrls[index] = value // 해당 index의 URL 값을 업데이트
    setYoutubeUrls(updatedUrls)
  }

  // 각각의 InputLayout 값 업데이트
  const handleImageUrlChange = (index: number, value: string) => {
    const updatedImageUrls = [...raidGuideImages]
    updatedImageUrls[index] = value // 해당 index의 URL 값을 업데이트
    setRaidGuideImages(updatedImageUrls)
  }

  const handleSave = async () => {
    if (raidGuideName.length === 0) {
      alert('레이드 명칭이 없습니다.')
      return
    }

    if (raideGuideMainImage.length === 0) {
      alert('main 이미지가 없습니다.')
      return
    }

    if (youtubeUrls.length === 0) {
      alert('youtubeURL이 없습니다.')
      return
    }

    if (raidGuideImages.length === 0) {
      alert('이미지가 없습니다.')
      return
    }

    const list = {
      guide_name: raidGuideName,
      youtube_url: { ...youtubeUrls },
      image_url: { ...raidGuideImages },
      raid_main_image: raideGuideMainImage,
    }

    try {
      const response = await fetch('/api/raidGuideAPI/raidGuidePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      })

      if (response.ok) {
        if (response.status === 200) {
          router.push('/')
          setSaveStatues(1)
        }
      } else {
        setSaveStatues(2)
      }
    } catch (error) {
      console.error(error)
      setSaveStatues(2)
    }
  }

  const renderImage = (src: string, alt: string) => {
    try {
      if (!src.startsWith('/') && !src.startsWith('http')) {
        throw new Error('Invalid image URL') // URL 형식이 유효하지 않으면 예외 발생
      }
      return (
        <div className='relative h-[200px] w-[300px]'>
          <Image
            src={src}
            alt={alt}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-fill'
            priority // 우선 로드 속성 추가
          />
        </div>
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Image rendering error:', error.message)
        setImageError(true) // 이미지 오류 상태 설정
        return <p className='text-red-500'>이미지 로드 실패</p>
      }
    }
  }

  return (
    <div className='flex h-full w-full flex-col rounded-md p-4 shadow-lg'>
      <h1 className='text-xl'>* 레이드 공략 생성란</h1>

      {/* 레이드 명칭 입력 */}
      <label className='mt-4 text-lg'>* 레이드 명칭</label>
      <InputLayout
        setType={'text'}
        setName={'raidGuideName'}
        setPlaceholder={'레이드 명칭'}
        setCSS={'rounded-md'}
        setValue={setRaidGuideName}
        value={raidGuideName}
      ></InputLayout>

      {/* 대표 이미지 입력 */}
      <label className='mt-4 text-lg'>* 대표 이미지 URL</label>
      <p className='text-sm'>주소 예시 : /guideImage/레이드 명칭.png</p>

      <InputLayout
        setType={'text'}
        setName={'raidGuideName'}
        setPlaceholder={'대표 이미지 URL'}
        setCSS={'rounded-md'}
        setValue={setRaideGuideMainImage}
        value={raideGuideMainImage}
      ></InputLayout>
      {!imageError && raideGuideMainImage && renderImage(raideGuideMainImage, '레이드 메인 이미지')}

      {/* Youtube URL 추가/삭제 */}
      <div className='mt-4 flex flex-col items-center justify-between sm:flex-row'>
        <label className='mt-4 text-lg'>* 레이드에 도움이 되는 YouTube</label>
        <div className='flex gap-4'>
          <button onClick={addYoutubeUrl} className='rounded-sm bg-gray-900 p-1 px-2 text-white'>
            추가
          </button>
          <button onClick={removeYoutubeUrl} className='rounded-sm bg-gray-900 p-1 px-2 text-white'>
            삭제
          </button>
        </div>
      </div>

      <p className='text-sm'>
        youtube의 URL의 hostName을 www.youtube-nocookie.com으로 해주세요. 원하는 동영상에서
        공유-퍼가기 안에 URL을 복사해서 가져오시면 됩니다.
      </p>

      {/* Youtube URL 입력란 렌더링 */}
      {youtubeUrls.map((url, index) => (
        <div className='flex flex-col' key={index}>
          <InputLayout
            setType={'text'}
            setName={`raidGuideYoutube${index}`}
            setPlaceholder={'YouTube URL'}
            setCSS={'rounded-md mt-2'}
            setValue={(value) => handleUrlChange(index, value)} // 해당 index의 URL 업데이트
            value={url} // 현재 URL 값을 설정
          ></InputLayout>
          {url && (
            <div className='h-[200px] w-[300px]'>
              <iframe
                className='h-full w-full'
                src={url}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                sandbox='allow-same-origin allow-scripts allow-presentation'
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ))}

      {/* Image URL 추가/삭제 */}
      <div className='mt-4 flex flex-col items-center justify-between sm:flex-row'>
        <label className='mt-4 text-lg'>* 레이드에 컨닝페이퍼 Image</label>
        <div className='flex gap-4'>
          <button onClick={addImageUrl} className='rounded-sm bg-gray-900 p-1 px-2 text-white'>
            추가
          </button>
          <button onClick={removeImageUrl} className='rounded-sm bg-gray-900 p-1 px-2 text-white'>
            삭제
          </button>
        </div>
      </div>

      <p className='text-sm'>
        로아 인벤에서 공유되고있는 Image의 주소를 가져오시면 됩니다. 꼭 로아 인벤입니다.
      </p>

      {/* Image URL 입력란 렌더링 */}
      {raidGuideImages.map((url, index) => (
        <div key={index} className='flex flex-col'>
          <InputLayout
            key={index}
            setType={'text'}
            setName={`raidGuideImages${index}`}
            setPlaceholder={'레이드 컨닝페이퍼 URL'}
            setCSS={'rounded-md mt-2'}
            setValue={(value) => handleImageUrlChange(index, value)} // 해당 index의 URL 업데이트
            value={url} // 현재 URL 값을 설정
          ></InputLayout>
          {url && (
            <div className='relative h-[200px] w-[300px]'>
              <Image
                src={url}
                alt={'레이드 이미지'}
                fill
                className='object-fill'
                priority // 우선 로드 속성 추가
              />
            </div>
          )}
        </div>
      ))}
      <div className='mt-4 flex flex-col items-center justify-center'>
        <button className='w-24 rounded-sm bg-gray-900 p-1 px-2 text-white' onClick={handleSave}>
          추가하기
        </button>
        <span className={`${saveStatues === 1 ? '' : 'hidden'} mt-1 text-blue-500`}>
          가이드 등록 성공
        </span>
        <span className={`${saveStatues === 2 ? '' : 'hidden'} mt-1 text-red-500`}>
          가이드 등록 실패
        </span>
      </div>
    </div>
  )
}
