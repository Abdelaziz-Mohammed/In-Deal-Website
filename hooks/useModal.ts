"use client";

import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  content: any;
  open: (type: string, content: any) => void;
  close: () => void;
};

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  open: (_, content) => set({ isOpen: true, content }),
  close: () => set({ isOpen: false, content: null }),
}));
