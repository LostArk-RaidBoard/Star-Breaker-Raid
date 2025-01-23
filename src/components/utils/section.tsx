import React from 'react'

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className='mt-6 flex h-full w-full items-center justify-center px-5 pb-4 sm:px-16'>
      {children}
    </div>
  )
}
