import { create } from 'zustand'
type raidSelectState = {
  raidSelect: string
  raidLimitPerson: number
  raidMaxTime: string
  raidNoti: string
  raidDate: Date | null
  raidFixed: boolean
  raidType: string
  raidLimitLevel: number
}

type raidSelectAction = {
  setRaidSelect: (inputRaid: string) => void
  setRaidLimitPerson: (inputNum: number) => void
  setRaidMaxTime: (inputRaidMaxTime: string) => void
  setRaidNoti: (inputRaidNoti: string) => void
  setRaidDate: (inputRaidDate: Date) => void
  setRaidFixed: (inputRaidFixed: boolean) => void
  setRaidType: (inputRaidType: string) => void
  setRaidLimitLevel: (inputRaidLimitLevel: number) => void
  setReset: () => void
}

const initalRaidSelectState: raidSelectState = {
  raidSelect: '카제로스 아브렐슈드 하드',
  raidLimitPerson: 8,
  raidMaxTime: '1시간',
  raidNoti: '',
  raidDate: new Date(),
  raidFixed: false,
  raidType: '',
  raidLimitLevel: 0,
}

export const useRaidSelect = create<raidSelectState & raidSelectAction>((set) => ({
  ...initalRaidSelectState,
  setRaidSelect: (inputSelect) => set((state) => ({ raidSelect: inputSelect })),
  setRaidLimitPerson: (inputNumber) => set((state) => ({ raidLimitPerson: inputNumber })),
  setRaidMaxTime: (inputRaidMaxTime) => set((state) => ({ raidMaxTime: inputRaidMaxTime })),
  setRaidNoti: (inputRaidNoti) => set((state) => ({ raidNoti: inputRaidNoti })),
  setRaidDate: (inputRaidDate) => set((state) => ({ raidDate: inputRaidDate })),
  setRaidFixed: (inputRaidFiexed) => set((state) => ({ raidFixed: inputRaidFiexed })),
  setRaidType: (inputRaidType) => set((state) => ({ raidType: inputRaidType })),
  setRaidLimitLevel: (inputRaidLimitLevel) =>
    set((state) => ({ raidLimitLevel: inputRaidLimitLevel })),
  setReset: () => set(initalRaidSelectState),
}))
