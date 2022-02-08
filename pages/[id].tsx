import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../layouts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SendIcon from "@mui/icons-material/Send";
import { bgblue, bgnavy, navy } from "../styles/colorStyle";
import { GET_EVENT_BY_ID } from "../libs/queries";
import { comment, participants } from "../types/event";
import moment from "moment";
import HeadPage from "../components/head";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT, CREATE_PARTICIPANT } from "../libs/mutations";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Image from "next/image";

const checkIfEventPassed = (date: string) => {
  const eventDateTime = new Date(date).getTime();
  const todayDateTime = new Date().getTime();
  const passedEvent = eventDateTime < todayDateTime;

  return passedEvent;
};

const EventDetail = () => {
  const [comment, setComment] = useState("");
  const [createParticipant] = useMutation(CREATE_PARTICIPANT);
  const [createComment] = useMutation(CREATE_COMMENT);

  const router = useRouter();
  const { id } = router.query;

  const { data, refetch } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
  });

  const handleJoin = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("sign-in");
      return;
    }

    await createParticipant({
      variables: {
        eventId: id,
      },
    })
      .then(() => {
        Swal.fire("Good job!", "Success to join this event", "success");
        refetch();
      })
      .catch((err) => Swal.fire("I'm sorry", `${err}`, "error"));
  };

  const handleComment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("sign-in");
      return;
    }

    await createComment({
      variables: {
        eventId: id,
        comment: comment,
      },
    }).then(() => {
      refetch();
      setComment("");
    });
  };

  const joinButton = (
    <Button variant="contained" sx={{ bgcolor: bgblue }} onClick={handleJoin}>
      Join Free
    </Button>
  );

  const disableJoinButton = (
    <Button variant="contained" sx={{ bgcolor: bgblue }} disabled>
      Join Free
    </Button>
  );

  return (
    <>
      <HeadPage />
      {data && (
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
                  {data.getEvent.title}
                </Typography>
                <Stack direction="row">
                  <AccessTimeIcon />
                  <Typography variant="body1" sx={{ ml: 1, mr: 4 }}>
                    {moment(data.getEvent.date).format("LT")}
                  </Typography>
                  <LocationOnIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {data.getEvent.location}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sm={3} textAlign="end">
                {checkIfEventPassed(data.getEvent.date)
                  ? disableJoinButton
                  : joinButton}
              </Grid>

              {/* Image */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "70vmin",
                    px: 2,
                    display: "block",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={data.getEvent.imageUrl}
                    alt={`${data.getEvent.id}`}
                    width={"100%"}
                    height={"60%"}
                    layout="responsive"
                  ></Image>
                </Box>
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
                          <span style={{ fontWeight: "bold" }}>Time</span>{" "}
                          <br /> {moment(data.getEvent.date).format("LT")}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: bgnavy }}>
                          <CalendarTodayIcon />
                        </Avatar>
                        <Typography variant="body1">
                          <span style={{ fontWeight: "bold" }}>Date</span>{" "}
                          <br />{" "}
                          {moment(data.getEvent.date).format(
                            "dddd MMM Do YYYY"
                          )}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: bgnavy }}>
                          <LocationOnIcon />
                        </Avatar>
                        <Typography variant="body1">
                          <span style={{ fontWeight: "bold" }}>Location</span>{" "}
                          <br /> {data.getEvent.location}
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
                        <br /> {data.getEvent.description}
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
                    {data.getEvent.participants &&
                      data.getEvent.participants.map((item: participants) => (
                        <Tooltip key={item.id} title={item.name}>
                          <Avatar
                            sx={{
                              bgcolor: bgnavy,
                              width: 100,
                              height: 100,
                              fontSize: 36,
                            }}
                          >
                            {item.name[0]}
                          </Avatar>
                        </Tooltip>
                      ))}
                  </Stack>
                </Stack>
              </Grid>

              {/* Comment */}
              <Grid item xs={12}>
                <Typography variant="h5">Comment</Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <TextField
                    id="standard-basic"
                    label="Share your though!"
                    variant="standard"
                    sx={{ width: "95%" }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <IconButton
                    sx={{ color: navy }}
                    aria-label="send"
                    onClick={handleComment}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
                {data.getEvent.Comments &&
                  data.getEvent.Comments.map((item: comment) => (
                    <Grid container key={item.id} spacing={2} sx={{ my: 3 }}>
                      <Grid item xs={2} sm={1}>
                        <Avatar
                          sx={{
                            bgcolor: bgnavy,
                            width: 50,
                            height: 50,
                          }}
                        >
                          {item.user.name[0]}
                        </Avatar>
                      </Grid>
                      <Grid item xs={10} sm={11}>
                        <Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography
                              variant="h6"
                              sx={{ textTransform: "capitalize" }}
                            >
                              {item.user.name}
                            </Typography>
                            <Typography variant="subtitle2">
                              {moment(item.updatedAt)
                                .startOf("minute")
                                .fromNow()}
                            </Typography>
                          </Stack>
                          <Typography variant="body1">
                            {item.comment}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default EventDetail;
