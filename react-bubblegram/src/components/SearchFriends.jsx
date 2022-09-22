import { Box, Container } from "@mui/system";
import { API, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { listUsers } from "../graphql/queries";
import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function SearchFriends() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let status = await Auth.currentAuthenticatedUser();
        const allUsers = await API.graphql({ query: listUsers });
        const currentUser = allUsers.data.listUsers.items.find(
          (user) => user.username === status.attributes.nickname
        );
        setUser(currentUser);
      } catch (error) {
        console.error("error authenticating: ", error);
      }
    }
    getCurrentUser();
  }, []);

  async function searchUsers() {
    try {
      const allUsers = await API.graphql({ query: listUsers });
      const results = allUsers.data.listUsers.items.filter(
        (filtered_user) =>
          filtered_user.username.includes(search) &&
          user.id !== filtered_user.id &&
          !user.friends.items?.find((friend) => friend.id === filtered_user.id)
      );
      console.log(results);
      setSearchResults(results);
    } catch (error) {
      console.error("error searching users", error);
    }
  }

  async function followFriend(id) {
    try {
      //   const GQLUser = { id: user.id };
      //   const GQLSearched = { id: id };
      // TODO follow friend (Add to friends array)
    } catch (error) {
      console.error("error following user", error);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{
              "aria-label": "search",
              type: "text",
              placeholder: "Search...",
              value: search,
              autoComplete: "off",
              onChange: (e) => {
                setSearch(e.target.value);
              },
            }}
          />
        </Search>
        <Button variant="outlined" onClick={searchUsers}>
          Search
        </Button>
      </Box>
      <div className="search-results">
        <Grid item xs={12} md={6}>
          <Demo>
            <List>
              {searchResults.map((searchedUser) => (
                <Box key={searchedUser.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={() => followFriend(searchedUser.id)}
                        edge="end"
                        aria-label="add"
                      >
                        <AddIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={searchedUser.username} />
                  </ListItem>
                </Box>
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    </Container>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
  marginLeft: 0,

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
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

    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
