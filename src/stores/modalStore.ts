import { create } from "zustand";

interface ModalStore {
  isImageModalOpen: boolean;
  setImageModalOpen: (state: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isImageModalOpen: false,
  setImageModalOpen: (state) => set({ isImageModalOpen: state }),
}));
