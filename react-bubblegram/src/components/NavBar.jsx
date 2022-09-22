import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import UploadImage from "./UploadImage";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/Modal.css";
import { feedURL, searchFriendsURL, signInURL } from "../App";

const NavBar = () => {
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await Auth.signOut();
      setAuthenticated(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("error signing out: ", error);
    }
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    async function isAuthenticated() {
      try {
        let status = await Auth.currentAuthenticatedUser();
        setUsername(status.attributes.nickname);
        return true;
      } catch {
        return false;
      }
    }
    isAuthenticated().then((res) => {
      setAuthenticated(res);
    });
  }, []);

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            }}
          >
            Bubblegram
          </Typography>
          {authenticated ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(feedURL);
                  }}
                >
                  <Typography textAlign="center">My Bubbles</Typography>
                </MenuItem>
                {/* MODAL------------------------------------------------------------------ */}
                <div className={modal ? "modal-active" : "modal"} id="modal">
                  <div className="modal-header">
                    <div className="title">Rename Playlist</div>
                    <button
                      onClick={() => setModal(false)}
                      className="close-button"
                    >
                      x
                    </button>
                  </div>
                  <div className="modal-body">
                    <input onChange={console.log("hey")} value={"hey"}></input>
                    <button onClick={console.log("click")}>Save</button>
                  </div>
                </div>
                <div id={modal ? "overlay-active" : "overlay"}> </div>
                {/* MODAL ------------------------------------------------------------------ */}
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    setModal(true);
                  }}
                >
                  <Typography textAlign="center">Upload image</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : null}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            }}
          >
            Bubblegram
          </Typography>
          {authenticated ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(feedURL);
                  }}
                  sx={{ my: 2, color: "inherit", display: "block", mx: 1 }}
                >
                  My Bubbles
                </Button>
                {/* MODAL------------------------------------------------------------------ */}
                <div className={modal ? "modal-active" : "modal"} id="modal">
                  <UploadImage setModal={setModal} />
                </div>
                <div
                  id={modal ? "overlay-active" : "overlay"}
                  onClick={() => setModal(false)}
                >
                  {" "}
                </div>
                {/* MODAL ------------------------------------------------------------------ */}
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    setModal(true);
                  }}
                  sx={{ my: 2, color: "inherit", display: "block", mx: 1 }}
                >
                  Upload image
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={() => navigate(searchFriendsURL)}
                  size="large"
                  aria-label="search"
                  color="inherit"
                >
                  <SearchIcon />
                </IconButton>
                <Tooltip title="Open profile">
                  <IconButton
                    color="inherit"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <AccountCircle />
                    <Typography>{username}</Typography>
                  </IconButton>
                </Tooltip>
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
                    onClick={() => {
                      handleCloseNavMenu();
                      handleSignOut();
                    }}
                  >
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button variant="filled" onClick={() => navigate(signInURL)}>
                  Sign in
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
