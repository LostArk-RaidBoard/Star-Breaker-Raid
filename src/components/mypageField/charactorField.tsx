'use client'
import InputLayout from '@/components/ui/inputLayout'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import NewCharacterField from '@/components/mypageField/newChactorField'
import DBCharacterField from '@/components/mypageField/dbChacracterField'
import CharacterImage from '@/components/utils/characterImage'

interface CharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  transcendence: number
  leap: number
  evolution: number
  enlightenment: number
  elixir: number
  class_icon_url: string
  disable: boolean
}
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

interface Props {
  userId: string
  dbCharacter: CharacterInfo[]
}

export default function CharactorField({ dbCharacter }: Props) {
  const { data: session } = useSession()
  const [mainCharacter, setMainCharacter] = useState('')
  const [mainMessage, setMainMessage] = useState('')
  const [oneMessage, setOneMessage] = useState('')
  const [character, setCharacter] = useState('')
  const [newHidden, setNewHidden] = useState(false)
  const [newCharacterList, setNewCharacterList] = useState<CharacterList[]>([])

  // 내 개정 모든 캐릭터 가져오기
  const handlerAllCharacter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 폼 제출 기본 동작 방지
    if (mainCharacter.length === 0) {
      setMainMessage('캐릭터 이름을 작성해주세요')
      return
    }
    setMainMessage('')

    const encodedMainCharacter = encodeURIComponent(mainCharacter.trim())

    const controller = new AbortController() // AbortController 생성
    const timeoutId = setTimeout(() => {
      controller.abort() // 5초 후 요청 중단
    }, 5000) // 5000ms = 5초

    try {
      const response = await fetch(`/lostark/characters/${encodedMainCharacter}/siblings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${process.env.LostArk_Token}`,
        },
        signal: controller.signal,
      })
      clearTimeout(timeoutId) // 응답을 받으면 타임아웃 제거

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
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setMainMessage('요청이 시간 초과되었습니다.') // 타임아웃 에러 처리
      } else {
        console.error(error)
        setMainMessage('로아 API 패치를 실패했습니다.')
      }
    }
  }

  //한 캐릭터만 추가
  const handlerOneCharacter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 폼 제출 기본 동작 방지
    if (character.length === 0) {
      setOneMessage('캐릭터 이름을 작성해주세요')
      return
    }
    setOneMessage('')

    const controller = new AbortController() // AbortController 생성
    const timeoutId = setTimeout(() => {
      controller.abort() // 5초 후 요청 중단
    }, 5000) // 5000ms = 5초

    const encodedCharacter = encodeURIComponent(character.trim())
    try {
      const response = await fetch(`/lostark/armories/characters/${encodedCharacter}/profiles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${process.env.LostArk_Token}`,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId) // 응답을 받으면 타임아웃 제거
      if (!response.ok) {
        // 응답 상태가 OK가 아닐 경우
        const errorMessage = await response.text() // 오류 메시지 확인
        console.error('Error response:', errorMessage)
        setOneMessage('API 요청 실패')
        return
      }

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
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setOneMessage('요청이 시간 초과되었습니다.') // 타임아웃 에러 처리
      } else {
        console.error(error)
        setOneMessage('로아 API 패치를 실패했습니다.')
      }
    }
  }

  return (
    <>
      {session && session?.user.id ? (
        <div className='flex h-full w-full flex-col p-4'>
          <div className='mt-2 flex w-full flex-col gap-4 sm:flex-row'>
            <div className='flex w-full flex-col sm:basis-1/2'>
              <span className='text-lg'>• 모든 캐릭터 가져오기</span>
              <div className='ml-2 flex flex-col'>
                <span className='mt-2'>대표 캐릭터 입력하기</span>
                <form
                  className='flex flex-col items-center justify-between space-x-2 sm:flex-row'
                  onSubmit={handlerAllCharacter}
                >
                  <InputLayout
                    setType={'text'}
                    setName={'text_character'}
                    setPlaceholder={'대표 캐릭터 입력'}
                    setCSS={'rounded-md h-12 w-full'}
                    setValue={setMainCharacter}
                    value={mainCharacter}
                  />

                  <button className='mt-2 h-9 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500 sm:m-0'>
                    확인
                  </button>
                </form>
                <span className={`${mainMessage.length === 0 ? 'hidden' : ''} text-red-500`}>
                  {mainMessage}
                </span>
              </div>
            </div>
            <div className='sm: flex w-full flex-col sm:basis-1/2'>
              <span className='text-lg'>• 한 캐릭터 가져오기</span>
              <div className='ml-2 flex flex-col'>
                <span className='mt-2'>캐릭터명 입력하기</span>
                <form
                  className='flex flex-col items-center justify-between space-x-2 sm:flex-row'
                  onSubmit={handlerOneCharacter}
                >
                  <InputLayout
                    setType={'text'}
                    setName={'text_character'}
                    setPlaceholder={'캐릭터명 입력'}
                    setCSS={'rounded-md h-12 w-full'}
                    setValue={setCharacter}
                    value={character}
                  />

                  <button className='mt-2 h-9 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500 sm:m-0'>
                    확인
                  </button>
                </form>
                <span className={`${oneMessage.length === 0 ? 'hidden' : ''} text-red-500`}>
                  {oneMessage}
                </span>
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
          <DBCharacterField userId={session.user.id} dbCharacter={dbCharacter} />
        </div>
      ) : (
        <div className='flex h-20 w-full items-center justify-center text-xl'>로그인 해주세요</div>
      )}
    </>
  )
}
