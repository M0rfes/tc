import { create } from "zustand";

export interface Task {
  title: string;
  description: string;
  deadline: Date;
  isFavorite?: boolean;
}
export interface AppStore {
  boards: { title: string; description: string; columns: [string, Task[]][] }[];
  addBoard: (board: { title: string; description: string }) => void;
  addColumn: (boardIndex: number, column: string) => void;
  addTask: (boardIndex: number, columnIndex: number, task: Task) => void;
  deleteTask: (
    boardIndex: number,
    columnIndex: number,
    taskIndex: number
  ) => void;
  favoriteTask: (
    boardIndex: number,
    columnIndex: number,
    taskIndex: number
  ) => void;
  editTask: (
    boardIndex: number,
    columnIndex: number,
    taskIndex: number,
    task: Task
  ) => void;
  sortTasks: (boardIndex: number, columnIndex: number) => void;
  moveTask: (
    boardIndex: number,
    from: number,
    to: number,
    taskIndex: number
  ) => void;
  reset: () => void;
}

const sortTaskAlphabetically = (tasks: Task[]) => {
  return tasks.sort((a, b) => a.title.localeCompare(b.title));
};

export const sortTask = (column: [string, Task[]]) => {
  const favoriteTasks = column[1].filter((task) => task.isFavorite);
  const otherTasks = column[1].filter((task) => !task.isFavorite);
  return [
    ...sortTaskAlphabetically(favoriteTasks),
    ...sortTaskAlphabetically(otherTasks),
  ];
};

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
  addTask: (boardIndex, columnIndex, task) => {
    set((state) => {
      const boards = [...state.boards];
      boards[boardIndex].columns[columnIndex][1].push(task);
      return { boards };
    });
  },
  deleteTask: (boardIndex, columnIndex, taskIndex) => {
    set((state) => {
      const boards = [...state.boards];
      boards[boardIndex].columns[columnIndex][1].splice(taskIndex, 1);
      return { boards };
    });
  },
  favoriteTask: (boardIndex, columnIndex, taskIndex) => {
    set((state) => {
      const boards = [...state.boards];
      boards[boardIndex].columns[columnIndex][1][taskIndex].isFavorite =
        !boards[boardIndex].columns[columnIndex][1][taskIndex].isFavorite;
      return { boards };
    });
  },
  editTask: (boardIndex, columnIndex, taskIndex, task) => {
    set((state) => {
      const boards = [...state.boards];
      boards[boardIndex].columns[columnIndex][1] = boards[boardIndex].columns[
        columnIndex
      ][1].map((t, index) => (index === taskIndex ? { ...task } : t));
      return { boards };
    });
  },
  sortTasks: (boardIndex, columnIndex) => {
    set((state) => {
      const boards = [...state.boards];
      const column = boards[boardIndex].columns[columnIndex];
      const sortedTasks = sortTask(column);
      boards[boardIndex].columns[columnIndex][1] = sortedTasks;
      return { boards };
    });
  },
  moveTask: (boardIndex, from, to, taskIndex) => {
    set((state) => {
      const boards = [...state.boards];
      const board = boards[boardIndex];
      const task = board.columns[from][1][taskIndex];
      board.columns[from][1].splice(taskIndex, 1);
      board.columns[to][1].push(task);
      return { boards };
    });
  },
  reset: () => set({ boards: [] }),
}));
