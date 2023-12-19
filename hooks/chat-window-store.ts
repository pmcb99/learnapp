import { PresignedUrl } from '@/types/global'
import { create } from 'zustand'

interface chatStates {
    chatShown: boolean
    setChatShown: (chatShown: boolean) => void
  }
  
export const useChatComponentStore = create<chatStates>((set) => ({
    chatShown: false,
    setChatShown: (chatShown) => set((state) => ({ chatShown: state.chatShown = chatShown })),
}));