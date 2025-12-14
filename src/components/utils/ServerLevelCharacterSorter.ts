interface SaveCharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  class_icon_url: string
  leap: number
  enlightenment: number
  evolution: number
  disable: boolean
  combat_power: string
}

export default function ServerLevelCharacterSorter(list: SaveCharacterInfo[]) {
  return list.sort((a, b) => {
    // 서버 이름을 기준으로 정렬
    if (a.server_name < b.server_name) return -1
    if (a.server_name > b.server_name) return 1

    // 같은 서버 이름일 경우 character_level을 기준으로 내림차순 정렬
    const levelA = parseFloat(a.character_level.replace(/,/g, ''))
    const levelB = parseFloat(b.character_level.replace(/,/g, ''))
    return levelB - levelA // 내림차순 정렬
  })
}
