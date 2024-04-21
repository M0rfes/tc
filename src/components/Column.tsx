import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { Task, useAppStore } from "../store";
import { useDrag, useDrop } from "react-dnd";
import { Task as TaskComponent } from "./Task";

type ColumnProps = {
  board: number;
  colIndex: number;
  column: [string, Task[]];
  index: number;
  setSelectedColumn: React.Dispatch<React.SetStateAction<number | null>>;
  setTask: React.Dispatch<React.SetStateAction<[number, number, Task] | null>>;
};

export const Column: FC<ColumnProps> = ({
  board,
  colIndex,
  column,
  index,
  setSelectedColumn,
  setTask,
}) => {
  const { moveTask, sortTasks } = useAppStore();

  const [, drop] = useDrop(() => ({
    accept: "TASK",

    drop: (item: { task: Task; colIndex: number; taskIndex: number }) => {
      moveTask(board, item.colIndex, colIndex, item.taskIndex);
    },
  }));
  return (
    <Card
      data-testid="column"
      key={colIndex}
      sx={{
        width: 300,
        height: "100%",
      }}
      ref={drop}
    >
      <CardHeader
        title={column[0]}
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              data-testid="add-task"
              onClick={() => setSelectedColumn(colIndex)}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              data-testid="sort-task"
              onClick={() => sortTasks(index, colIndex)}
            >
              <SortByAlphaIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <List>
          {column[1].map((task, taskIndex) => (
            <TaskComponent
              key={taskIndex}
              task={task}
              taskIndex={taskIndex}
              colIndex={colIndex}
              index={index}
              setTask={setTask}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
