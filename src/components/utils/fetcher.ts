'use client'

import Cookies from 'js-cookie'

export const fetcher = async (url: string, userId: string, keyName: string) => {
  const normalizedUserId = userId && userId.trim() !== '' ? userId : 'anonymous'
  const cacheKey = `${keyName}-${normalizedUserId}` // 🔹 고유 키 생성
  const cachedEtag = Cookies.get(`${cacheKey}ETag`) // 🔹 저장된 ETag 가져오기
  const cachedData = Cookies.get(`${cacheKey}Data`) // 🔹 저장된 데이터 가져오기

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cachedEtag ? { 'If-None-Match': cachedEtag } : {}), // 🔹 ETag가 있다면 요청에 포함
    },
  })

  if (res.status === 304) {
    return cachedData ? JSON.parse(cachedData) : [] // 🔹 쿠키에서 데이터 로드
  }

  const data = await res.json()

  const newEtag = res.headers.get('ETag')

  if (newEtag) {
    Cookies.set(`${cacheKey}ETag`, newEtag, { expires: 1 }) // 🔹 쿠키에 ETag 저장
  }

  // 🔹 데이터도 쿠키에 저장
  Cookies.set(`${cacheKey}Data`, JSON.stringify(data.postRows), { expires: 1 })

  return data.postRows
}
