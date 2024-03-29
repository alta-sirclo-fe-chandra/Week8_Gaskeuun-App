import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, FormLabel, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";

import { fontSize, mainContent, linkStyle } from "../styles/signStyle";
import { button, CustomTextField } from "../styles/formStyle";
import { navy } from "../styles/colorStyle";
import HeadPage from "../components/head";
import {
  gridItemMargin,
  itemContainer,
  label,
} from "../styles/createUpdateStyle";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../libs/mutations";
import Logo from "../components/sign/Logo";
import Greetings from "../components/sign/Greetings";
import GirlContent from "../components/sign/GirlContent";

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [isLoading, setIsLoading] = useState(false);

  const [signUp] = useMutation(SIGN_UP);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const { data } = await signUp({ variables: { name, email, password } });

      const userId = data.createUser.user.id;
      const accessToken = data.createUser.token;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);

      if (accessToken) {
        router.push("/");
      }
    } catch (error) {
      let errorMessage = "Failed to login";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      await Swal.fire("I'm sorry", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={fontSize}>
      <HeadPage />
      <Grid container sx={{ justifyContent: "center" }}>
        <GirlContent />

        <Grid item xs={12} md={6} sx={mainContent}>
          <Logo />

          <Grid item md={12} lg={12} sx={{ width: "60%" }}>
            <Greetings
              title={"Hello there"}
              desc={"Please enter your details!"}
            />

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
                      Name
                    </FormLabel>
                    <CustomTextField
                      required
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      inputRef={nameRef}
                    />
                  </Box>
                </Grid>
              </Grid>

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
                Sign Up
              </LoadingButton>

              <Typography textAlign="center" variant="subtitle2" sx={navy}>
                <Box>
                  {"Already have an account? "}
                  <Link href="/sign-in">
                    <a style={linkStyle}>Sign in now</a>
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
