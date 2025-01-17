import { create } from 'zustand'
type raidSelectState = {
  raidSelect: string
  raidLimitPerson: number
  raidMaxTime: string
  raidNoti: string
  raidDate: Date
  raidType: string
  raidLimitLevel: number
}

type raidSelectAction = {
  setRaidSelect: (inputRaid: string) => void
  setRaidLimitPerson: (inputNum: number) => void
  setRaidMaxTime: (inputRaidMaxTime: string) => void
  setRaidNoti: (inputRaidNoti: string) => void
  setRaidDate: (inputRaidDate: Date) => void
  setRaidType: (inputRaidType: string) => void
  setRaidLimitLevel: (inputRaidLimitLevel: number) => void
  setReset: () => void
}

const initalRaidSelectState: raidSelectState = {
  raidSelect: '2막 아브렐슈드 하드',
  raidLimitPerson: 8,
  raidMaxTime: '1시간',
  raidNoti: '',
  raidDate: new Date(),
  raidType: '학원',
  raidLimitLevel: 0,
}

export const useRaidSelect = create<raidSelectState & raidSelectAction>((set) => ({
  ...initalRaidSelectState,
  setRaidSelect: (inputSelect) => set(() => ({ raidSelect: inputSelect })),
  setRaidLimitPerson: (inputNumber) => set(() => ({ raidLimitPerson: inputNumber })),
  setRaidMaxTime: (inputRaidMaxTime) => set(() => ({ raidMaxTime: inputRaidMaxTime })),
  setRaidNoti: (inputRaidNoti) => set(() => ({ raidNoti: inputRaidNoti })),
  setRaidDate: (inputRaidDate) => set(() => ({ raidDate: inputRaidDate })),
  setRaidType: (inputRaidType) => set(() => ({ raidType: inputRaidType })),
  setRaidLimitLevel: (inputRaidLimitLevel) => set(() => ({ raidLimitLevel: inputRaidLimitLevel })),
  setReset: () => set(initalRaidSelectState),
}))
