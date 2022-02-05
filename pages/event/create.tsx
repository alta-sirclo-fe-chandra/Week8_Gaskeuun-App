import { useRouter } from "next/router";
import { FormEvent, useState, ChangeEvent, useRef } from "react";
import { DateTimePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  createTheme,
  FormLabel,
  Grid,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Layout from "../../layouts/index";
import { button, labelForm, CustomTextField } from "../../styles/formStyle";
import { navy } from "../../styles/colorStyle";
import { backToHome } from "../../styles/profileStyle";

const theme = createTheme();

const categories = [
  "Sport",
  "Game",
  "Art",
  "Technology",
  "Music",
  "Education",
  "Others",
];

const Create = () => {
  const imageRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const hostedByRef = useRef<HTMLInputElement>();
  const locationRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const [category, setCategory] = useState<string>("Sport");
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  const router = useRouter();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const handleBackHome = () => {
    router.push("/");
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
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
            {/* untuk image */}
            <Grid container>
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Image
                  </FormLabel>
                  <CustomTextField
                    id="image"
                    name="image"
                    placeholder="https://source.unsplash.com/random"
                    inputRef={imageRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* untuk title */}
            <Grid container>
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Title
                  </FormLabel>
                  <CustomTextField
                    id="title"
                    name="title"
                    placeholder="Baking Brownies"
                    inputRef={titleRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* utk category dan hostedby */}
            <Grid container spacing={isMobile ? 0 : 4}>
              <Grid item xs={12} md={6} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Category
                  </FormLabel>
                  <CustomTextField
                    id="outlined-select-currency"
                    select
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category, idx) => (
                      <MenuItem key={idx} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Hosted By
                  </FormLabel>
                  <CustomTextField
                    id="hostedBy"
                    name="hostedBy"
                    placeholder="Brownies Lover"
                    inputRef={hostedByRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* untuk date/time dan location */}
            <Grid container spacing={isMobile ? 0 : 4}>
              <Grid item xs={12} md={6} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Date/Time
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <CustomTextField {...props} fullWidth />
                      )}
                      value={dateTime}
                      onChange={(newDateTime) => {
                        setDateTime(newDateTime);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Location
                  </FormLabel>
                  <CustomTextField
                    id="location"
                    name="location"
                    placeholder="Menara Bidakara, Jakarta"
                    inputRef={locationRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* untuk description */}
            <Grid container>
              <Grid item xs={12} mb={2}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel sx={{ ...labelForm, mb: 1 }} required={true}>
                    Description
                  </FormLabel>
                  <CustomTextField
                    id="description"
                    name="description"
                    placeholder="Tell people about your event"
                    multiline
                    rows={5}
                    inputRef={descriptionRef}
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
