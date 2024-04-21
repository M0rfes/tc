import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";
import { useAppStore } from "../store";
import { Link } from "react-router-dom";

export const BoardList: FC = () => {
  const { boards } = useAppStore();
  if (boards.length === 0) {
    return <p>No boards available</p>;
  }
  return (
    <List>
      {boards.map((board, index) => (
        <Link key={index} to={`/board/${index}`}>
          <ListItem data-testid="list-item">
            <ListItemText primary={board.title} secondary={board.description} />
          </ListItem>
          <Divider />
        </Link>
      ))}
    </List>
  );
};
