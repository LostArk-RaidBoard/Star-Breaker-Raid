'use client'

import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidSelectSchedule() {
  const { raidSelect, setRaidSelect } = useRaidSelect()

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRaidSelect(e.target.value)
  }

  return (
    <div className='mt-3 flex flex-col'>
      <label className='text-lg font-semibold'>• 레이드 선택</label>
      <select
        name='raidSelect'
        aria-label='레이드 선택 창'
        className='mt-1 h-12 w-full rounded-md border border-gray-400 px-1 text-lg'
        value={raidSelect}
        onChange={selectHandler}
      >
        <option className='text-base' value='2막 아브렐슈드 하드'>
          2막 아브렐슈드 하드
        </option>
        <option className='text-base' value='2막 아브렐슈드 노말'>
          2막 아브렐슈드 노말
        </option>

        <option className='text-base' value='1막 에기르 하드'>
          1막 에기르 하드
        </option>
        <option className='text-base' value='1막 에기르 노말'>
          1막 에기르 노말
        </option>
        <option className='text-base' value='베히모스 노말'>
          베히모스 노말
        </option>
        <option className='text-base' value='서막 에키드나 하드'>
          서막 에키드나 하드
        </option>
        <option className='text-base' value='서막 에키드나 노말'>
          서막 에키드나 노말
        </option>
        <option className='text-base' value='서막 에키드나 싱글'>
          서막 에키드나 싱글
        </option>
        <option className='text-base' value='카멘 하드 1~4관'>
          카멘 하드 1~4관
        </option>
        <option className='text-base' value='카멘 하드 4관'>
          카멘 하드 4관
        </option>
        <option className='text-base' value='카멘 하드 1~3관'>
          카멘 하드 1~3관
        </option>
        <option className='text-base' value='카멘 노말'>
          카멘 노말
        </option>
        <option className='text-base' value='카멘 싱글'>
          카멘 싱글
        </option>
        <option className='text-base' value='상아탑 하드'>
          상아탑 하드
        </option>
        <option className='text-base' value='상아탑 노말'>
          상아탑 노말
        </option>
        <option className='text-base' value='상아탑 싱글'>
          상아탑 싱글
        </option>
        <option className='text-base' value='일리아칸 하드'>
          일리아칸 하드
        </option>
        <option className='text-base' value='일리아칸 노말'>
          일리아칸 노말
        </option>
        <option className='text-base' value='일리아칸 싱글'>
          일리아칸 싱글
        </option>
        <option className='text-base' value='카양겔 하드'>
          카양겔 하드
        </option>
        <option className='text-base' value='카양겔 노말'>
          카양겔 노말
        </option>
        <option className='text-base' value='카양겔 싱글'>
          카양겔 싱글
        </option>
        <option className='text-base' value='아브렐슈드 하드'>
          아브렐슈드 하드
        </option>
        <option className='text-base' value='아브렐슈드 노말'>
          아브렐슈드 노말
        </option>
        <option className='text-base' value='아브렐슈드 싱글'>
          아브렐슈드 싱글
        </option>
        <option className='text-base' value='쿠크세이튼 노말'>
          쿠크세이튼 노말
        </option>
        <option className='text-base' value='쿠크세이튼 싱글'>
          쿠크세이튼 싱글
        </option>
        <option className='text-base' value='비아키스 하드'>
          비아키스 하드
        </option>
        <option className='text-base' value='비아키스 노말'>
          비아키스 노말
        </option>
        <option className='text-base' value='비아키스 싱글'>
          비아키스 싱글
        </option>
        <option className='text-base' value='발탄 하드'>
          발탄 하드
        </option>
        <option className='text-base' value='발탄 노말'>
          발탄 노말
        </option>
        <option className='text-base' value='발탄 싱글'>
          발탄 싱글
        </option>
      </select>
    </div>
  )
}
