import { FC } from "react";
import { Box } from "@mui/material";
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
      <Board />
    </Box>
  );
};

export default BoardPage;
