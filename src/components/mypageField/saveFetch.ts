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
  character_level: number
  class: string
  server_name: string
  class_image: string
  class_icon_url: string
  transcendence: number
  elixir: number
  jump: number
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
   * lostark 엘릭서 정보 가져오기
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
      const tooltip = JSON.parse(data[1].Tooltip)
      for (let key in tooltip) {
        if (tooltip.hasOwnProperty(key)) {
          const element = tooltip[key]

          if (element.type === 'IndentStringGroup' && element.value != null) {
            console.log('element 값 :' + element.value)
            if (element.vaule.Element_000) {
              console.log(element.value.Element_000.contentStr.Element_001.contentStr)
            }
          }
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
  console.log(saveCharacterInfo)
}
