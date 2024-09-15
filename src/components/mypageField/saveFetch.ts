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

interface SaveCharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  class: string
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
    class: item.CharacterClassName,
    server_name: item.ServerName,
    class_image: item.CharacterImage,
    class_icon_url: item.CharacterClassIcon,
    transcendence: 0,
    elixir: 0,
    leap: 0,
    enlightenment: 0,
    evolution: 0,
  }

  /**
   * lostark arkpassive 정보 가져오기
   */
  try {
    const response = await fetch(`/lostark/armories/characters/${item.CharacterName}/arkpassive`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${process.env.NEXT_PUBLIC_LostArk_Token}`,
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
  } catch (e) {
    console.error(e)
  }

  /**
   * LostArk 초월 정보 가져오기
   */
  try {
    const response = await fetch(`/lostark/armories/characters/${item.CharacterName}/equipment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${process.env.NEXT_PUBLIC_LostArk_Token}`,
      },
    })
    const data: Equipment[] = await response.json()

    if (response.ok) {
      const characterlevelfloat = parseFloat(saveCharacterInfo.character_level.replace(/,/g, '')) // 쉼표 제거 후 숫자로 변환
      if (characterlevelfloat >= 1600) {
        // 엘릭서 가져오기
        for (let i = 1; i <= 5; i++) {
          const tooltip = JSON.parse(data[i].Tooltip)
          parseTooltipForElixer(tooltip, saveCharacterInfo)
        }
      }

      if (characterlevelfloat >= 1610) {
        // 초월 정보  가져오기
        const tooltip = JSON.parse(data[1].Tooltip)
        parseTooltipForTranscendence(tooltip, saveCharacterInfo)
      }
    }
  } catch (e) {
    console.error(e)
  }

  console.log(saveCharacterInfo)
}

/**
 * 초월 파싱
 * @param tooltip : lostark api 투구 정보
 * @param saveCharacterInfo :  DB에 저장하기 위한 캐릭터.json
 */
function parseTooltipForTranscendence(tooltip: any, saveCharacterInfo: SaveCharacterInfo) {
  for (let key in tooltip) {
    if (tooltip.hasOwnProperty(key)) {
      const element = tooltip[key]

      if (element.type === 'IndentStringGroup' && element.value != null) {
        for (let subKey in element.value) {
          const subElement = element.value[subKey]

          if (subElement && subElement.contentStr) {
            for (let innerKey in subElement.contentStr) {
              const innerElement = subElement.contentStr[innerKey]

              if (typeof innerElement.contentStr === 'string') {
                const actualContentStr = innerElement.contentStr

                if (actualContentStr.includes('모든 장비에 적용된 총')) {
                  const cleanText = actualContentStr.replace(/<[^>]*>/g, '') // HTML 태그 제거
                  const matched = cleanText.match(/\d+/) // 숫자 추출
                  if (matched) {
                    saveCharacterInfo.transcendence = parseInt(matched[0], 10)
                    console.log('Found number:', parseInt(matched[0], 10)) // 숫자 값 출력

                    // 값을 찾으면 모든 루프를 빠져나옴
                    break
                  } else {
                    console.log('No number matched in:', actualContentStr)
                  }
                }
              } else {
                console.log(`innerElement.contentStr is not a string for key: ${innerKey}`)
              }
            }
          } else {
            console.log(`subElement.contentStr is not a valid object for key: ${subKey}`)
          }
        }
      }
    }
    if (saveCharacterInfo.transcendence != 0) break // 값을 찾으면 외부 루프도 종료
  }
}

/**
 * lostark 엘릭서 총합 구하기
 * @param tooltip : 무기에서 파싱한 데이터
 * @param saveCharacterInfo : DB에 저장하기 위한 캐릭터.json
 */
function parseTooltipForElixer(tooltip: any, saveCharacterInfo: SaveCharacterInfo) {
  let elixirLevelSum = 0

  for (let key in tooltip) {
    if (tooltip.hasOwnProperty(key)) {
      const element = tooltip[key]

      if (element.type === 'IndentStringGroup' && element.value != null) {
        for (let subKey in element.value) {
          const subElement = element.value[subKey]

          if (subElement && subElement.contentStr) {
            for (let innerKey in subElement.contentStr) {
              const innerElement = subElement.contentStr[innerKey]

              if (typeof innerElement.contentStr === 'string') {
                const actualBPoint = innerElement.bPoint
                const actualContentStr = innerElement.contentStr

                if (actualBPoint) {
                  const matches = actualContentStr.match(/Lv\.(\d+)/)
                  if (matches && matches[1]) {
                    const level = parseInt(matches[1], 10)
                    elixirLevelSum += level
                  }
                }
              } else {
                console.log(`innerElement.contentStr is not a string for key: ${innerKey}`)
              }
            }
          } else {
            console.log(`subElement.contentStr is not a valid object for key: ${subKey}`)
          }
        }
      }
    }
  }

  // saveCharacterInfo에 elixir 합산 저장
  saveCharacterInfo.elixir += elixirLevelSum
  console.log('Total Elixir Level:', saveCharacterInfo.elixir)
}
