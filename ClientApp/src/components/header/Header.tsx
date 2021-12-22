import * as React from "react";
import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Dehaze } from "@mui/icons-material";
import MuiAppBar from "@mui/material/AppBar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50ch",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));
//Style
const useStyles = makeStyles({
  header: {
    background:
      "linear-gradient(-59deg, rgb(152, 175, 189), rgb(33, 183, 213)) !important",
  },
});

interface Props {
  handleThemeChange: () => void;
}
// dropdown menu
const dropdownMenu = [{ title: "Setting", path: "/setting" }];

export default observer(function Header({ handleThemeChange }: Props) {
  const theme = useTheme();
  const classes = useStyles();
  const {
    themeStore,
    userStore: { user, logout },
  } = useStore();

  const { setdrawerState } = themeStore;
  const handleDrawerOpen = () => {
    setdrawerState(true);
  };
  const handleDrawerClose = () => {
    setdrawerState(false);
  };
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ mr: 1 }}
            size="large"
            color="inherit"
            onClick={
              themeStore.drawerState ? handleDrawerClose : handleDrawerOpen
            }
          >
            <Dehaze />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "inherit",
              textDecoration: "none",
            }}
            to="/home"
          >
            Jatour
          </Typography>
        </Box>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="medium"
            sx={{ ml: 1 }}
            onClick={handleThemeChange}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="medium" onClick={handleOpenUserMenu}>
            <Avatar
              alt="Remy Sharp"
              src={user?.image || ""}
              // src="https://bahkali.github.io/img/profile.jpg"
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              component={NavLink}
              key={`/profile/${user?.username}`}
              to={`/profile/${user?.username}`}
            >
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            {dropdownMenu.map(({ title, path }) => (
              <MenuItem component={NavLink} key={path} to={path}>
                <Typography textAlign="center">{title}</Typography>
              </MenuItem>
            ))}
            <MenuItem key={`/logout`} onClick={logout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
