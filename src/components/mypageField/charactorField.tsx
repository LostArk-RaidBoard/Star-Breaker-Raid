'use client'
import InputLayout from '@/components/ui/inputLayout'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import NewCharacterField from '@/components/mypageField/newChactorField'
import DBCharacterField from '@/components/mypageField/dbChacracterField'
import CharacterImage from '@/components/utils/characterImage'

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

type Stats = {
  Type: string
  Value: string
  Tooltip: [string]
}

type Tendencies = {
  Type: string
  Point: number
  MaxPoint: number
}
interface CharacterProfiles {
  CharacterImage: string
  ExpeditionLevel: number
  PvpGradeName: string
  TownLevel: string
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: Stats[]
  Tendencies: Tendencies[]
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}

export default function CharactorField() {
  const { data: session } = useSession()
  const [mainCharacter, setMainCharacter] = useState('')
  const [mainMessage, setMainMessage] = useState('')
  const [oneMessage, setOneMessage] = useState('')
  const [character, setCharacter] = useState('')
  const [newHidden, setNewHidden] = useState(false)
  const [newCharacterList, setNewCharacterList] = useState<CharacterList[]>([])

  // 내 개정 모든 캐릭터 가져오기
  const handlerAllCharacter = async () => {
    if (mainCharacter.length === 0) {
      setMainMessage('캐릭터 이름을 작성해주세요')
      return
    }
    setMainMessage('')
    try {
      const response = await fetch(`/lostark/characters/${mainCharacter}/siblings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${process.env.NEXT_PUBLIC_LostArk_Token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        if (data.length === 0) {
          setMainMessage('검색되는 캐릭터가 없습니다.')
          return
        }

        for (const item of data) {
          CharacterImage(item)
        }

        setNewCharacterList((prevList) => {
          const updatedList = [...prevList]

          data.forEach((dataCharacter: CharacterList) => {
            const isDuplicate = updatedList.some(
              (existingCharacter) =>
                existingCharacter.CharacterName === dataCharacter.CharacterName,
            )

            if (!isDuplicate) {
              updatedList.push(dataCharacter)
            }
          })

          return updatedList
        })

        setNewHidden(true)
      }
    } catch (e) {
      setMainMessage('로아 API 패치를 실패했습니다.')
      console.error(e)
    }
  }

  //한 캐릭터만 추가
  const handlerOneCharacter = async () => {
    if (character.length === 0) {
      setOneMessage('캐릭터 이름을 작성해주세요')
      return
    }
    setOneMessage('')

    try {
      const response = await fetch(`/lostark/armories/characters/${character}/profiles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${process.env.NEXT_PUBLIC_LostArk_Token}`,
        },
      })

      const data: CharacterProfiles = await response.json()
      if (response.ok) {
        if (data === null) {
          setOneMessage('검색되는 캐릭터가 없습니다.')
          return
        }

        const characterList = {
          CharacterClassName: data.CharacterClassName,
          CharacterLevel: data.CharacterLevel,
          CharacterName: data.CharacterName,
          ItemAvgLevel: data.ItemAvgLevel,
          ItemMaxLevel: data.ItemMaxLevel,
          ServerName: data.ServerName,
          CharacterClassIcon: '',
          CharacterImage: '',
        }

        CharacterImage(characterList)

        setNewCharacterList((prevList) => {
          // 중복된 캐릭터가 있는지 확인
          const isDuplicate = prevList.some(
            (existingCharacter) => existingCharacter.CharacterName === characterList.CharacterName,
          )

          // 중복이 없으면 추가, 중복이면 그대로 이전 리스트 반환
          if (!isDuplicate) {
            return [...prevList, characterList]
          }

          return prevList
        })
        setNewHidden(true)
      }
    } catch (e) {
      console.error(e)
      setOneMessage('로아 API 패치를 실패했습니다.')
    }
  }

  return (
    <>
      {session && session?.user.id ? (
        <div className='flex h-full w-full flex-col p-4'>
          <span className='text-lg'>캐릭터 관리</span>
          <div className='mt-2 flex w-full flex-col gap-4 sm:flex-row'>
            <div className='flex w-full flex-col sm:w-[50%]'>
              <span className='text-lg'>• 모든 캐릭터 가져오기</span>
              <div className='ml-2 flex flex-col'>
                <span className='mt-2'>대표 캐릭터 입력하기</span>
                <InputLayout
                  setType={'text'}
                  setName={'text_character'}
                  setPlaceholder={'대표 캐릭터 입력'}
                  setCSS={'rounded-md h-12 max-w-[400px] '}
                  setValue={setMainCharacter}
                  value={mainCharacter}
                />
                <span className={`${mainMessage.length === 0 ? 'hidden' : ''} text-red-500`}>
                  {mainMessage}
                </span>
                <button
                  className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'
                  onClick={handlerAllCharacter}
                >
                  확인
                </button>
              </div>
            </div>
            <div className='sm: flex w-full flex-col sm:w-[50%]'>
              <span className='text-lg'>• 한 캐릭터 가져오기</span>
              <div className='ml-2 flex flex-col'>
                <span className='mt-2'>캐릭터명 입력하기</span>
                <InputLayout
                  setType={'text'}
                  setName={'text_character'}
                  setPlaceholder={'캐릭터명 입력'}
                  setCSS={'rounded-md h-12 max-w-[400px] '}
                  setValue={setCharacter}
                  value={character}
                />
                <span className={`${oneMessage.length === 0 ? 'hidden' : ''} text-red-500`}>
                  {oneMessage}
                </span>
                <button
                  className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'
                  onClick={handlerOneCharacter}
                >
                  확인
                </button>
              </div>
            </div>
          </div>

          {/* 새로운 캐릭터 보이는 장소 */}
          <NewCharacterField
            newCharacterList={newCharacterList}
            newHidden={newHidden}
            setNewHidden={setNewHidden}
            setNewCharacterList={setNewCharacterList}
            userId={session.user.id}
          />

          {/* 데이터베이스에서 보이는 장소 */}
          <DBCharacterField />
        </div>
      ) : (
        <div className='flex h-20 w-full items-center justify-center text-xl'>로그인 해주세요</div>
      )}
    </>
  )
}
