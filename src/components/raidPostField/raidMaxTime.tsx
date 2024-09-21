'use client'
import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidMaxTime() {
  const { raidMaxTime, setRaidMaxTime } = useRaidSelect()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidMaxTime(event.target.name)
  }

  return (
    <div className='flex flex-col'>
      <label className='text-lg'>레이드 최대 시간</label>
      <div className='grid h-12 w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='1hour'
            name='1hour'
            checked={raidMaxTime === '1hour'}
            onChange={handleChange}
          />
          <label htmlFor='1hour'>1시간</label>
        </div>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='1hourHalf'
            name='1hourHalf'
            checked={raidMaxTime === '1hourHalf'}
            onChange={handleChange}
          />
          <label htmlFor='1hourHalf'>1시간 30분</label>
        </div>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='2hour'
            name='2hour'
            checked={raidMaxTime === '2hour'}
            onChange={handleChange}
          />
          <label htmlFor='2hour'>2시간</label>
        </div>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='2hourHalf'
            name='2hourHalf'
            checked={raidMaxTime === '2hourHalf'}
            onChange={handleChange}
          />
          <label htmlFor='2hourHalf'>2시간 30분</label>
        </div>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='anything'
            name='anything'
            checked={raidMaxTime === 'anything'}
            onChange={handleChange}
          />
          <label htmlFor='anything'>최대한 많이</label>
        </div>
      </div>
    </div>
  )
}
