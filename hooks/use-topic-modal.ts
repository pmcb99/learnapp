import { create } from 'zustand';

interface useTopicModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTopicModal = create<useTopicModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));