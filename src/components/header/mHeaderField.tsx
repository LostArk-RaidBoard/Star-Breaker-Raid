'use client'
import LogField from '@/components/header/HeadlogField'
import NaviBar from '@/components/header/NaviBar'
import Menu from '@image/icon/menu.svg'
import { useState } from 'react'

export default function MHeaderField() {
  const [link, setLinek] = useState(false)
  return (
    <nav className='flex w-full flex-col items-center justify-between sm:hidden'>
      <div className='flex w-full items-center justify-between'>
        <button
          className='h-12 w-12'
          aria-label='Menu'
          id='menu'
          onClick={() => {
            setLinek(!link)
          }}
        >
          <Menu className='h-8 w-8' />
        </button>
        <LogField />
      </div>
      <div className={`${link ? '' : 'hidden'}`}>
        <NaviBar />
      </div>
    </nav>
  )
}
