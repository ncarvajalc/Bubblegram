import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Auth } from "aws-amplify";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [confirmationMode, setConfirmationMode] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  // const [error, setError] = useState("");

  async function signUp(inputs) {
    try {
      const user_email = inputs.email;
      const user_password = inputs.password;
      const user_username = inputs.username;

      await Auth.signUp({
        username: user_email,
        password: user_password,
        attributes: {
          nickname: user_username,
        },
      });
      console.log("Sign up successful");
      setConfirmationMode(true);
    } catch (error) {
      console.log("error signing up:", error);
      // TODO show error.message in red
    }
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

  async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
      signIn(username, inputs.password);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  async function resendConfirmationCode(username) {
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  function handleChange(event) {
    console.log(`Input ${event.target.name} changed`, event.target.value);
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }

  function handleCodeChange(event) {
    setConfirmationCode(event.target.value);
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
          Sign up
        </Typography>
        {!confirmationMode ? (
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
                name="email"
                label="email"
                onChange={handleChange}
              />
            </Box>
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
                onClick={() => signUp(inputs)}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box>
              <TextField
                required
                name="code"
                label="Confirmation code"
                onChange={handleCodeChange}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => confirmSignUp(inputs.email, confirmationCode)}
              >
                Confirm account
              </Button>
            </Box>
          </Box>
        )}
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </Box>
      
    </Container>
  );
}
