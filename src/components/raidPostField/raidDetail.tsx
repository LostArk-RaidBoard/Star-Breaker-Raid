'use client'

import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidDetail() {
  const { raidDetail, setRaidDetail } = useRaidSelect()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidDetail(event.target.value)
  }
  return (
    <div className='flex flex-col'>
      <label className='text-lg'>레이드 디테일</label>
      <input
        className={`h-12 rounded-md border border-gray-200 px-1`}
        type='text'
        name='raid_detail'
        autoComplete='off'
        value={raidDetail}
        placeholder='레이드 디테일을 적어주세요 숙련, 반숙 1-3관문'
        onChange={handleChange}
      ></input>
    </div>
  )
}
