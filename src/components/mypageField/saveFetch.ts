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

// 각 요소의 기본 타입 정의
interface TooltipContentElement {
  bPoint: boolean
  contentStr: string
}

interface TooltipValueElementContentStrElement {
  [key: string]: TooltipContentElement
}

interface TooltipValueElementContentStr {
  contentStr: TooltipValueElementContentStrElement
  topStr: string
}

interface TooltipValueElement {
  Element_000: TooltipValueElementContentStr
}

interface Tooltip {
  type: string // 요소의 타입 (예: "IndentStringGroup")
  value: TooltipValueElement // 중첩된 객체 또는 배열 형태의 값
}

interface SaveCharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  class_icon_url: string
  transcendence: number
  elixir: number
  leap: number
  enlightenment: number
  evolution: number
}

type Points = {
  Name: string
  Value: 0
  Tooltip: string
}

type Effects = {
  Name: string
  Description: string
  Icon: string
  ToolTip: string
}

interface Arkpassive {
  IsArkPassive: boolean
  Points: Points[]
  Effects: Effects[]
}

type Equipment = {
  Type: string
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
}

export default async function SaveCharacterFetch(item: CharacterList, userId: string) {
  const saveCharacterInfo = {
    character_name: item.CharacterName,
    user_id: userId,
    character_level: item.ItemAvgLevel,
    character_class: item.CharacterClassName,
    server_name: item.ServerName,
    class_image: item.CharacterImage,
    class_icon_url: item.CharacterClassIcon,
    transcendence: 0,
    elixir: 0,
    leap: 0,
    enlightenment: 0,
    evolution: 0,
    disable: false,
  }

  let fetchResult = false

  /**
   * lostark arkpassive 정보 가져오기
   */
  try {
    const response = await fetch(`/lostark/armories/characters/${item.CharacterName}/arkpassive`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${process.env.LostArk_Token}`,
      },
    })
    const data: Arkpassive = await response.json()
    if (response.ok) {
      for (const item of data.Points) {
        if (item.Name === '진화') {
          saveCharacterInfo.evolution = item.Value
        }
        if (item.Name === '깨달음') {
          saveCharacterInfo.enlightenment = item.Value
        }
        if (item.Name === '도약') {
          saveCharacterInfo.leap = item.Value
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error)
    }
    fetchResult = false
  }

  /**
   * LostArk 장비 정보 가져오기
   */
  try {
    const response = await fetch(`/lostark/armories/characters/${item.CharacterName}/equipment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${process.env.LostArk_Token}`,
      },
    })
    const data: Equipment[] = await response.json()

    if (response.ok) {
      const characterlevelfloat = parseFloat(saveCharacterInfo.character_level.replace(/,/g, '')) // 쉼표 제거 후 숫자로 변환
      if (characterlevelfloat >= 1600) {
        // 엘릭서 가져오기
        if (response.ok && Array.isArray(data)) {
          if (data.length >= 5) {
            for (let i = 1; i <= 5; i++) {
              const tooltip = JSON.parse(data[i].Tooltip)

              const elixerToolTip = Object.values(tooltip)

              // 엘릭서 툴팁이 있는지 검증하고 sum 시작
              if (typeof elixerToolTip === 'object' && elixerToolTip !== null) {
                parseTooltipForElixer(elixerToolTip as Tooltip[], saveCharacterInfo)
              } else {
                console.error('elixerToolTip is not a valid Tooltip')
              }
            }
          } else {
            console.error('Unexpected data length:', data.length)
          }
        }
      }

      if (characterlevelfloat >= 1610) {
        // 초월 정보  가져오기
        try {
          const tooltip = JSON.parse(data[1].Tooltip)
          const transcendenceTooltip = Object.values(tooltip)

          if (typeof transcendenceTooltip === 'object' && transcendenceTooltip !== null) {
            parseTooltipForTranscendence(transcendenceTooltip as Tooltip[], saveCharacterInfo)
          } else {
            console.error('transcendenceTooltip is not a valid Tooltip')
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Failed to parse Tooltip for data :' + error)
          }
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error)
    }
    fetchResult = false
  }

  /**
   * 이 캐릭터 네임으로 DB에 존재하는지 체크
   */
  try {
    const response = await fetch('/api/characterAPI/characterSave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveCharacterInfo),
    })

    if (response.ok) {
      if (response.status === 201 || response.status === 202) {
        fetchResult = true
      }
      if (response.status === 500) {
        fetchResult = false
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
    }
    fetchResult = false
  }

  return fetchResult
}

/**
 * 초월 파싱
 * @param tooltip : lostark api 투구 정보
 * @param saveCharacterInfo :  DB에 저장하기 위한 캐릭터.json
 */
function parseTooltipForTranscendence(
  transcendenceTooltip: Tooltip[],
  saveCharacterInfo: SaveCharacterInfo,
) {
  try {
    // Tooltip 배열을 순회
    for (const tooltip of transcendenceTooltip) {
      if (tooltip.type === 'IndentStringGroup') {
        const topStr = tooltip.value.Element_000?.topStr

        if (topStr.toString().includes('[초월]')) {
          const elementContentStr = tooltip.value.Element_000.contentStr.Element_001.contentStr
          const cleanText = elementContentStr.replace(/<[^>]*>/g, '')
          const matched = cleanText.match(/(\d+)개/)
          if (matched && matched[1]) {
            // 파싱된 숫자를 saveCharacterInfo.transcendence에 저장
            saveCharacterInfo.transcendence = parseInt(matched[1], 10)
          } else {
            console.error('No valid "숫자개" format found in the content string.')
          }
        }
      }
    }
  } catch (error) {
    console.error('파싱 중 오류 발생:', error)
  }
}

/**
 * lostark 엘릭서 총합 구하기
 * @param tooltip : 무기에서 파싱한 데이터
 * @param saveCharacterInfo : DB에 저장하기 위한 캐릭터.json
 */
function parseTooltipForElixer(elixerToolTip: Tooltip[], saveCharacterInfo: SaveCharacterInfo) {
  let elixirLevelSum = 0

  try {
    // Tooltip 배열을 순회
    for (const tooltip of elixerToolTip) {
      // type이 "IndentStringGroup"인지 확인
      if (tooltip.type === 'IndentStringGroup') {
        // Element_000의 topStr이 특정 조건과 일치하는지 확인
        const topStr = tooltip.value.Element_000?.topStr
        if (topStr.toString().includes('[엘릭서')) {
          const elementContentStr = tooltip.value.Element_000.contentStr

          for (const key in elementContentStr) {
            if (Object.hasOwn(elementContentStr, key)) {
              const subElement = elementContentStr[key]

              // bPoint가 true이고 contentStr에 "Lv."가 포함된 경우
              if (subElement.bPoint && subElement.contentStr.includes('Lv.')) {
                // "Lv." 뒤에 있는 숫자를 추출
                const matches = subElement.contentStr.match(/Lv\.(\d+)/)

                if (matches && matches[1]) {
                  const level = parseInt(matches[1], 10) // 숫자로 변환
                  elixirLevelSum += level // 합산
                }
              }
            }
          }
        }
      }
    }

    // saveCharacterInfo에 elixirLevelSum을 추가
    saveCharacterInfo.elixir += elixirLevelSum
  } catch (error) {
    console.error('파싱 중 오류 발생:', error)
  }
}
