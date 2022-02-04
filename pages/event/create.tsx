import { useRouter } from "next/router";
import { FormEvent } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  createTheme,
  FormLabel,
  Grid,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import Layout from "../../layouts/index";
import { button, inputForm, labelForm } from "../../styles/formStyle";

import { navy } from "../../styles/colorStyle";
import { backToHome } from "../../styles/profileStyle";

const theme = createTheme();

const Create = () => {
  const imageRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const hostedByRef = useRef<HTMLInputElement>();
  const dateTimeRef = useRef<HTMLInputElement>();
  const locationRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const handleBackHome = () => {
    router.push("/");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box width="80%" pt={2} paddingX={2}>
          <Typography variant="h4" color={navy.color} mb={3}>
            Create Event
          </Typography>

          <Box component="form" onSubmit={handleSubmit} pb={5}>
            <Grid container>
              <Grid item xs={12}>
                <FormLabel sx={labelForm} required={true}>
                  Image
                </FormLabel>
                <InputBase
                  required
                  fullWidth
                  id="image"
                  name="image"
                  sx={inputForm}
                  placeholder="https://source.unsplash.com/random"
                  inputRef={imageRef}
                />
              </Grid>
            </Grid>

            <Grid container spacing={isMobile ? 0 : 3}>
              <Grid item xs={12} md={6}>
                <FormLabel sx={labelForm} required={true}>
                  Title
                </FormLabel>
                <InputBase
                  required
                  fullWidth
                  id="title"
                  name="title"
                  sx={inputForm}
                  placeholder="Baking Brownies"
                  inputRef={titleRef}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel sx={labelForm} required={true}>
                  Hosted By
                </FormLabel>
                <InputBase
                  required
                  fullWidth
                  id="hostedBy"
                  name="hostedBy"
                  sx={inputForm}
                  placeholder="Brownies Lover"
                  inputRef={hostedByRef}
                />
              </Grid>
            </Grid>

            <Grid container spacing={isMobile ? 0 : 3}>
              <Grid item xs={12} md={6}>
                <FormLabel sx={labelForm} required={true}>
                  Date/Time
                </FormLabel>
                <InputBase
                  required
                  fullWidth
                  id="dateTime"
                  name="dateTime"
                  sx={inputForm}
                  inputRef={dateTimeRef}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel sx={labelForm} required={true}>
                  Location
                </FormLabel>
                <InputBase
                  required
                  fullWidth
                  id="location"
                  name="location"
                  sx={inputForm}
                  placeholder="Menara Bidakara, Jakarta"
                  inputRef={locationRef}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <FormLabel sx={labelForm} required={true}>
                  Description
                </FormLabel>
                <InputBase
                  required
                  fullWidth
                  id="description"
                  name="description"
                  sx={{ ...inputForm, height: "10rem" }}
                  placeholder="Tell people about your event"
                  inputRef={descriptionRef}
                  multiline={true}
                  rows={6}
                />
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
              Create
            </LoadingButton>

            <Typography
              variant="subtitle2"
              onClick={handleBackHome}
              sx={backToHome}
            >
              Back to Home
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Create;
