// will use material-ui to make a form for user to add a new task board
// will use react-form-hook to handle validation form submission
// will use zod for validation schema

import React, { FC, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { BoardForm } from "../components/BoardForm";

const Index: FC = () => {
  // State to hold title and description input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // State to hold created boards
  const [boards, setBoards] = useState<
    { title: string; description: string }[]
  >([]);

  const handleSubmit = () => {
    // Add the new board to the boards list
    const newBoard = { title, description };
    setBoards([...boards, newBoard]);

    // Reset the input fields
    setTitle("");
    setDescription("");
  };

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

      {/* Vertical Divider */}
      <Box sx={{ padding: 2, height: 400 }}>
        <Divider orientation="vertical" />
      </Box>

      {/* List box */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          height: 330,
        }}
      >
        <List>
          {boards.map((board, index) => (
            <>
              <ListItem key={index}>
                <ListItemText
                  primary={board.title}
                  secondary={board.description}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Index;
