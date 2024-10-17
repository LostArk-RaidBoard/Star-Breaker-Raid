'use client'
import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidMaxTime() {
  const { raidMaxTime, setRaidMaxTime } = useRaidSelect()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidMaxTime(event.target.value)
  }

  return (
    <div className='flex flex-col'>
      <label className='text-lg'>레이드 최대 시간</label>
      <div className='grid h-12 w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
        <div className='flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap'>
          <input
            type='radio'
            id='1시간'
            name='raidMaxTime'
            value='1시간'
            checked={raidMaxTime === '1시간'}
            onChange={handleChange}
            className='h-4 w-4'
          />
          <label htmlFor='1시간'>1시간</label>
        </div>
        <div className='flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap'>
          <input
            type='radio'
            id='2시간'
            name='raidMaxTime'
            value='2시간'
            checked={raidMaxTime === '2시간'}
            onChange={handleChange}
            className='h-4 w-4'
          />
          <label htmlFor='2시간'>2시간</label>
        </div>
        <div className='flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap'>
          <input
            type='radio'
            id='3시간'
            name='raidMaxTime'
            value='3시간'
            checked={raidMaxTime === '3시간'}
            onChange={handleChange}
            className='h-4 w-4'
          />
          <label htmlFor='3시간'>3시간</label>
        </div>
        <div className='flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap'>
          <input
            type='radio'
            id='클리어까지'
            name='raidMaxTime'
            value='클리어까지'
            checked={raidMaxTime === '클리어까지'}
            onChange={handleChange}
            className='h-4 w-4'
          />
          <label htmlFor='클리어까지'>클리어까지</label>
        </div>
      </div>
    </div>
  )
}
