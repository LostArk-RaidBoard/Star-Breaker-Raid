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

const classImageMap: Record<string, { icon: string; image: string }> = {
  // 슈사이어 전사 이미지
  버서커: {
    icon: '/classIcon/버서커.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker.png',
  },
  디스트로이어: {
    icon: '/classIcon/디스트로이어.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/destroyer.png',
  },
  워로드: {
    icon: '/classIcon/워로드.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warlord.png',
  },
  홀리나이트: {
    icon: '/classIcon/홀리나이트.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/holyknight.png',
  },
  슬레이어: {
    icon: '/classIcon/슬레이어.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/berserker_female.png',
  },

  // 무도가 이미지
  배틀마스터: {
    icon: '/classIcon/배틀마스터.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master.png',
  },
  인파이터: {
    icon: '/classIcon/인파이터.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter.png',
  },
  기공사: {
    icon: '/classIcon/기공사.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/force_master.png',
  },
  창술사: {
    icon: '/classIcon/창술사.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/lance_master.png',
  },
  스트라이커: {
    icon: '/classIcon/스트라이커.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/battle_master_male.png',
  },
  브레이커: {
    icon: '/classIcon/브레이커.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/infighter_male.png',
  },

  // 헌터 이미지
  데빌헌터: {
    icon: '/classIcon/데빌헌터.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter.png',
  },
  블래스터: {
    icon: '/classIcon/블래스터.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blaster.png',
  },
  호크아이: {
    icon: '/classIcon/호크아이.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hawk_eye.png',
  },
  스카우터: {
    icon: '/classIcon/스카우터.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/scouter.png',
  },
  건슬링어: {
    icon: '/classIcon/건슬링어.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/devil_hunter_female.png',
  },

  // 실링 이미지
  아르카나: {
    icon: '/classIcon/아르카나.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/arcana.png',
  },
  서머너: {
    icon: '/classIcon/서머너.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/summoner.png',
  },
  바드: {
    icon: '/classIcon/바드.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/bard.png',
  },
  소서리스: {
    icon: '/classIcon/소서리스.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master.png',
  },

  // 암살자 이미지
  데모닉: {
    icon: '/classIcon/데모닉.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/demonic.png',
  },
  블레이드: {
    icon: '/classIcon/블레이드.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/blade.png',
  },
  리퍼: {
    icon: '/classIcon/리퍼.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/reaper.png',
  },
  소울이터: {
    icon: '/classIcon/소울이터.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/soul_eater.png',
  },

  // 스페셜리스트 이미지
  도화가: {
    icon: '/classIcon/도화가.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/yinyangshi.png',
  },
  기상술사: {
    icon: '/classIcon/기상술사.svg',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/weather_artist.png',
  },

  환수사: {
    icon: '/classIcon/환수사.svg',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/alchemist.png',
  },

  //클래스 기본 이미지
  '전사(남)': {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior.png',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior.png',
  },

  '전사(여)': {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior_female.png',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/warrior_female.png',
  },

  '무도가(남)': {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter_male.png',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter_male.png',
  },

  '무도가(여)': {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter.png',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/fighter.png',
  },

  '헌터(남)': {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter.png',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter.png',
  },

  '헌터(여)': {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter_female.png',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/hunter_female.png',
  },

  마법사: {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/magician.png',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/magician.png',
  },

  암살자: {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/assassin.png',
    image: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/assassin.png',
  },

  스페셜리스트: {
    icon: 'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/specialist.png',
    image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/specialist.png',
  },
}

export default function CharacterClassImageProvider(characterList: CharacterList) {
  const classData = classImageMap[characterList.CharacterClassName]
  if (classData) {
    characterList.CharacterClassIcon = classData.icon
    characterList.CharacterImage = classData.image
  }

  return characterList
}
