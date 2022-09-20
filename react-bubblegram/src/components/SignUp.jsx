import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { feedURL, signInURL } from "../App";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const [confirmationMode, setConfirmationMode] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const navigate = useNavigate();

  async function signUp(inputs) {
    try {
      const user_email = inputs.email;
      const user_password = inputs.password;
      const user_username = inputs.username;

      const GQLUser = { email: user_email, username: user_username };

      await Auth.signUp({
        username: user_email,
        password: user_password,
        attributes: {
          nickname: user_username,
        },
      });
      await API.graphql(graphqlOperation(createUser, { input: GQLUser }));
      setConfirmationMode(true);
    } catch (error) {
      console.error("error signing up:", error);
      setError(error.message);
    }
  }

  async function signIn(username, password) {
    try {
      await Auth.signIn(username, password);
      navigate(feedURL);
      window.location.reload();
    } catch (error) {
      console.error("error signing in", error);
      setError(error.message);
    }
  }

  async function confirmSignUp(username, code) {
    try {
      await Auth.confirmSignUp(username, code);
      signIn(username, inputs.password);
    } catch (error) {
      console.erro("error confirming sign up", error);
      setError(error.message);
    }
  }

  async function resendConfirmationCode(username) {
    try {
      await Auth.resendSignUp(username);
    } catch (err) {
      console.error("error resending code: ", err);
    }
  }

  function handleChange(event) {
    if (error) setError(null);
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }

  function handleCodeChange(event) {
    if (error) setError(null);
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
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        {!confirmationMode ? (
          <Box
            id="sign-up-form"
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
                autoComplete="off"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <TextField
                required
                name="username"
                label="username"
                autoComplete="off"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <TextField
                required
                name="password"
                label="password"
                onChange={handleChange}
                autoComplete="off"
                type={seePassword ? "text" : "password"}
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setSeePassword(!seePassword)} />
                }
                label="See password"
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
          <Box
            id="confirmation"
            sx={{
              "& .MuiTextField-root": { my: 1 },
            }}
            autoComplete="off"
          >
            <Box>
              <TextField
                id="confirmation-code"
                required
                name="code"
                autoComplete="off"
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
            <Box sx={{ my: 1 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => resendConfirmationCode(inputs.email)}
              >
                Resend code
              </Button>
            </Box>
          </Box>
        )}
        <p>
          Already have an account? <Link to={signInURL}>Sign In</Link>
        </p>
      </Box>
    </Container>
  );
}
