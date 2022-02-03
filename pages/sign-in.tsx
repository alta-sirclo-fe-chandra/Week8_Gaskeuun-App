import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
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
import { useRouter } from "next/router";

const SignIn = () => {
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
              height="100"
              onClick={() => router.push("/")}
            />
          </Box>
          <Grid lg={6}>
            <Box sx={greetings}>
              <Typography variant="h4" fontWeight="bold" sx={fontNavy}>
                Welcome back
              </Typography>
              <Typography variant="subtitle1" sx={subtitle}>
                Please enter your details!
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} marginY="1%">
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
                placeholder="John Doe"
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
                placeholder="example@domain.com"
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
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => router.push("sign-up")}
              >
                Sign Up
              </Button>
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
