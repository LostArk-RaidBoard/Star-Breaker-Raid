'use client'

interface Props {
  updateRaidNoti: string
  setUpdateRaidNoti: (noti: string) => void
}
export default function UpdateRaidNoti({ updateRaidNoti, setUpdateRaidNoti }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateRaidNoti(event.target.value)
  }

  return (
    <div className='flex flex-col'>
      <label className='text-lg'>• 공지 사항 수정하기</label>
      <textarea
        id='raidNoti'
        name='raidNoti'
        aria-label='공지 사항 글'
        rows={5}
        placeholder='여기에 입력하세요...'
        value={updateRaidNoti} // 상태로 관리되는 값
        onChange={handleChange} // 변경 이벤트 핸들러
        className='rounded-md border border-gray-300 p-2' // 스타일 추가
      ></textarea>
    </div>
  )
}
