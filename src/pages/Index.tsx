import { FC } from "react";
import { Box, Divider } from "@mui/material";
import { BoardForm } from "../components/BoardForm";
import { BoardList } from "../components/BoardList";

const Index: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "50%",
        margin: "0 auto",
      }}
    >
      <BoardForm />

      <Box sx={{ padding: 2, height: 400 }}>
        <Divider orientation="vertical" />
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 2,
          height: 330,
        }}
      >
        <BoardList />
      </Box>
    </Box>
  );
};

export default Index;
