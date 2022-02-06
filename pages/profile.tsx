import { useRouter } from "next/router";
import { useRef, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, FormLabel, Grid, InputBase } from "@mui/material";

import HeadPage from "../components/head";
import Layout from "../layouts/index";
import {
  inputForm,
  labelForm,
  button,
  CustomTextField,
} from "../styles/formStyle";
import {
  leftContent,
  pageContainer,
  profilePicture,
  rightContent,
} from "../styles/profileStyle";
import {
  gridItemMargin,
  itemContainer,
  label,
} from "../styles/createUpdateStyle";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../libs/queries";
import { User } from "../types/User";

const Profile = () => {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const profilePictureRef = useRef<HTMLInputElement>();

  const router = useRouter();

  let userId = 0;

  if (typeof window !== "undefined") {
    userId = Number(localStorage.getItem("userId"));
  }

  const { data } = useQuery(GET_USER, {
    variables: { userId },
  });

  if (data) {
    console.log("ini data =>", data);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <HeadPage />
      {data && (
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
                          defaultValue={data.getUser.name}
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
                          defaultValue={data.getUser.email}
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

                  <Grid container>
                    <Grid item xs={12} sx={gridItemMargin}>
                      <Box sx={itemContainer}>
                        <FormLabel sx={label} required={true}>
                          Profile Picture
                        </FormLabel>
                        <CustomTextField
                          required
                          id="profile-picture"
                          name="profile-picture"
                          defaultValue={
                            data.getUser.imageUrl
                              ? data.getUser.imageUrl
                              : "set yout url"
                          }
                          inputRef={profilePictureRef}
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
                    Edit Profile
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default Profile;
