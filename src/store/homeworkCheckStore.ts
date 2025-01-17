import { create } from 'zustand'

interface HomeworkData {
  user_id: string
  character_name: string
  character_level: string
  chaso_dungeon: boolean[]
  epona: boolean[]
  guardian: boolean[]
  guild: boolean[]
}

interface HomeworkStore {
  homeworkList: HomeworkData[] // 상태 데이터
  setHomeworkList: (data: HomeworkData[]) => void // 상태 설정 함수
}

const useHomeworkStore = create<HomeworkStore>((set) => ({
  homeworkList: [],
  setHomeworkList: (data) => set(() => ({ homeworkList: data })),
}))

interface HomeworkExpeditionData {
  user_id: string
  gathering: boolean[]
  wisdom: boolean[]
  daycontent: boolean[]
}

interface HomeworkExpeditionStore {
  homeworkExpeditionList: HomeworkExpeditionData
  setHomeworkExpeditionList: (data: HomeworkExpeditionData) => void
}

const initialHomeworkExpeditionData: HomeworkExpeditionData = {
  user_id: '',
  gathering: [false, false, false, false, false, false, false],
  wisdom: [false, false, false, false, false, false, false],
  daycontent: [false, false, false, false, false, false, false],
}

export const useHomeworkExpeditionStore = create<HomeworkExpeditionStore>((set) => ({
  homeworkExpeditionList: initialHomeworkExpeditionData,
  setHomeworkExpeditionList: (data) => set(() => ({ homeworkExpeditionList: data })),
}))

export default useHomeworkStore
