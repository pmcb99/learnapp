import { PresignedUrl } from '@/types/global'
import { create } from 'zustand'

interface paperStates {
    examPaperPage: number
    setExamPaperPage: (page_number: number) => void
    markingSchemePage: number
    setMarkingSchemePage: (page_number: number) => void
    samplePaperPage: number
    setSamplePaperPage: (page_number: number) => void
    projectPaperPage: number
    setProjectPaperPage: (page_number: number) => void
    year: number,
    setYear: (year: number) => void
    currentPresignedUrl: PresignedUrl,
    setCurrentPresignedUrl: (url: PresignedUrl) => void
  }
  
export const useExamDocumentStore = create<paperStates>((set) => ({
    examPaperPage: 1,
    setExamPaperPage: (page_number) => set((state) => ({ examPaperPage: state.examPaperPage = page_number })),
    markingSchemePage: 1,
    setMarkingSchemePage: (page_number) => set((state) => ({ markingSchemePage: state.markingSchemePage = page_number })),
    samplePaperPage: 1,
    setSamplePaperPage: (page_number) => set((state) => ({ samplePaperPage: state.samplePaperPage = page_number })),
    projectPaperPage: 1,
    setProjectPaperPage: (page_number) => set((state) => ({ projectPaperPage: state.projectPaperPage = page_number })),
    year: 2023,
    setYear: (year) => set((state) => ({ year: state.year = year })),
    currentPresignedUrl: { url: '', bucket: '', key: '' },
    setCurrentPresignedUrl: (url: PresignedUrl) => set((state) => ({ currentPresignedUrl: state.currentPresignedUrl = url })),
}));