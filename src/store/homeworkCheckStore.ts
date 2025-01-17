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

export default useHomeworkStore
