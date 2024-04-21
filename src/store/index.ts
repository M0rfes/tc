import { create } from "zustand";

export interface Task {
  title: string;
  description: string;
  deadline: Date;
}
export interface AppStore {
  boards: { title: string; description: string; columns: [string, Task[]][] }[];
  addBoard: (board: { title: string; description: string }) => void;
  addColumn: (boardIndex: number, column: string) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  boards: [],
  addBoard: (board) =>
    set((state) => ({
      boards: [
        ...state.boards,
        {
          ...board,
          columns: [],
        },
      ],
    })),
  addColumn: (boardIndex, column) => {
    set((state) => {
      const boards = [...state.boards];
      boards[boardIndex].columns.push([column, []]);
      return { boards };
    });
  },
  reset: () => set({ boards: [] }),
}));
