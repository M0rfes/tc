import {
  Box,
  Button,
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
import { useAppStore } from "../store";
import { TaskForm } from "./TaskForm";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
export const Board: FC = () => {
  const props = useParams<{ id: string }>();
  const index = parseInt(props.id!) - 1;
  const { boards, addTask, deleteTask, favoriteTask } = useAppStore();
  const board = boards[index];
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
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
                    <IconButton
                      data-testid="add-task"
                      onClick={() => setSelectedColumn(colIndex)}
                    >
                      <AddIcon />
                    </IconButton>
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
                        <ListItemButton>
                          <ListItemText
                            primary={task.title}
                            secondary={task.description}
                          />
                          <IconButton
                            data-testid="fav-task"
                            onClick={() =>
                              favoriteTask(index, colIndex, taskIndex)
                            }
                          >
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton
                            data-testid="delete-task"
                            onClick={() =>
                              deleteTask(index, colIndex, taskIndex)
                            }
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
        onClose={() => setSelectedColumn(null)}
        onSubmit={(task) => {
          addTask(index, selectedColumn!, task);
          setSelectedColumn(null);
        }}
      />
    </>
  );
};
