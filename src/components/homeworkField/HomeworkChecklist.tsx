'use client'
import useHomeworkStore from '@/store/homeworkCheckStore'
import Image from 'next/image'
import React, { useEffect } from 'react'
import GuildImage from '@image/image/길드.png'

interface HomeworkData {
  user_id: string
  character_name: string
  character_level: string
  chaso_dungeon: boolean[]
  epona: boolean[]
  guardian: boolean[]
  guild: boolean[]
}

interface HomeworkSetCheckProps {
  homeworkSortedList: HomeworkData[] // 이 부분이 HomeworkData[] 형식임을 반영
}

export default function HomeworkChecklist({ homeworkSortedList }: HomeworkSetCheckProps) {
  const day = ['', '수', '목', '금', '토', '일', '월', '화']

  const { homeworkList, setHomeworkList } = useHomeworkStore()

  const guildHandler = (index: number, number: number, value: boolean) => {
    const updatedList = [...homeworkList]
    updatedList[index].guild[number] = !value
    setHomeworkList(updatedList)
  }

  const chasoDungeonHandler = (index: number, number: number, value: boolean) => {
    const updatedList = [...homeworkList]
    updatedList[index].chaso_dungeon[number] = !value
    setHomeworkList(updatedList)
  }

  const guardianHandler = (index: number, number: number, value: boolean) => {
    const updatedList = [...homeworkList]
    updatedList[index].guardian[number] = !value
    setHomeworkList(updatedList)
  }
  const eponaHandler = (index: number, number: number, value: boolean) => {
    const updatedList = [...homeworkList]
    updatedList[index].epona[number] = !value
    setHomeworkList(updatedList)
  }

  const indexNumber = [0, 1, 2, 3, 4, 5, 6]

  useEffect(() => {
    setHomeworkList(homeworkSortedList)
  }, [homeworkSortedList, setHomeworkList])

  return (
    <div className='w-full overflow-x-auto rounded-md bg-white'>
      <div className='table w-full min-w-[1200px] border-collapse'>
        <div className='table-row'>
          {day.map((item, key) => (
            <div
              key={key}
              className={`table-cell bg-gray-800 p-2 text-center font-bold text-white ${
                key === 0 ? 'sticky left-0 z-10' : ''
              }`}
              style={key === 0 ? { width: '185px' } : {}}
            >
              {item || '캐릭터'}
            </div>
          ))}
        </div>

        {homeworkList.map((item, index) => (
          <div key={index} className='table-row border-b border-gray-300'>
            <div
              className='sticky left-0 z-10 table-cell border-r border-gray-300 bg-white text-center align-middle'
              style={{ width: '185px', height: '60px' }}
            >
              <p className='truncate'>{item.character_name}</p>
            </div>
            {indexNumber.map((number, index1) => (
              <div
                key={`checkbox-${index}-${number}-${index1}`}
                className={`table-cell w-[145px] text-center align-middle ${number === 6 ? '' : 'border-r border-gray-300'}`}
              >
                <div className='grid h-[60px] w-full grid-cols-4'>
                  <div
                    className={`${
                      item.guild[number] ? 'bg-gray-400' : ''
                    } flex h-full w-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                    onClick={() => {
                      guildHandler(index, number, item.guild[number])
                    }}
                  >
                    <Image src={GuildImage} alt='길드 이미지' width={20} height={20} priority />
                    <input
                      type='checkbox'
                      aria-label='길드 체크 버튼'
                      checked={item.guild[number]}
                      className='hover:cursor-pointer'
                      readOnly
                    />
                  </div>
                  <div
                    className={`${
                      item.chaso_dungeon[number] ? 'bg-gray-400' : ''
                    } flex h-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                    onClick={() => {
                      chasoDungeonHandler(index, number, item.chaso_dungeon[number])
                    }}
                  >
                    <Image
                      src={
                        'https://cdn-lostark.game.onstove.com/uploadfiles/notice/2d6d1f84c0d2492e963629a784925092.png'
                      }
                      alt='쿠르잔 전선 이미지'
                      width={20}
                      height={20}
                    />
                    <input
                      type='checkbox'
                      aria-label='카던 체크 버튼'
                      checked={item.chaso_dungeon[number]}
                      className='hover:cursor-pointer'
                      readOnly
                    />
                  </div>
                  <div
                    className={`${
                      item.guardian[number] ? 'bg-gray-400' : ''
                    } flex h-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                    onClick={() => {
                      guardianHandler(index, number, item.guardian[number])
                    }}
                  >
                    <Image
                      src={
                        'https://cdn-lostark.game.onstove.com/uploadfiles/notice/204f46e984a64c71b5a059d3c9fcea2b.png'
                      }
                      alt='가디언 토벌 이미지'
                      width={20}
                      height={20}
                    />
                    <input
                      type='checkbox'
                      aria-label='가토 체크 버튼'
                      checked={item.guardian[number]}
                      className='hover:cursor-pointer'
                      readOnly
                    />
                  </div>
                  <div
                    className={`${
                      item.epona[number] ? 'bg-gray-400' : ''
                    } flex h-full flex-col items-center justify-center gap-2 hover:cursor-pointer`}
                    onClick={() => {
                      eponaHandler(index, number, item.epona[number])
                    }}
                  >
                    <Image
                      src={
                        'https://cdn-lostark.game.onstove.com/uploadfiles/notice/de4dd870c84240bb8beebde650ed18d0.png'
                      }
                      alt='에포나 이미지'
                      width={20}
                      height={20}
                    />
                    <input
                      type='checkbox'
                      aria-label='에포 체크 버튼'
                      checked={item.epona[number]}
                      className='hover:cursor-pointer'
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
