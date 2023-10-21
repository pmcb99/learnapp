import { PresignedUrl } from '@/types/global'
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

interface paperStates {
    examPaperIsShown: boolean
    flipDocumentShown: (currentState: boolean) => void
    examPaperPage: number
    setExamPaperPage: (page_number: number) => void
    markingSchemePage: number
    setMarkingSchemePage: (page_number: number) => void
    year: number,
    setYear: (year: number) => void
    paperVersion: string,
    setPaperVersion: (version: string) => void
    currentPaperS3Key: string,
    setCurrentPaperS3Key: (key: string) => void
    currentPresignedUrl: PresignedUrl,
    setCurrentPresignedUrl: (url: PresignedUrl) => void
  }
  
export const useExamDocumentStore = create<paperStates>((set) => ({
    examPaperIsShown: true,
    flipDocumentShown: () => set((state) => ({ examPaperIsShown: !state.examPaperIsShown })),
    examPaperPage: 1,
    setExamPaperPage: (page_number) => set((state) => ({ examPaperPage: state.examPaperPage = page_number })),
    markingSchemePage: 1,
    setMarkingSchemePage: (page_number) => set((state) => ({ markingSchemePage: state.markingSchemePage = page_number })),
    year: 2023,
    setYear: (year) => set((state) => ({ year: state.year = year })),
    paperVersion: 'paper-one-exam-paper',
    setPaperVersion: (version: string) => set((state) => ({ paperVersion: state.paperVersion = version })),
    currentPaperS3Key: '',
    setCurrentPaperS3Key: (key: string) => set((state) => ({ currentPaperS3Key: state.currentPaperS3Key = key })),
    currentPresignedUrl: { url: '', bucket: '', key: '' },
    setCurrentPresignedUrl: (url: PresignedUrl) => set((state) => ({ currentPresignedUrl: state.currentPresignedUrl = url })),
}));