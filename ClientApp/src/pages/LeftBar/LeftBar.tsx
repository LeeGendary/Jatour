import { Home } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Container, Typography, AvatarGroup, Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import ChatIcon from "@mui/icons-material/Chat";
import React, { useState } from "react";
import TripFormModal from "../../components/TripForm/TripForm";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    background: "white",
    height: "100vh",
    color: "#555",
    border: "1px solid #ece7e7",
    boxShadow:
      "0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)",
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: 3,
  },
});

export default function LeftBar() {
  const classes = useStyles();
  return (
    <Container
      className={classes.container}
      sx={{ pt: 4, justifyContent: "center" }}
    >
      <TripFormModal />
      <Typography variant="h6" gutterBottom>
        Members
      </Typography>
      <AvatarGroup max={4}>
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        <Avatar>K</Avatar>
        <Avatar></Avatar>
      </AvatarGroup>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home sx={{ mr: 1 }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon sx={{ mr: 1 }} />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}
