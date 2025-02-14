export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`[Fetcher Error]: HTTP ${res.status} - ${res.statusText}`)
      return { postRows: [] } // ❗ 오류 발생 시 빈 배열 반환
    }

    return await res.json()
  } catch (error) {
    console.error('[Fetcher Network Error]:', error)
    return { postRows: [] } // ❗ 네트워크 오류 발생 시 빈 배열 반환
  }
}
