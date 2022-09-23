import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles/Bubble.css";
import { API, Auth, Storage } from "aws-amplify";
import { PostStorage } from "../storage/storage";
import {
  Box,
  Divider,
  List,
  ListItem,
  Modal,
  Paper,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { createComment } from "../graphql/mutations";
import { listComments, listUsers } from "../graphql/queries";

function Bubble({ post }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSeeAllComments(false);
  };
  const [likes, setLikes] = useState(post.likes);
  const [imageUrl, setImageUrl] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [seeAllComments, setSeeAllComments] = useState(false);
  const [user, setUser] = useState(null);

  Storage.get(post.picture_url).then((url) => setImageUrl(url));

  function handleAllComments() {
    async function getCurrentComments() {
      try {
        const allComments = await API.graphql({ query: listComments });
        const filteredComments =
          await allComments.data.listComments.items.filter(
            (comment) => comment.post.id === post.id
          );
        console.log("currentUser", filteredComments);
        setComments(filteredComments);
      } catch (error) {
        console.error("error authenticating: ", error);
      }
    }
    getCurrentComments();
    setSeeAllComments(true);
  }

  function handleLike(postClicked) {
    PostStorage.likePost(postClicked);
    setLikes(likes + 1);
  }

  function handleCommentChange(e) {
    setNewComment(e.target.value);
  }

  async function handlePostComment(e) {
    e.preventDefault();
    const newCommentObject = await API.graphql({
      query: createComment,
      variables: {
        input: {
          content: newComment,
          postCommentsId: post.id,
          userCommentsId: user.id,
        },
      },
    });
    console.log(newCommentObject);
    console.log(comments);

    setNewComment("");
  }

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

  return (
    <div className="bubble">
      <div className="img-background">
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
        <Button size="small" onClick={handleOpen}>
          Pop
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-comments"
          aria-describedby="comments"
        >
          <Box sx={style}>
            {!seeAllComments ? (
              <>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Pop that comment
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Comment"
                  multiline
                  rows={2}
                  name="comment"
                  value={newComment}
                  onChange={handleCommentChange}
                />

                <Button
                  sx={{ mt: 4 }}
                  variant="contained"
                  onClick={handlePostComment}
                >
                  Post
                </Button>
                <Button
                  sx={{ mx: 4, mt: 4 }}
                  variant="outlined"
                  onClick={handleAllComments}
                >
                  See all comments
                </Button>
              </>
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Comments
                </Typography>
                <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                  <List>
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <Box key={comment.id}>
                          <ListItem>
                            {comment.content}
                            <br />
                          </ListItem>
                          <Divider component="li" />
                        </Box>
                      ))
                    ) : (
                      <ListItem>
                        No comments yet. Pop that first comment
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Bubble;
