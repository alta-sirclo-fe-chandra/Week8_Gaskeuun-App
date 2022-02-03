import type { NextPage } from "next";
import { useRef } from "react";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, InputBase, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import signupGirl from "../../public/signup.png";
import {
  fontSize,
  inputForm,
  leftContent,
  labelForm,
  button,
  rightContent,
  greetings,
  fontNavy,
} from "./signStyle";

const SignUp: NextPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const HandleSubmit = () => {
    console.log("submit");
  };

  return (
    <ThemeProvider theme={fontSize}>
      <Grid container>
        <Grid item md={6} sx={rightContent}>
          <Image src={signupGirl} alt="signin-girl" />
        </Grid>

        <Grid item xs={12} md={6} sx={leftContent}>
          <Box sx={greetings}>
            <Typography variant="h2" fontWeight="bold" sx={fontNavy}>
              Hello there
            </Typography>
            <Typography variant="h6" fontWeight={500} sx={fontNavy}>
              Hello there! Please enter your details.
            </Typography>
          </Box>

          <Box
            width="90%"
            component="form"
            onSubmit={HandleSubmit}
            marginY="1%"
          >
            <FormLabel sx={labelForm} required={true}>
              Name
            </FormLabel>
            <InputBase
              margin="dense"
              required
              fullWidth
              id="name"
              name="name"
              autoComplete="name"
              inputRef={nameRef}
              sx={inputForm}
            />

            <FormLabel sx={labelForm} required={true}>
              Email
            </FormLabel>
            <InputBase
              margin="dense"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              sx={inputForm}
            />

            <FormLabel sx={labelForm} required={true}>
              Password
            </FormLabel>
            <InputBase
              margin="dense"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              inputRef={passwordRef}
              sx={inputForm}
            />

            <LoadingButton
              // loading={isLoading}
              loadingIndicator="Loading..."
              variant="contained"
              type="submit"
              size="large"
              sx={button}
              fullWidth
            >
              Sign Up
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
