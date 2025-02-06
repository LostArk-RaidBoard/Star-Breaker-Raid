'use client'
import Link from 'next/link'
import Menu from '@image/icon/menu.svg'
import React, { useState, useRef, useEffect } from 'react'

export default function MNaviBar() {
  const [menu, setMenu] = useState(false)
  const [closing, setClosing] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null) // 메뉴의 ref 타입

  const handleMenuToggle = () => {
    if (menu) {
      setClosing(true)
      setTimeout(() => {
        setMenu(false)
        setClosing(false)
      }, 300) // 애니메이션의 지속 시간과 일치하게 설정
    } else {
      setMenu(true)
    }
  }

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // MouseEvent 타입 지정
      if (menu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setClosing(true)
        setTimeout(() => {
          setMenu(false)
          setClosing(false)
        }, 300) // 애니메이션의 지속 시간과 일치하게 설정
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menu])

  return (
    <div className='relative h-full'>
      <button
        className='flex items-center'
        onClick={handleMenuToggle}
        name='Moblie Menu'
        aria-label='Moblie Menu Button'
      >
        <Menu className='h-6 w-6' />
      </button>

      {menu && (
        <div
          ref={menuRef}
          className={`absolute -left-4 top-8 z-50 flex min-h-screen w-44 flex-col items-start gap-4 rounded-r-md border bg-white p-4 text-lg shadow-lg ${closing ? 'slide-out' : 'slide-in'}`}
        >
          {/* 메인 화면 이동 */}
          <Link href={'/'} scroll={false}>
            <span className='py-2 font-semibold transition-colors hover:text-blue-600'>• 메인</span>
          </Link>

          {/* 모집 글 화면 이동 */}
          <Link href={'/raidpost'} scroll={false}>
            <span className='py-2 font-semibold transition-colors hover:text-blue-600'>
              • 모집글
            </span>
          </Link>

          {/* 공략 화면 이동 */}
          <Link href={'/raidguide'} scroll={false}>
            <span className='py-2 font-semibold transition-colors hover:text-blue-600'>• 공략</span>
          </Link>

          {/* 일정 화면 이동 */}
          <Link href={'/schedule'} scroll={false}>
            <span className='py-2 font-semibold transition-colors hover:text-blue-600'>• 일정</span>
          </Link>

          {/* 숙제 화면 이동 */}
          <Link href={'/homework'} scroll={false}>
            <span className='py-2 font-semibold transition-colors hover:text-blue-600'>• 숙제</span>
          </Link>

          {/* 마이페이지 화면 이동 */}
          <Link href={'/mypage'} scroll={false}>
            <span className='py-2 font-semibold transition-colors hover:text-blue-600'>
              • 마이페이지
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}
