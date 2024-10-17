'use client'
import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidNoti() {
  const { raidNoti, setRaidNoti } = useRaidSelect()
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRaidNoti(event.target.value)
  }
  return (
    <div className='flex flex-col'>
      <label className='text-lg'>공지 사항</label>
      <textarea
        id='raidNoti'
        name='raidNoti'
        aria-label='공지 사항 글'
        rows={5}
        placeholder='여기에 입력하세요...'
        value={raidNoti} // 상태로 관리되는 값
        onChange={handleChange} // 변경 이벤트 핸들러
        className='rounded-md border border-gray-300 p-2' // 스타일 추가
      ></textarea>
    </div>
  )
}
