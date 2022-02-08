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
import { button, CustomTextField } from "../../styles/formStyle";
import { navy } from "../../styles/colorStyle";
import {
  gridItemMargin,
  innerContainer,
  itemContainer,
  label,
  outerContainer,
} from "../../styles/createUpdateStyle";
import { CREATE_EVENT } from "../../libs/mutations";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import HeadPage from "../../components/head";

const theme = createTheme();

const modifyValidDateTime = (str: string) => {
  return str.length === 1 ? `0${str}` : str;
};

const getStringDateTime = (dateTime: Date) => {
  const year = String(dateTime.getFullYear());
  const month = modifyValidDateTime(String(dateTime.getMonth() + 1));
  const date = modifyValidDateTime(String(dateTime.getDate()));
  const hours = modifyValidDateTime(String(dateTime.getHours()));
  const minutes = modifyValidDateTime(String(dateTime.getMinutes()));
  const seconds = modifyValidDateTime(String(dateTime.getSeconds()));

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const categories = [
  "Select your category",
  "Sport",
  "Game",
  "Art",
  "Technology",
  "Music",
  "Education",
  "Others",
];

const Create = () => {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const hostedByRef = useRef<HTMLInputElement>();
  const locationRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const [category, setCategory] = useState<string>("Select your category");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createEvent] = useMutation(CREATE_EVENT);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    let selectedCategoryId = 1;

    setCategory(selectedCategory);

    switch (selectedCategory) {
      case "Sport":
        selectedCategoryId = 1;
        break;
      case "Game":
        selectedCategoryId = 2;
        break;
      case "Art":
        selectedCategoryId = 3;
        break;
      case "Technology":
        selectedCategoryId = 4;
        break;
      case "Music":
        selectedCategoryId = 5;
        break;
      case "Education":
        selectedCategoryId = 6;
        break;
      case "Others":
        selectedCategoryId = 7;
        break;
      default:
        selectedCategoryId = 7;
    }

    setCategoryId(selectedCategoryId);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = localStorage.getItem("userId");
    const title = titleRef.current?.value;
    const category = categoryId;
    const host = hostedByRef.current?.value;
    const date = getStringDateTime(dateTime);
    const location = locationRef.current?.value;
    const description = descriptionRef.current?.value;
    const imageUrl = imageRef.current?.value;

    await createEvent({
      variables: {
        userId,
        categoryId: category,
        title,
        host,
        date,
        location,
        description,
        imageUrl,
      },
    }).then(() => {
      Swal.fire("Success!", "Your Event has been created.", "success").then(
        (res) => {
          if (res.isConfirmed) {
            router.replace("/event");
          }
        }
      );
    });

    setIsLoading(false);
  };

  return (
    <>
      <HeadPage />
      <Layout>
        <Box sx={outerContainer}>
          <Box sx={innerContainer}>
            <Typography variant="h5" color={navy.color} mb={3}>
              Create Event
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
                      required
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
                <Grid item xs={12} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
                      Title
                    </FormLabel>
                    <CustomTextField
                      required
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
                <Grid item xs={12} md={6} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
                      Category
                    </FormLabel>
                    <CustomTextField
                      required
                      id="category"
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
                      required
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
                          setDateTime(newDateTime!);
                        }}
                        inputFormat="yyyy-MM-dd HH:mm:ss"
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
                      required
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
                <Grid item xs={12} sx={gridItemMargin}>
                  <Box sx={itemContainer}>
                    <FormLabel sx={label} required={true}>
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
                loading={isLoading}
                loadingIndicator="Loading..."
                variant="contained"
                type="submit"
                size="large"
                sx={button}
                fullWidth
              >
                Create
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Create;
