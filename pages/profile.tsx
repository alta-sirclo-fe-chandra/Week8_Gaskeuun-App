import { useRouter } from "next/router";
import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  FormLabel,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";

import Layout from "../layouts/index";
import { inputForm, labelForm, button } from "../styles/signStyle";

const Profile = () => {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const pictureRef = useRef<HTMLInputElement>();

  const router = useRouter();

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container maxWidth="lg">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
              pb: 0,
              height: "100%",
            }}
          >
            <Avatar
              alt="User"
              src="https://source.unsplash.com/random"
              sx={{ width: "15rem", height: "15rem" }}
            ></Avatar>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "80vh",
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
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
                sx={inputForm}
                defaultValue="John Doe"
                inputRef={nameRef}
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
                sx={inputForm}
                defaultValue="example@domain.com"
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

              <FormLabel sx={labelForm} required={true}>
                Profile Picture
              </FormLabel>
              <InputBase
                margin="dense"
                required
                fullWidth
                id="picture"
                name="picture"
                type="picture"
                autoComplete="picture"
                sx={inputForm}
                defaultValue="https://source.unsplash.com/random"
                inputRef={pictureRef}
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
                Edit Profile
              </LoadingButton>
              <Typography
                textAlign="end"
                variant="subtitle2"
                color="#0C0D36"
                onClick={handleBackHome}
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Back to Home
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Profile;
