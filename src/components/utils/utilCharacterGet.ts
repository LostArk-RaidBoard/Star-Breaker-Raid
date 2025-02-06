import ServerLevelCharacterSorter from '@/components/utils/ServerLevelCharacterSorter'

export default async function UtileCharacterDataFetch(userId: string) {
  if (userId === '') {
    return []
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/characterAPI/characterGet?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // 1시간 캐시
        },
        next: { tags: ['posts'] },
      },
    )

    const data = await response.json()

    if (response.ok && response.status === 200) {
      const getCharacterList = data.result
      const charcter = ServerLevelCharacterSorter(getCharacterList)
      return charcter
    } else {
      return []
    }
  } catch (error) {
    console.error('getCharacter' + error)
  }
  return []
}
