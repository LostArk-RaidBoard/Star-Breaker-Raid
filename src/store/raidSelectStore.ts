import { create } from 'zustand'
type raidSelectState = {
  raidSelect: string
  raidLimitPerson: number
  raidDetail: string
  raidMaxTime: string
  raidNoti: string
  raidDate: Date | null
}

type raidSelectAction = {
  setRaidSelect: (inputRaid: string) => void
  setRaidLimitPerson: (inputNum: number) => void
  setRaidDetail: (inputRaidDetail: string) => void
  setRaidMaxTime: (inputRaidMaxTime: string) => void
  setRaidNoti: (inputRaidNoti: string) => void
  setRaidDate: (inputRaidDate: Date) => void
}

const initalRaidSelectState: raidSelectState = {
  raidSelect: '에기르 하드',
  raidLimitPerson: 8,
  raidDetail: '',
  raidMaxTime: '1hour',
  raidNoti: '',
  raidDate: new Date(),
}

export const useRaidSelect = create<raidSelectState & raidSelectAction>((set) => ({
  ...initalRaidSelectState,
  setRaidSelect: (inputSelect) => set((state) => ({ raidSelect: inputSelect })),
  setRaidLimitPerson: (inputNumber) => set((state) => ({ raidLimitPerson: inputNumber })),
  setRaidDetail: (inputRaidDetail) => set((state) => ({ raidDetail: inputRaidDetail })),
  setRaidMaxTime: (inputRaidMaxTime) => set((state) => ({ raidMaxTime: inputRaidMaxTime })),
  setRaidNoti: (inputRaidNoti) => set((state) => ({ raidNoti: inputRaidNoti })),
  setRaidDate: (inputRaidDate) => set((state) => ({ raidDate: inputRaidDate })),
}))
