import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Params } from "next/dist/server/router";
import React from "react";
import Layout from "../layouts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SendIcon from "@mui/icons-material/Send";
import { bgblue, bgnavy, navy } from "../styles/colorStyle";
import { GET_EVENT_BY_ID } from "../libs/queries";
import client from "../libs/apollo";
import { Event } from "../types/event";
import moment from "moment";
import HeadPage from "../components/head";

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

const EventDetail = ({ event }: Event) => {
  const participants = [1, 2, 3];

  return (
    <>
      <HeadPage />
      <Layout>
        <Container maxWidth="md">
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={5}
            sx={{ mt: 1, mb: 5 }}
          >
            <Grid item sm={9}>
              <Typography
                variant="h4"
                sx={{ mb: 2, textTransform: "capitalize" }}
              >
                {event.title}
              </Typography>
              <Stack direction="row">
                <AccessTimeIcon />
                <Typography variant="body1" sx={{ ml: 1, mr: 4 }}>
                  {moment(event.date).format("LT")}
                </Typography>
                <LocationOnIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {event.location}
                </Typography>
              </Stack>
            </Grid>
            <Grid item sm={3} textAlign="end">
              <Button variant="contained" sx={{ bgcolor: bgblue }}>
                Join Free
              </Button>
            </Grid>

            {/* Image */}
            <Grid item xs={12}>
              <Box
                sx={{
                  height: "70vmin",
                  bgcolor: "text.secondary",
                  borderRadius: 10,
                }}
              ></Box>
            </Grid>

            {/* Detail Event */}
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Detail Event
              </Typography>
              <Grid container spacing={3}>
                <Grid item lg={6}>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: bgnavy }}>
                        <AccessTimeIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <span style={{ fontWeight: "bold" }}>Time</span> <br />{" "}
                        {moment(event.date).format("LT")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: bgnavy }}>
                        <CalendarTodayIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <span style={{ fontWeight: "bold" }}>Date</span> <br />{" "}
                        {moment(event.date).format("dddd MMM Do YYYY")}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: bgnavy }}>
                        <LocationOnIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <span style={{ fontWeight: "bold" }}>Location</span>{" "}
                        <br /> {event.location}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item lg={6}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: bgnavy }}>
                      <DriveFileRenameOutlineIcon />
                    </Avatar>
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                      <span style={{ fontWeight: "bold" }}>Description</span>{" "}
                      <br /> {event.description}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Partisipant */}
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Participants
              </Typography>
              <Stack direction="row">
                <Stack direction="row" spacing={1} sx={{ overflow: "auto" }}>
                  {participants.map((index) => (
                    <Avatar
                      key={index}
                      sx={{
                        bgcolor: bgnavy,
                        width: 100,
                        height: 100,
                        fontSize: 36,
                      }}
                    >
                      A
                    </Avatar>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Comment */}
            <Grid item xs={12}>
              <Typography variant="h5">Comment</Typography>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <TextField
                  id="standard-basic"
                  label="Share your though!"
                  variant="standard"
                  sx={{ width: "95%" }}
                />
                <IconButton sx={{ color: navy }} aria-label="send">
                  <SendIcon />
                </IconButton>
              </Stack>
              {participants.map((index) => (
                <Grid container key={index} spacing={2} sx={{ my: 3 }}>
                  <Grid item lg={1}>
                    <Avatar
                      sx={{
                        bgcolor: bgnavy,
                        width: 50,
                        height: 50,
                      }}
                    >
                      A
                    </Avatar>
                  </Grid>
                  <Grid item lg={11}>
                    <Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6">Name</Typography>
                        <Typography variant="subtitle2">
                          Few hours ago
                        </Typography>
                      </Stack>
                      <Typography variant="body1">
                        Lorem, ipsum dolor sit amet consectetur
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default EventDetail;
