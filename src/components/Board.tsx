import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { Task, useAppStore } from "../store";
import { TaskForm } from "./TaskForm";

export const Board: FC = () => {
  const props = useParams<{ id: string }>();
  const index = parseInt(props.id!) - 1;
  const { boards } = useAppStore();
  const board = boards[index];
  const [selectedColumn, setSelectedColumn] = useState<[string, Task[]] | null>(
    null
  );

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
            {board.columns.map((column, index) => (
              <Card
                data-testid="column"
                key={index}
                sx={{
                  width: 300,
                  height: "100%",
                }}
              >
                <CardHeader
                  title={column[0]}
                  action={
                    <Button
                      data-testid="add-task"
                      onClick={() => setSelectedColumn(column)}
                    >
                      +
                    </Button>
                  }
                />
                <CardContent></CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
      <TaskForm
        open={!!selectedColumn}
        onClose={() => setSelectedColumn(null)}
        onSubmit={(task) => {}}
      />
    </>
  );
};
