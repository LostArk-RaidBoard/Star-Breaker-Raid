'use client'
import Link from 'next/link'
import Menu from '@image/icon/menu.svg'
import { useState, useRef, useEffect } from 'react'

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
          className={`absolute -left-4 top-9 z-50 flex min-h-screen w-44 flex-col items-start gap-4 rounded-r-md border bg-white p-4 shadow-lg ${closing ? 'slide-out' : 'slide-in'}`}
        >
          <Link href={'/'}>
            <span className='py-2 text-lg hover:text-blue-500'>• 메인</span>
          </Link>
          <Link href={'/raidguide'}>
            <span className='py-2 text-lg hover:text-blue-500'>• 공략</span>
          </Link>
          <Link href={'/raidpost'}>
            <span className='py-2 text-lg hover:text-blue-500'>• 모집글</span>
          </Link>
          <Link href={'/mypage'}>
            <span className='py-2 text-lg hover:text-blue-500'>• 마이페이지</span>
          </Link>
        </div>
      )}
    </div>
  )
}
