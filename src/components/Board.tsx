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
import { FC, useState } from "react";
import { useParams } from "react-router";
import { Task, useAppStore } from "../store";
import { TaskForm } from "./TaskForm";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
export const Board: FC = () => {
  const props = useParams<{ id: string }>();
  const index = parseInt(props.id!) - 1;
  const { boards, addTask, deleteTask, favoriteTask, editTask, sortTasks } =
    useAppStore();
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
              <Card
                data-testid="column"
                key={colIndex}
                sx={{
                  width: 300,
                  height: "100%",
                }}
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
                      <ListItem
                        key={taskIndex}
                        sx={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                          boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.12)",
                        }}
                        data-testid="task"
                      >
                        <ListItemButton
                          data-testid="edit-task"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTask([colIndex, taskIndex, task]);
                          }}
                        >
                          <ListItemText
                            primary={task.title}
                            secondary={task.description}
                          />
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
                    ))}
                  </List>
                </CardContent>
              </Card>
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
