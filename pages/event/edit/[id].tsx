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
import { Params } from "next/dist/server/router";
import client from "../../../libs/apollo";
import { GET_EVENT_BY_ID } from "../../../libs/queries";
import { Event } from "../../../types/event";
import HeadPage from "../../../components/head";
import { EDIT_EVENT } from "../../../libs/mutations";
import { useMutation } from "@apollo/client";
import moment from "moment";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

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

export const getServerSideProps = async ({ params }: Params) => {
  const { data } = await client.query({
    query: GET_EVENT_BY_ID,
    variables: { id: params.id },
  });

  return {
    props: {
      event: data.getEvent,
    },
  };
};

const Edit = ({ event }: Event) => {
  const router = useRouter();
  const [editEvent] = useMutation(EDIT_EVENT);
  const [isLoading, setIsLoading] = useState(false);
  const [id] = useState(event.id);
  const imageRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const hostedByRef = useRef<HTMLInputElement>();
  const locationRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const [dateTime, setDateTime] = useState<Date | null>(event.date);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });
  const [category, setCategory] = useState<number>(event.categoryId);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    await editEvent({
      variables: {
        eventId: id,
        categoryId: category,
        title: titleRef.current?.value!,
        host: hostedByRef.current?.value!,
        date: moment(dateTime).format("YYYY-MM-DD hh:mm:ss"),
        location: locationRef.current?.value!,
        description: descriptionRef.current?.value!,
        imageUrl: imageRef.current?.value!,
      },
    })
      .then(
        async () =>
          await Swal.fire(
            "Good job!",
            "Your event has been updated",
            "success"
          ).then(async (res) => {
            if (res.isConfirmed) {
              await router.push("/event");
            }
          })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <HeadPage />
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
                      defaultValue={event.image}
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
                      defaultValue={event.title}
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
                        <MenuItem key={idx} value={idx + 1}>
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
                      defaultValue={event.host}
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
                      defaultValue={event.location}
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
                      defaultValue={event.description}
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
                Edit
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Edit;
