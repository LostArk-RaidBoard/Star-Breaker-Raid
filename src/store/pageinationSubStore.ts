import { create } from 'zustand'

type paginationStore = {
  currentPage: number
  dataLength: number
  itemsPerPage: number
}

type pageinationAction = {
  setCurrentPage: (currentPage: number) => void
  setItemsPerPage: (itmesPerNumber: number) => void
  setDataLength: (dataLength: number) => void
}

const initialPageination: paginationStore = {
  currentPage: 1,
  dataLength: 0,
  itemsPerPage: 7, //한 페이지에 보여줄 갯수
}

export const usePageinationSub = create<paginationStore & pageinationAction>((set) => ({
  ...initialPageination,
  setCurrentPage: (currentPage) => set((state) => ({ currentPage: currentPage })),
  setItemsPerPage: (itmesPerNumber) => set((state) => ({ itemsPerPage: itmesPerNumber })),
  setDataLength: (dataLength) => set((state) => ({ dataLength: dataLength })),
}))
