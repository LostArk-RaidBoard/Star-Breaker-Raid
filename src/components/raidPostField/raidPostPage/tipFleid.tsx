import Image from 'next/image'
import React from 'react'

interface Props {
  id: string
}

export default function TipFleid({ id }: Props) {
  const decodedId = decodeURIComponent(id) // URL 디코딩

  let lender
  if (decodedId === '엘릭서') {
    lender = (
      <div className='flex flex-col'>
        <h2 className='text-lg'>• 엘릭서 옵션 정리</h2>

        <p className='mt-4 text-balance'>
          보스피해 5Lv (2.4%) ≥ 치명타피해 5Lv (2.4%) ＞ 추가피해 5Lv (2.19%) ＞ 보스피해 4Lv (1.8%)
          ≥ 치명타피해 4Lv (1.8%) ＞ 추가피해 4Lv (1.64%) ＞ 혼돈 5Lv (1.44%) ＞ 공격력 5Lv (1.29%)
          ＞ 질서 5Lv (1.25%) ＞ 보스피해 3Lv (1.21%) ＞ 치명타피해 3Lv (1.2%) ＞ 추가피해 3Lv
          (1.1%) ＞ 혼돈 4Lv (1.08%) ＞ 힘민지 5Lv (1.02%)＞ 무기공격력 5Lv (0.99%) ＞ 공격력 4Lv
          (0.97%) ＞ 질서 4Lv (0.94%) ＞ 보스피해 2Lv (0.8%) ＞ 치명타피해 2Lv (0.79%) ＞ 힘민지 4Lv
          (0.77%) ＞ 무기공격력 4Lv (0.74%) ＞ 혼돈 3Lv (0.72%) ≥ 추가피해 2Lv (0.72%) ＞ 공격력 3Lv
          (0.65%) ＞ 질서 3Lv (0.63%) ＞ 힘민지 3Lv (0.51%) ＞ 무기공격력 3Lv (0.5%) ＞ 혼돈 2Lv
          (0.47%) ＞ 공격력 2Lv (0.43%) ＞ 질서 2Lv (0.41%) ＞ 보스피해 1Lv (0.39%) ≥ 치명타피해 1Lv
          (0.39%) ＞ 추가피해 1Lv (0.35%) ＞ 힘민지 2Lv (0.34%) ＞ 무기공격력 2Lv (0.33%) ＞ 혼돈
          1Lv (0.23%) ＞ 공격력 1Lv (0.21%) ＞ 질서 1Lv (0.2%) ＞ 힘민지 1Lv (0.17%) ＞ 무기공격력
          1Lv (0.16%)
        </p>
        <h2 className='mt-4 text-lg'>• 정리된 이미지</h2>
        <div className='w-full'>
          <Image
            src={'https://upload3.inven.co.kr/upload/2023/04/07/bbs/i13954269228.png?MW=720'}
            alt={'컨닝페이퍼'}
            width={800}
            height={1250}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              border: 0,
            }}
            className='object-cover'
            loading='lazy'
          />
        </div>
      </div>
    )
  } else {
    lender = <div>알 수 없는 항목입니다.</div> // 기본 반환 내용 추가
  }

  return <div className='h-full w-full'>{lender}</div>
}
