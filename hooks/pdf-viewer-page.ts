import { create } from 'zustand'

interface PDFCurrentPageState {
  page: number
  increase: (by: number) => void
  setPage: (page_number: number) => void
}

const useBearStore = create<PDFCurrentPageState>()((set) => ({
  page: 0,
  increase: (by) => set((state) => ({ page: state.page + by })),
  setPage: (page_number) => set((state) => ({ page: state.page = page_number })),
}))

function flipState(state: boolean) {
  return !state
}

interface isExamPaperVisible {
    examPaperIsShown: boolean
    flipDocumentShown: (currentState: boolean) => void
  }
  
export const useExamDocumentStore = create<isExamPaperVisible>((set) => ({
    examPaperIsShown: true,
    flipDocumentShown: () => set((state) => ({ examPaperIsShown: !state.examPaperIsShown }))
}));