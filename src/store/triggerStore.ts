import { create } from 'zustand'

type triggerState = {
  trigger: boolean
}

type triggerAction = {
  setTrigger: (inTrigger: boolean) => void
}

const initalTrigger: triggerState = {
  trigger: false,
}

export const useTrigger = create<triggerAction & triggerState>((set) => ({
  ...initalTrigger,
  setTrigger: (inTrigger) => set((state) => ({ trigger: inTrigger })),
}))
