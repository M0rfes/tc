import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Task as TaskType, useAppStore } from "../store";
import { useDrag } from "react-dnd";

type TaskProps = {
  task: TaskType;
  taskIndex: number;
  colIndex: number;
  index: number;
  setTask: (
    value: React.SetStateAction<[number, number, TaskType] | null>
  ) => void;
};

export const Task: FC<TaskProps> = ({
  task,
  taskIndex,
  colIndex,
  index,
  setTask,
}) => {
  const { deleteTask, favoriteTask } = useAppStore();

  const [, drag] = useDrag(() => ({
    type: "TASK",
    item: { task, colIndex, taskIndex },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItem
      key={taskIndex}
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.12)",
      }}
      data-testid="task"
      ref={drag}
    >
      <ListItemButton
        data-testid="edit-task"
        onClick={(e) => {
          e.stopPropagation();
          setTask([colIndex, taskIndex, task]);
        }}
      >
        <ListItemText primary={task.title} secondary={task.description} />
        <IconButton
          data-testid="fav-task"
          onClick={(e) => {
            e.stopPropagation();
            favoriteTask(index, colIndex, taskIndex);
          }}
        >
          <FavoriteIcon
            sx={{
              color: task.isFavorite ? "red" : "inherit",
            }}
          />
        </IconButton>
        <IconButton
          data-testid="delete-task"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(index, colIndex, taskIndex);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};
