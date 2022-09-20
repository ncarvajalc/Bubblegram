import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Auth } from "aws-amplify";

async function signUp(inputs) {
  try {
    const { user } = await Auth.signUp({
      username: inputs.email,
      password: inputs.password,
      attributes: {
        nickname: inputs.username,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}

export default function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  function handleChange(event) {
    console.log(`Input ${event.target.name} changed`, event.target.value);
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }
  return (
    <div>
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
        </Box>
      </Container>
    </div>
  );
}
