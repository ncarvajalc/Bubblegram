import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles/Bubble.css";
import { Storage } from "aws-amplify";
import { PostStorage } from "../storage/storage";

function FriendBubble({ post, owner }) {
  const [likes, setLikes] = useState(post.likes);
  const [imageUrl, setImageUrl] = useState(null);
  Storage.get(post.picture_url).then((url) => setImageUrl(url));

  function handleLike(postClicked) {
    PostStorage.likePost(postClicked);
    setLikes(likes + 1);
  }

  function handlePop() {
    console.log(`popped post #${post.id}`);
  }

  return (
    <div className="bubble">
      <div className="img-background">
      <p>{owner}</p>
        <img className="bubble-img" src={imageUrl} alt="" />
      </div>
      <div className="card-content">
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {likes} likes
        </Typography>
      </div>
      <div className="card-actions">
        <Button size="small" onClick={() => handleLike(post)}>
          Like
        </Button>
        <Button size="small" onClick={handlePop}>
          Pop
        </Button>
      </div>
    </div>
  );
}

export default FriendBubble;