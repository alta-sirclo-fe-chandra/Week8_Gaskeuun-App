import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, InputBase, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Logo from "../assets/logo.svg";
import signinGirl from "../assets/signin.png";
import {
  fontSize,
  inputForm,
  leftContent,
  labelForm,
  button,
  rightContent,
  greetings,
  fontNavy,
  subtitle,
} from "../styles/signStyle";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <ThemeProvider theme={fontSize}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sm={6} sx={leftContent}>
          <Box sx={{ mt: 5, cursor: "pointer" }}>
            <Image
              alt="logo"
              src={Logo}
              height="80"
              onClick={() => router.push("/")}
            />
          </Box>
          <Grid item md={10} lg={6}>
            <Box sx={greetings}>
              <Typography variant="h4" fontWeight="bold" sx={fontNavy}>
                Welcome back
              </Typography>
              <Typography variant="subtitle1" fontWeight={500} sx={subtitle}>
                Please enter your details!
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
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
                sx={inputForm}
                autoFocus
                placeholder="example@domain.com"
                inputRef={emailRef}
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
                sx={inputForm}
                autoFocus
                inputRef={passwordRef}
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
              <Link href="sign-up">
                <Typography
                  textAlign="center"
                  variant="subtitle2"
                  color="#2A6AC8"
                  sx={{ cursor: "pointer" }}
                >
                  Don't have an account? Sign up for free
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Grid item md={6} sx={rightContent}>
          <Image src={signinGirl} alt="signin-girl" />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
