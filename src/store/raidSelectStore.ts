import { create } from 'zustand'
type raidSelectState = {
  raidSelect: string
  raidLimitPerson: number
  raidDetail: string
}

type raidSelectAction = {
  setRaidSelect: (inputRaid: string) => void
  setRaidLimitPerson: (inputNum: number) => void
  setRaidDetail: (inputRaidDetail: string) => void
}

const initalRaidSelectState: raidSelectState = {
  raidSelect: '',
  raidLimitPerson: 8,
  raidDetail: '',
}

export const useRaidSelect = create<raidSelectState & raidSelectAction>((set) => ({
  ...initalRaidSelectState,
  setRaidSelect: (inputSelect) => set((state) => ({ raidSelect: inputSelect })),
  setRaidLimitPerson: (inputNumber) => set((state) => ({ raidLimitPerson: inputNumber })),
  setRaidDetail: (inputRaidDetail) => set((state) => ({ raidDetail: inputRaidDetail })),
}))
