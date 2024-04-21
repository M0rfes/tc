import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";

export const BoardForm: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        data-testid="title
      "
      >
        Create New Board
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4} // This makes it a text area with a height of 4 lines
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth>
        Create New Board
      </Button>
    </Box>
  );
};
