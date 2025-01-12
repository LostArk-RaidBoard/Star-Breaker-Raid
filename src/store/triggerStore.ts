import { create } from 'zustand'

type triggerState = {
  trigger: boolean
  applicationTrigger: boolean
}

type triggerAction = {
  setTrigger: (inTrigger: boolean) => void
  setApplicationTrigger: (inTrigger: boolean) => void
}

const initalTrigger: triggerState = {
  trigger: false,
  applicationTrigger: false,
}

export const useTrigger = create<triggerAction & triggerState>((set) => ({
  ...initalTrigger,
  setTrigger: (inTrigger) => set(() => ({ trigger: inTrigger })),
  setApplicationTrigger: (inTrigger) => set(() => ({ applicationTrigger: inTrigger })),
}))
