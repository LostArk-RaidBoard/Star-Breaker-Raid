import { create } from 'zustand'

type CharacterState = {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  class_icon_url: string
  transcendence: number
  elixir: number
  leap: number
  enlightenment: number
  evolution: number
}

type CharacterListState = {
  characterInfo: CharacterState[]
  characterAllList: CharacterState[]
}

type CharacterListAction = {
  setCharacterInfo: (inputCharacterInfo: CharacterState[]) => void
  setCharacterAllList: (inputCharacterList: CharacterState[]) => void
}

const initalCharacterInfoList: CharacterListState = {
  characterInfo: [],
  characterAllList: [],
}

export const useCharacterInfoList = create<CharacterListState & CharacterListAction>((set) => ({
  ...initalCharacterInfoList,
  setCharacterInfo: (inputCharacterInfo) => set((state) => ({ characterInfo: inputCharacterInfo })),
  setCharacterAllList: (inputCharacterList) =>
    set((state) => ({ characterAllList: inputCharacterList })),
}))
