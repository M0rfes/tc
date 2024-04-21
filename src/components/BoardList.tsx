import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { FC, Fragment } from "react";
import { useAppStore } from "../store";

export const BoardList: FC = () => {
  const { boards } = useAppStore();
  if (boards.length === 0) {
    return <p>No boards available</p>;
  }
  return (
    <List>
      {boards.map((board, index) => (
        <Fragment key={index}>
          <ListItem data-testid="list-item">
            <ListItemText primary={board.title} secondary={board.description} />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
