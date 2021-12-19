import { Home } from "@mui/icons-material";
import {
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
import React from "react";
import TripFormModal from "../../components/TripForm/TripForm";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    background:
      "linear-gradient(-59deg, rgb(152, 175, 189), rgb(33, 183, 213)) !important",
    height: "100vh",
    position: "sticky",
    color: "white",
    border: "1px solid rgb(33, 183, 213)",
    borderTop: "none",
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
      <AvatarGroup max={5}>
        <Avatar alt="Remy Sharp" src="https://bit.ly/3GK7f8a" />
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar alt="Alba Sharp" src="https://bit.ly/30tqgMt" />
        <Avatar alt="Chris Sharp" src="https://bit.ly/3m3jg0A" />
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        <Avatar alt="John Sharp" src="https://bit.ly/30tqgMt" />
        <Avatar>H</Avatar>
        <Avatar></Avatar>
      </AvatarGroup>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home sx={{ mr: 1, color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon sx={{ mr: 1, color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}
