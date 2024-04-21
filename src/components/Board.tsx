import { Box } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { Task, useAppStore } from "../store";
import { TaskForm } from "./TaskForm";
import { Column } from "./Column";
export const Board: FC = () => {
  const props = useParams<{ id: string }>();
  const index = parseInt(props.id!) - 1;
  const { boards, addTask, editTask } = useAppStore();
  const board = boards[index];
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [task, setTask] = useState<[number, number, Task] | null>(null);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 64px)",
          overflowX: "scroll",
          mt: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              width: "100%",
              height: "100%",
            }}
          >
            {board.columns.map((column, colIndex) => (
              <Column
                key={colIndex}
                board={index}
                colIndex={colIndex}
                column={column}
                index={index}
                setSelectedColumn={setSelectedColumn}
                setTask={setTask}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <TaskForm
        open={Number.isInteger(selectedColumn)}
        task={task?.[2] ?? null}
        onClose={() => {
          setSelectedColumn(null);
          setTask(null);
        }}
        onSubmit={(t) => {
          if (task) {
            editTask(index, task[0], task[1], t);
          } else {
            addTask(index, selectedColumn!, t);
          }
          setSelectedColumn(null);
          setTask(null);
        }}
      />
    </>
  );
};
