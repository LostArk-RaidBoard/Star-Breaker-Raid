'use client'

import { useHomeworkExpeditionStore } from '@/store/homeworkCheckStore'
import { useEffect } from 'react'
import Image from 'next/image'
import FieldBoss from '@image/image/필드보스.png'
import CoseGate from '@image/image/카게.png'
import WisdomImage from '@image/image/영지.png'
import GatheringImage from '@image/image/생활.png'

interface HomeworkExpeditionData {
  user_id: string
  gathering: boolean[]
  wisdom: boolean[]
  daycontent: boolean[]
}

interface HomeworkExpeditionProps {
  homeworkExpeditionData: HomeworkExpeditionData[]
}
export default function HomeworkExpeditionTable({
  homeworkExpeditionData,
}: HomeworkExpeditionProps) {
  const { homeworkExpeditionList, setHomeworkExpeditionList } = useHomeworkExpeditionStore()
  const homeworkExpedition = homeworkExpeditionData[0]
  const day = ['', '수', '목', '금', '토', '일', '월', '화']
  const content = [0, 1, 2, 3, 4, 5, 6]

  const gatheringHandler = (index: number, value: boolean) => {
    const updatedList = homeworkExpeditionList
    updatedList.gathering[index] = !value
    setHomeworkExpeditionList(updatedList)
  }

  const wisdomHandler = (index: number, value: boolean) => {
    const updatedList = homeworkExpeditionList
    updatedList.wisdom[index] = !value
    setHomeworkExpeditionList(updatedList)
  }

  const dayContentHandler = (index: number, value: boolean) => {
    const updatedList = homeworkExpeditionList
    if (index === 0) return

    updatedList.daycontent[index] = !value
    setHomeworkExpeditionList(updatedList)
  }

  useEffect(() => {
    setHomeworkExpeditionList(homeworkExpedition)
  }, [homeworkExpedition, setHomeworkExpeditionList])
  return (
    <div className='w-full overflow-x-auto rounded-md bg-white'>
      <div className='table w-full min-w-[1200px] border-collapse'>
        <div className='table-row'>
          {day.map((item, key) => (
            <div
              key={`dayhomework-${key}`}
              className={`table-cell bg-gray-800 p-2 text-center font-bold text-white ${
                key === 0 ? 'sticky left-0 z-10 w-[185px]' : 'w-[145px]'
              }`}
              style={key === 0 ? { width: '185px' } : { width: '145px' }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className='table-row border-b border-gray-300'>
          <div className='sticky left-0 z-10 table-cell border-r border-gray-200 bg-white p-2 text-center align-middle font-bold'>
            콘텐츠
          </div>
          {content.map((item, key) => (
            <div
              key={`dayhomeworkContent-${key}`}
              className={`table-cell w-[145px] text-center align-middle ${item === 6 ? '' : 'border-r border-gray-200'}`}
            >
              <div className='grid h-[60px] w-full grid-cols-3'>
                <div
                  className={`${
                    homeworkExpeditionList.gathering[item] ? 'bg-gray-400' : ''
                  } flex h-full w-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                  onClick={() => {
                    gatheringHandler(item, homeworkExpeditionList.gathering[item])
                  }}
                >
                  <Image src={GatheringImage} alt='생활 이미지' width={20} height={20} priority />
                  <input
                    type='checkbox'
                    id={`gathering-checkbox-${item}`}
                    name={`gathering-checkbox-${item}`}
                    aria-label='생활 버튼'
                    checked={homeworkExpeditionList.gathering[item]}
                    className='hover:cursor-pointer'
                    readOnly
                  />
                </div>
                <div
                  className={`${
                    homeworkExpeditionList.wisdom[item] ? 'bg-gray-400' : ''
                  } flex h-full w-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                  onClick={() => {
                    wisdomHandler(item, homeworkExpeditionList.wisdom[item])
                  }}
                >
                  <Image src={WisdomImage} alt='영지 이미지' width={20} height={20} priority />
                  <input
                    type='checkbox'
                    id={`wisdom-checkbox-${item}`}
                    name={`wisdom-checkbox-${item}`}
                    aria-label='영지 체크 버튼'
                    checked={homeworkExpeditionList.wisdom[item]}
                    className='hover:cursor-pointer'
                    readOnly
                  />
                </div>
                <div
                  className={`${
                    homeworkExpeditionList.daycontent[item] ? 'bg-gray-400' : ''
                  } flex h-full w-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                  onClick={() => {
                    dayContentHandler(item, homeworkExpeditionList.daycontent[item])
                  }}
                >
                  <div className='flex w-full flex-row items-center justify-center'>
                    <Image
                      src={CoseGate}
                      alt='day콘텐츠 카게 이미지'
                      width={20}
                      height={20}
                      className={`${item % 2 !== 0 || item === 4 ? '' : 'hidden'}`}
                      priority
                    />
                    <Image
                      src={FieldBoss}
                      alt='day콘텐츠 필보 이미지'
                      width={20}
                      height={20}
                      className={`${item % 2 !== 0 || item === 0 ? 'hidden' : ''}`}
                      priority
                    />
                  </div>
                  <input
                    type='checkbox'
                    id={`daycontent-checkbox-${item}`}
                    name={`daycontent-checkbox-${item}`}
                    aria-label='daycontents 체크 버튼'
                    className={`${item === 0 ? 'hidden' : ''} hover:cursor-pointer`}
                    checked={homeworkExpeditionList.daycontent[item]}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
