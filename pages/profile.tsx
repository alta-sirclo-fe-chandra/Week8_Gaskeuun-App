import { useRouter } from "next/router";
import { useRef, FormEvent } from "react";
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
import { inputForm, labelForm, button } from "../styles/formStyle";
import {
  backToHome,
  leftContent,
  pageContainer,
  profilePicture,
  rightContent,
} from "../styles/profileStyle";

const Profile = () => {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const pictureRef = useRef<HTMLInputElement>();

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Box sx={pageContainer}>
        <Grid container maxWidth="lg">
          <Grid item xs={12} md={6} sx={leftContent}>
            <Avatar
              alt="User"
              src="https://source.unsplash.com/random"
              sx={profilePicture}
            ></Avatar>
          </Grid>

          <Grid item xs={12} md={6} sx={rightContent}>
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
                variant="subtitle2"
                onClick={handleBackHome}
                sx={backToHome}
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
