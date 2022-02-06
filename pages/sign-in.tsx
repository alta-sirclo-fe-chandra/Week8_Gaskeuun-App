import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, InputBase, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import HeadPage from "../components/head";
import Logo from "../assets/logo.svg";
import signinGirl from "../assets/signin.png";
import {
  fontSize,
  mainContent,
  girlContent,
  greetings,
  subtitle,
  linkStyle,
} from "../styles/signStyle";
import { inputForm, labelForm, button } from "../styles/formStyle";
import { navy } from "../styles/colorStyle";

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={fontSize}>
      <HeadPage />
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sm={6} sx={mainContent}>
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
              <Typography variant="h4" fontWeight="bold" sx={navy}>
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

              <Typography textAlign="center" variant="subtitle2" sx={navy}>
                <Box>
                  Don't have an account?{" "}
                  <Link href="sign-up">
                    <span style={linkStyle}>Sign up for free</span>
                  </Link>
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item md={6} sx={girlContent}>
          <Image src={signinGirl} alt="signin-girl" />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
