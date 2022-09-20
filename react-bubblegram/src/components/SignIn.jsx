import * as React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Auth } from "aws-amplify";

function SignIn() {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      console.log("signed in view...");
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Bubblegram
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign In
        </Typography>
        <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { my: 1 },
            }}
            autoComplete="off"
          >
            <Box>
              <TextField
                required
                name="username"
                label="username"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <TextField
                required
                name="password"
                label="password"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => signIn(inputs)}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <p>New here? <Link to="/">Sign Up</Link></p>
      </Box>
    </Container>
  )
}

export default SignIn