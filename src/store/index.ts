import { create } from "zustand";

export interface AppStore {
  boards: { title: string; description: string }[];
  addBoard: (board: { title: string; description: string }) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  boards: [],
  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  reset: () => set({ boards: [] }),
}));
