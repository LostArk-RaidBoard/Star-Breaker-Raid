'use client'
import SaveCharacterFetch from '@/components/mypageField/saveFetch'
import Xmark from '@image/icon/xmark.svg'
import Image from 'next/image'
import { useState } from 'react'

interface CharacterList {
  CharacterClassName: string
  CharacterLevel: number
  CharacterName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
  ServerName: string
  CharacterClassIcon: string
  CharacterImage: string
}

interface Props {
  newCharacterList: CharacterList[]
  newHidden: boolean
  setNewHidden: (hidden: boolean) => void
  setNewCharacterList: (characterList: CharacterList[]) => void
  userId: string
}
export default function NewCharacterField({
  newCharacterList,
  newHidden,
  setNewHidden,
  setNewCharacterList,
  userId,
}: Props) {
  const [saveState, SetsaveState] = useState(0)

  const newCharacterResetHandler = () => {
    setNewCharacterList([])
    setNewHidden(false)
  }

  const deleteItemHandler = (index: number, itemCharacterName: string) => {
    console.log(index, itemCharacterName)
    let filltered = newCharacterList.filter(
      (element) => element.CharacterName !== itemCharacterName,
    )
    setNewCharacterList(filltered)
    if (filltered.length === 0) {
      setNewHidden(false)
    }
  }

  const saveItemHandler = async () => {
    console.log(newCharacterList)
    for (const item of newCharacterList) {
      await SaveCharacterFetch(item, userId) // 함수로 호출
    }
  }

  return (
    <div className={`mt-4 ${newHidden ? '' : 'hidden'}`}>
      <div className='flex flex-col items-center justify-between sm:flex-row'>
        <span className='flex w-full items-center justify-start text-xl sm:w-auto'>
          추가 캐릭터 선택창
        </span>
        <div className='flex w-full items-center justify-end gap-4 sm:w-auto sm:justify-center'>
          <span className={`${saveState === 1 ? '' : 'hidden'} text-blue-500`}>저장 성공</span>
          <span className={`${saveState === 2 ? '' : 'hidden'} text-red-500`}>저장 실패</span>
          <button
            className='h-8 w-20 rounded-md bg-gray-900 p-1 px-1 text-white'
            onClick={() => {
              saveItemHandler()
            }}
          >
            추가
          </button>
          <button
            className='h-8 w-20 rounded-md bg-gray-900 p-1 px-1 text-white'
            onClick={() => {
              newCharacterResetHandler()
            }}
          >
            취소
          </button>
        </div>
      </div>

      {/* 새로운 캐릭터 그리드로 넣기 */}
      <div className='mt-2 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {newCharacterList.map((item, index) => (
          <div
            key={index}
            className='flex h-20 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'
          >
            <div className='h-12 w-12 flex-none overflow-hidden rounded-full'>
              <Image
                src={item.CharacterImage}
                alt={item.CharacterClassName}
                width={70}
                height={70}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='grow flex-col overflow-hidden'>
              <div className='flex items-center gap-1 overflow-hidden truncate whitespace-nowrap'>
                <div className='h-6 w-6 overflow-hidden rounded-full'>
                  <Image
                    src={item.CharacterClassIcon}
                    alt={item.CharacterClassName}
                    width={70}
                    height={70}
                    className='h-full w-full object-cover'
                  />
                </div>
                <span className='overflow-hidden truncate whitespace-nowrap'>
                  {item.CharacterName}
                </span>
                <span className='ml-1 hidden overflow-hidden truncate whitespace-nowrap sm:block'>
                  {item.ServerName}
                </span>
              </div>
              <span> {item.ItemAvgLevel}</span>
            </div>

            <Xmark
              className='h-5 w-5 flex-none rounded-sm border border-gray-400 bg-gray-100 stroke-[4px] text-red-500 hover:cursor-pointer hover:bg-gray-500'
              onClick={() => {
                deleteItemHandler(index, item.CharacterName)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
