import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import HeadPage from "../components/head";
import { fontSize, mainContent, linkStyle } from "../styles/signStyle";
import { button, CustomTextField } from "../styles/formStyle";
import { navy } from "../styles/colorStyle";
import {
  gridItemMargin,
  itemContainer,
  label,
} from "../styles/createUpdateStyle";
import { useQuery } from "@apollo/client";
import { SIGN_IN } from "../libs/queries";
import Greetings from "../components/sign/Greetings";
import Logo from "../components/sign/Logo";
import GirlContent from "../components/sign/GirlContent";

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

    const userId = data.login.user.id;
    const accessToken = data.login.token;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);

    if (accessToken) {
      router.push("/");
    }
  };

  return (
    <ThemeProvider theme={fontSize}>
      <HeadPage />
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={6} sx={mainContent}>
          <Logo />

          <Grid item md={12} lg={12} sx={{ width: "60%" }}>
            <Greetings
              title={"Welcome back"}
              desc={"Please enter your details!"}
            />

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
                  <Link href="/sign-up">
                    <a style={linkStyle}>Sign up for free</a>
                  </Link>
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <GirlContent />
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
