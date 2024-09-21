'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'

export default function RaidPostCreateButton() {
  const { raidDetail, raidLimitPerson, raidMaxTime, raidNoti, raidSelect, raidDate } =
    useRaidSelect()
  const { characterInfo } = useCharacterInfoList()

  const raidCreateHandler = async () => {
    console.log(raidDate)
    console.log(raidSelect)
    console.log(raidNoti)
    console.log(raidMaxTime)
    console.log(raidDetail)
    console.log(raidLimitPerson)
    console.log(characterInfo)
  }
  return (
    <button
      className='mt-2 w-32 rounded-md border bg-gray-900 p-1 px-2 text-lg text-white hover:bg-gray-500'
      onClick={raidCreateHandler}
    >
      레이드 개설
    </button>
  )
}
