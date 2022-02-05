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

import Layout from "../../../layouts/index";
import { button, CustomTextField } from "../../../styles/formStyle";
import { navy } from "../../../styles/colorStyle";
import {
  gridItemMargin,
  innerContainer,
  itemContainer,
  label,
  outerContainer,
} from "../../../styles/createUpdateStyle";

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

const Edit = () => {
  const imageRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const hostedByRef = useRef<HTMLInputElement>();
  const locationRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const [category, setCategory] = useState<string>("Sport");
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Box sx={outerContainer}>
        <Box sx={innerContainer}>
          <Typography variant="h5" color={navy.color} mb={3}>
            Edit Event
          </Typography>

          <Box component="form" onSubmit={handleSubmit} pb={5}>
            {/* untuk image */}
            <Grid container>
              <Grid item xs={12} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
                    Image
                  </FormLabel>
                  <CustomTextField
                    id="image"
                    name="image"
                    defaultValue="https://profile-img-user-di-sini"
                    inputRef={imageRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* untuk title */}
            <Grid container>
              <Grid item xs={12} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
                    Title
                  </FormLabel>
                  <CustomTextField
                    id="title"
                    name="title"
                    defaultValue="Judul Event yang dicreate"
                    inputRef={titleRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* utk category dan hostedby */}
            <Grid container spacing={isMobile ? 0 : 4}>
              <Grid item xs={12} md={6} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
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
              <Grid item xs={12} md={6} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
                    Hosted By
                  </FormLabel>
                  <CustomTextField
                    id="hostedBy"
                    name="hostedBy"
                    defaultValue="Hosted Acara User"
                    inputRef={hostedByRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* untuk date/time dan location */}
            <Grid container spacing={isMobile ? 0 : 4}>
              <Grid item xs={12} md={6} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
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
              <Grid item xs={12} md={6} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
                    Location
                  </FormLabel>
                  <CustomTextField
                    id="location"
                    name="location"
                    defaultValue="Tempat Acara User"
                    inputRef={locationRef}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* untuk description */}
            <Grid container>
              <Grid item xs={12} sx={gridItemMargin}>
                <Box sx={itemContainer}>
                  <FormLabel sx={label} required={true}>
                    Description
                  </FormLabel>
                  <CustomTextField
                    id="description"
                    name="description"
                    defaultValue="Deskripsi User Sebelumnya"
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
              Edit
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Edit;
