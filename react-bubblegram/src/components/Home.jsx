import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import bubble from "../assets/bubble.png";
import bgimage from "../assets/bgimage.jpeg";
import happyCustomer1 from "../assets/hc1.jpg";
import happyCustomer2 from "../assets/hc2.jpg";
import happyCustomer3 from "../assets/hc3.jpg";
import FriendsFeed from "./FriendsFeed";
import { useNavigate } from "react-router-dom";
import { signUpURL } from "../App";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

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

  if (authenticated) {
    return <FriendsFeed username={username} />;
  } else {
    return (
      <Container
        sx={{
          p: 2,
          maxWidth: "lg",
        }}
      >
        <Grid container spacing={2} my={8}>
          <Grid item xs={12} sm={5} md={4}>
            <Box sx={{ p: 2, position: "relative" }}>
              <img
                src={bgimage}
                alt="bgimage"
                width="100%"
                style={{
                  borderRadius: "50%",
                  position: "relative",
                  top: "0",
                  left: "0",
                }}
              />
              <img
                src={bubble}
                alt="bubble"
                width="100%"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Box sx={{ p: 4 }}>
              <Typography gutterBottom component="h1" variant="h2">
                Welcome to Bubblegram!
              </Typography>
              <Typography variant="body1" gutterBottom>
                The new social media app that lets you connect like never
                before. With it you can share “bubbles”, rounded pictures of
                your daily life that help you share your most wonderful moments.
              </Typography>
              <Button variant="contained" onClick={() => navigate(signUpURL)}>
                Create an account
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 4, p: 8, textAlign: "center" }}>
          <Grid item xs={12} textAlign="left">
            <Typography variant="h3" component="h1" gutterBottom>
              Features
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 7, height: "420px" }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Upload easily
              </Typography>
              <Typography variant="body1">
                Upload your bubbles with our simple upload tool. Just crop the
                image and share your moments
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 7, height: "420px" }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Like! Like Like!
              </Typography>
              <Typography variant="body1">
                Keep liking everyone's bubbles and get likes in return. We don't
                have a limit on how many likes you can give!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper elevation={3} sx={{ p: 7, height: "420px" }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Pop that comment
              </Typography>
              <Typography variant="body1">
                Leave a comment on your friends bubbles and know how everyone is
                reacting to your bubbles
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 4, p: 8, textAlign: "center" }}>
          <Grid item xs={12} textAlign="left">
            <Typography variant="h3" component="h1" gutterBottom>
              Everyone loves Bubblegram
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div>
              <img
                src={happyCustomer1}
                width="100%"
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </div>
            <Typography variant="body1">
              "I have loved Bubblegram since I first started using it. It's so
              easy to use and I love the bubbles!"
            </Typography>
            <Typography variant="body1">
              <b>Hannah Parker</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div>
              <img
                src={happyCustomer2}
                width="100%"
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </div>
            <Typography variant="body1">
              "I can share my moments with my friends and family and they can
              share theirs with me. I have a lot of fun with Bubblegram!"
            </Typography>
            <Typography variant="body1">
              <b>Noah Ellison</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div>
              <img
                src={happyCustomer3}
                width="100%"
                alt=""
                style={{ borderRadius: "50%" }}
              />
            </div>
            <Typography variant="body1">
              "I love the way I can share my pictures. Just open the app and
              upload your bubble, you will be able to share it with your friends
              in no time!"
            </Typography>
            <b>James Rayner</b>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            my: 4,
            p: 8,
            textAlign: "center",
            backgroundColor: "#f6b4d9",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h3" component="h1" gutterBottom>
              Wanna know more?
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Enjoy the Bubblegram experience!
            </Typography>
            <Button variant="contained" onClick={() => navigate(signUpURL)}>
              Bubblegram!
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
