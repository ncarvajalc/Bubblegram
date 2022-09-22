import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles/Bubble.css";
import { Storage } from "aws-amplify";
import { PostStorage } from '../storage/storage';

function Bubble({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    Storage.get(post.picture_url).then((url) => setImageUrl(url));
  }, [post]);

  function handleLike() {
    PostStorage.likePost(post);
  }

  function handlePop() {
    console.log(`popped post #${post.id}`);
  }

  return (
    <div className="bubble">
      <div className="img-background">
        <img className="bubble-img" src={imageUrl} alt={post.title} />
      </div>
      <div className="card-content">
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.likes} likes
        </Typography>
      </div>
      <div className="card-actions">
        <Button size="small" onClick={handleLike}>
          Like
        </Button>
        <Button size="small" onClick={handlePop}>
          Pop
        </Button>
      </div>
    </div>
  );
}

export default Bubble;
