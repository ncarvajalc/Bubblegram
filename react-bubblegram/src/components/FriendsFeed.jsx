import React from 'react'

import { useState, useEffect } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listPosts, listUsers } from "../graphql/queries";
import "../styles/Feed.css";
import FriendBubble from "./FriendBubble";

export default function FriendsFeed() {
  const [posts, setPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

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
          (posts) => {
            return currentUser.friends?.includes(posts.owner.id)
          }
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error("error authenticating: ", error);
      }
    }
    getCurrentUser();
  }, []);

  const userFeed = posts.map((post) => {
    return <FriendBubble key={post.id} post={post} owner={post.owner.username}/>;
  });

  return <div className="user-feed">{userFeed}</div>;
}