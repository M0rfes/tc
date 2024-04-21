import { FC } from "react";
import { Box } from "@mui/material";
import { BoardHeader } from "../components/BoardHeader";

const BoardPage: FC = () => {
  return (
    <Box
      sx={{
        margin: 1,
      }}
    >
      <BoardHeader />
    </Box>
  );
};

export default BoardPage;
