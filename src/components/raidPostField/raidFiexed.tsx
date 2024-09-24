'use client'
import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidFiexed() {
  const { raidFixed, setRaidFixed } = useRaidSelect()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidFixed(!raidFixed)
  }
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-lg'>매주 Fixed</label>
      <div className='flex items-center gap-1'>
        <input
          type='checkbox'
          id='raidfixed'
          name='raidfixed'
          checked={raidFixed}
          onChange={handleChange}
        />
        <label htmlFor='raidfixed'>매주 고정</label>
      </div>
    </div>
  )
}
