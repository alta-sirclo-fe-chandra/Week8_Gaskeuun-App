import type { NextPage } from "next";
import { useRef } from "react";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, InputBase, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import signinGirl from "../../public/signin.png";
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

const SignIn: NextPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const HandleSubmit = () => {
    console.log("submit");
  };

  return (
    <ThemeProvider theme={fontSize}>
      <Grid container>
        <Grid item xs={12} md={6} sx={leftContent}>
          <Box sx={greetings}>
            <Typography variant="h2" fontWeight="bold" sx={fontNavy}>
              Welcome back
            </Typography>
            <Typography variant="h6" fontWeight={500} sx={fontNavy}>
              Welcome back! Please enter your details.
            </Typography>
          </Box>

          <Box
            width="90%"
            component="form"
            onSubmit={HandleSubmit}
            marginY="1%"
          >
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
              autoFocus
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
              autoFocus
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
              Sign In
            </LoadingButton>
          </Box>
        </Grid>

        <Grid item md={6} sx={rightContent}>
          <Image src={signinGirl} alt="signin-girl" />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
