import { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { listPosts, listUsers } from "../graphql/queries";

import "../styles/Feed.css";
import Bubble from "./Bubble";
import { Typography } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let status = await Auth.currentAuthenticatedUser();
        const allUsers = await API.graphql({ query: listUsers });
        const currentUser = allUsers.data.listUsers.items.find(
          (user) => user.username === status.attributes.nickname
        );
        const allPosts = await API.graphql({ query: listPosts });
        const filteredPosts = allPosts.data.listPosts.items.filter(
          (posts) => posts.owner.id === currentUser.id
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error("error authenticating: ", error);
      }
    }
    getCurrentUser();
  }, []);

  const userFeed = posts.map((post) => {
    return <Bubble key={post.id} post={post} />;
  });

  return (
    <>
      <Typography sx={{ m: 4 }} variant="h2">
        My bubbles
      </Typography>
      <div className="user-feed">{userFeed}</div>
    </>
  );
}
