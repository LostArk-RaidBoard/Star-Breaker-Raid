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

export type LostarkProfileStat = {
  Type: string
  Value: string
  Tooltip: string[] // 문서 기준 배열
}

export type LostarkProfileTendency = {
  Type: string
  Point: number
  MaxPoint: number
}

export type LostarkProfileDecorations = {
  Symbol: string
  Emblems: string[]
}

export type LostarkCharacterProfile = {
  CharacterImage: string
  ExpeditionLevel: number
  TownLevel: number | null
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: LostarkProfileStat[]
  Tendencies: LostarkProfileTendency[]
  CombatPower: string
  Decorations: LostarkProfileDecorations
  HonorPoint: number
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
}

export default async function CharacterSaveService(item: CharacterList, userId: string) {
  const saveCharacterInfo = {
    character_name: item.CharacterName,
    user_id: userId,
    character_level: item.ItemAvgLevel,
    character_class: item.CharacterClassName,
    server_name: item.ServerName,
    class_image: item.CharacterImage,
    class_icon_url: item.CharacterClassIcon,
    leap: 0,
    enlightenment: 0,
    evolution: 0,
    disable: false,
    combat_power: '',
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
   * LostArk 캐릭터 전투력 가져오기
   */
  try {
    const response = await fetch(`/lostark/armories/characters/${item.CharacterName}/profiles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${process.env.LostArk_Token}`,
      },
    })

    const data: LostarkCharacterProfile = await response.json()

    if (response.ok) {
      if (data.CombatPower) {
        saveCharacterInfo.combat_power = data.CombatPower
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
