'use client'

import { useEffect, useState } from 'react'

interface Props {
  postNoti: string
}

export default function RaidNotiTextArea({ postNoti }: Props) {
  const [noti, setNoti] = useState('')

  useEffect(() => {
    setNoti(postNoti)
  }, [postNoti])
  return (
    <textarea
      rows={4}
      aria-label='공지 사항 글'
      className='resize-none border p-1'
      disabled
      value={noti}
    ></textarea>
  )
}
