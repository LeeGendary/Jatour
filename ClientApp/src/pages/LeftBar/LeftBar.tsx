import { Add, Home, Logout, Person, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  CSSObject,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import React from "react";
import { styled } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { makeStyles } from "@mui/styles";
import CreateEditTrip from "../../components/Form/CreateEditTrip";
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const LeftBarContainer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  background: "linear-gradient(-59deg, rgb(152, 175, 189), rgb(33, 183, 213))",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//Style
const useStyles = makeStyles({
  bg: {
    background:
      "linear-gradient(-59deg, rgb(152, 175, 189), rgb(33, 183, 213)) !important",
    color: "white",
  },
});
export default observer(function LeftBar() {
  const { themeStore, modalStore } = useStore();
  const classes = useStyles();
  const menuItems = [
    {
      text: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      text: "Messages",
      icon: <ChatIcon />,
      path: "/home",
    },
    {
      text: "Friends",
      icon: <Person />,
      path: "/home",
    },
    {
      text: "Setting",
      icon: <Settings />,
      path: "/home",
    },
    {
      text: "Logout",
      icon: <Logout />,
      path: "/home",
    },
  ];
  return (
    <LeftBarContainer
      variant="permanent"
      open={themeStore.drawerState}
      classes={{ paper: classes.bg }}
    >
      <List sx={{ mt: 10 }}>
        <ListItem
          button
          onClick={() => modalStore.openModal(<CreateEditTrip />)}
          key="add Trip"
        >
          <ListItemIcon sx={{ color: "white" }}>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add Trip" />
        </ListItem>
        {menuItems.map((item) => (
          <ListItem button component={Link} key={item.text} to={item.path}>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </LeftBarContainer>
  );
});
