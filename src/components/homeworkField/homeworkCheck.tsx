'use client'

import HomeworkUpdateButton from '@/components/button/homeworkUpdateButton'
import HomeworkSetTable from '@/components/homeworkField/homeworkSetTable'
import React from 'react'

interface HomeworkCheckProps {
  homeworkGet: HomeworkData[] // 전달될 데이터의 형식
}

interface HomeworkData {
  user_id: string
  character_name: string
  character_level: string
  chaso_dungeon: boolean[]
  epona: boolean[]
  guardian: boolean[]
  guild: boolean[]
}

export default function HomeworkCheck({ homeworkGet }: HomeworkCheckProps) {
  // 정렬된 데이터를 생성
  const homeworkSortedList = homeworkSorted(homeworkGet)

  return (
    <div className='mt-4'>
      <h3 className='text-lg font-semibold'>숙제 목록</h3>

      <HomeworkSetTable homeworkSortedList={homeworkSortedList} />

      <HomeworkUpdateButton />
    </div>
  )
}

function homeworkSorted(homeworkGet: HomeworkData[]): HomeworkData[] {
  return homeworkGet.sort((a, b) => {
    // character_level을 숫자로 변환하여 내림차순 정렬
    const levelA = parseFloat(a.character_level.replace(/,/g, ''))
    const levelB = parseFloat(b.character_level.replace(/,/g, ''))
    return levelB - levelA
  })
}
