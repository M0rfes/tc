import { FC } from "react";
import { Box } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BoardHeader } from "../components/BoardHeader";
import { Board } from "../components/Board";

const BoardPage: FC = () => {
  return (
    <Box
      sx={{
        margin: 1,
      }}
    >
      <BoardHeader />
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </Box>
  );
};

export default BoardPage;
