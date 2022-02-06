import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, Typography } from "@mui/material";
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
import { button, CustomTextField } from "../styles/formStyle";
import { navy } from "../styles/colorStyle";
import {
  gridItemMargin,
  itemContainer,
  label,
} from "../styles/createUpdateStyle";
import { useQuery } from "@apollo/client";
import { SIGN_IN } from "../libs/queries";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const router = useRouter();

  const { refetch } = useQuery(SIGN_IN, {
    variables: { email: "", password: "" },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data } = await refetch({
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });

    setIsLoading(false);
    localStorage.setItem("accessToken", data.login.token);

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.push("/");
    }
  };

  return (
    <ThemeProvider theme={fontSize}>
      <HeadPage />
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={6} sx={mainContent}>
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
                Welcome back
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
                      Email
                    </FormLabel>
                    <CustomTextField
                      required
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
                      required
                      type="password"
                      id="password"
                      name="password"
                      inputRef={passwordRef}
                    />
                  </Box>
                </Grid>
              </Grid>

              <LoadingButton
                loading={isLoading}
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
                  {"Don't have an account? "}
                  <Link href="sign-up">
                    <a style={linkStyle}>Sign up for free</a>
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
