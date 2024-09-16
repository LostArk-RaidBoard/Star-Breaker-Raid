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

export default function CharacterImage(characterList: CharacterList) {
  if (characterList.CharacterClassName === '버서커') {
    characterList.CharacterClassIcon = '/classIcon/버서커.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker.png'
    return
  }
  if (characterList.CharacterClassName === '디스트로이어') {
    characterList.CharacterClassIcon = '/classIcon/디스트로이어.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/destroyer.png'
    return
  }
  if (characterList.CharacterClassName === '워로드') {
    characterList.CharacterClassIcon = '/classIcon/워로드.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warlord.png'
    return
  }

  if (characterList.CharacterClassName === '홀리나이트') {
    characterList.CharacterClassIcon = '/classIcon/홀리나이트.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/holyknight.png'
    return
  }
  if (characterList.CharacterClassName === '슬레이어') {
    characterList.CharacterClassIcon = '/classIcon/슬레이어.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker_female.png'
    return
  }
  if (characterList.CharacterClassName === '배틀마스터') {
    characterList.CharacterClassIcon = '/classIcon/배틀마스터.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master.png'
    return
  }
  if (characterList.CharacterClassName === '인파이터') {
    characterList.CharacterClassIcon = '/classIcon/인파이터.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter.png'
    return
  }
  if (characterList.CharacterClassName === '기공사') {
    characterList.CharacterClassIcon = '/classIcon/기공사.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/force_master.png'
    return
  }
  if (characterList.CharacterClassName === '창술사') {
    characterList.CharacterClassIcon = '/classIcon/창술사.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/lance_master.png'
    return
  }
  if (characterList.CharacterClassName === '스트라이커') {
    characterList.CharacterClassIcon = '/classIcon/스트라이커.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master_male.png'
    return
  }
  if (characterList.CharacterClassName === '브레이커') {
    characterList.CharacterClassIcon = '/classIcon/브레이커.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter_male.png'
    return
  }
  if (characterList.CharacterClassName === '데빌헌터') {
    characterList.CharacterClassIcon = '/classIcon/데빌헌터.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter.png'
    return
  }
  if (characterList.CharacterClassName === '블래스터') {
    characterList.CharacterClassIcon = '/classIcon/블래스터.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blaster.png'
    return
  }
  if (characterList.CharacterClassName === '호크아이') {
    characterList.CharacterClassIcon = '/classIcon/호크아이.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hawk_eye.png'
    return
  }
  if (characterList.CharacterClassName === '스카우터') {
    characterList.CharacterClassIcon = '/classIcon/스카우터.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/scouter.png'
    return
  }
  if (characterList.CharacterClassName === '건슬링어') {
    characterList.CharacterClassIcon = '/classIcon/건슬링어.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter_female.png'
    return
  }
  if (characterList.CharacterClassName === '아르카나') {
    characterList.CharacterClassIcon = '/classIcon/아르카나.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/arcana.png'
    return
  }
  if (characterList.CharacterClassName === '서머너') {
    characterList.CharacterClassIcon = '/classIcon/서머너.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/summoner.png'
    return
  }
  if (characterList.CharacterClassName === '바드') {
    characterList.CharacterClassIcon = '/classIcon/바드.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/bard.png'
    return
  }
  if (characterList.CharacterClassName === '소서리스') {
    characterList.CharacterClassIcon = '/classIcon/소서리스.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master.png'
    return
  }
  if (characterList.CharacterClassName === '데모닉') {
    characterList.CharacterClassIcon = '/classIcon/데모닉.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/demonic.png'
    return
  }
  if (characterList.CharacterClassName === '블레이드') {
    characterList.CharacterClassIcon = '/classIcon/블레이드.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blade.png'
    return
  }
  if (characterList.CharacterClassName === '리퍼') {
    characterList.CharacterClassIcon = '/classIcon/리퍼.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/reaper.png'
    return
  }
  if (characterList.CharacterClassName === '소울이터') {
    characterList.CharacterClassIcon = '/classIcon/소울이터.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/soul_eater.png'
    return
  }
  if (characterList.CharacterClassName === '도화가') {
    characterList.CharacterClassIcon = '/classIcon/도화가.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/yinyangshi.png'
    return
  }
  if (characterList.CharacterClassName === '기상술사') {
    characterList.CharacterClassIcon = '/classIcon/기상술사.svg'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/weather_artist.png'
    return
  }

  if (characterList.CharacterClassName === '전사(남)') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior.png'
    return
  }

  if (characterList.CharacterClassName === '전사(여)') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior_female.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior_female.png'
    return
  }

  if (characterList.CharacterClassName === '무도가(남)') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter_male.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter_male.png'
    return
  }

  if (characterList.CharacterClassName === '무도가(여)') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter.png'
    return
  }

  if (characterList.CharacterClassName === '헌터(남)') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter.png'
    return
  }

  if (characterList.CharacterClassName === '헌터(여)') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter_female.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter_female.png'
    return
  }

  if (characterList.CharacterClassName === '마법사') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/magician.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/magician.png'
    return
  }

  if (characterList.CharacterClassName === '암살자') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/assassin.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/assassin.png'
    return
  }

  if (characterList.CharacterClassName === '스페셜리스트') {
    characterList.CharacterClassIcon =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/specialist.png'
    characterList.CharacterImage =
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/specialist.png'
    return
  }
  return characterList
}
