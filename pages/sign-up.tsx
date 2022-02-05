import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, FormEvent } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, InputBase, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Logo from "../assets/logo.svg";
import signupGirl from "../assets/signup.png";
import {
  fontSize,
  mainContent,
  girlContent,
  greetings,
  subtitle,
  linkStyle,
} from "../styles/signStyle";
import {
  inputForm,
  labelForm,
  button,
  CustomTextField,
} from "../styles/formStyle";
import { navy } from "../styles/colorStyle";
import HeadPage from "../components/head";
import {
  gridItemMargin,
  itemContainer,
  label,
} from "../styles/createUpdateStyle";

const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={fontSize}>
      <HeadPage />
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item md={6} sx={girlContent}>
          <Image src={signupGirl} alt="signup-girl" />
        </Grid>

        <Grid item xs={10} sm={6} sx={mainContent}>
          <Box sx={{ mt: 3, cursor: "pointer" }}>
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
                Hello there
              </Typography>
              <Typography variant="subtitle1" fontWeight={500} sx={subtitle}>
                Please enter your details!
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
                      Name
                    </FormLabel>
                    <CustomTextField
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      inputRef={nameRef}
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* <FormLabel sx={labelForm} required={true}>
                Name
              </FormLabel>
              <InputBase
                margin="dense"
                required
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                sx={inputForm}
                placeholder="John Doe"
                inputRef={nameRef}
              /> */}

              <Grid container>
                <Grid item xs={12} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
                      Email
                    </FormLabel>
                    <CustomTextField
                      id="email"
                      name="email"
                      placeholder="example@domain.com"
                      inputRef={emailRef}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
                      Password
                    </FormLabel>
                    <CustomTextField
                      id="password"
                      name="password"
                      inputRef={passwordRef}
                    />
                  </Box>
                </Grid>
              </Grid>

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

              <Typography textAlign="center" variant="subtitle2" sx={navy}>
                <Box>
                  Already have an account?{" "}
                  <Link href="sign-in">
                    <span style={linkStyle}>Sign in now</span>
                  </Link>
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
