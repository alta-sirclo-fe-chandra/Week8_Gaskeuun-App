import {
  Box,
  Container,
  Grid,
  Button,
  Stack,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../layouts";
import Banner from "../../assets/banner.svg";
import Image from "next/image";
import { BannerSmStyle, BannerStyle } from "../../styles/homeStyle";
import { button } from "../../styles/formStyle";
import { GET_MY_EVENT } from "../../libs/queries";
import client from "../../libs/apollo";
import moment from "moment";
import Link from "next/link";
import { Events } from "../../types/event";
import { useState } from "react";
import HeadPage from "../../components/head";
import { useRouter } from "next/router";
import { DELETE_EVENT } from "../../libs/mutations";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_MY_EVENT,
  });

  return {
    props: {
      events: data.getMyEvent,
    },
  };
};

const Home = ({ events }: Events) => {
  const [data] = useState(events);
  const router = useRouter();
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleEdit = (id: number) => {
    router.push(`/event/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    await deleteEvent({
      variables: {
        eventId: id,
      },
    }).then(() => {
      Swal.fire("Success", "Your event has been deleted", "success");
      refreshData();
    });
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <HeadPage />
      <Layout>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              display: "block",
              height: 440,
              pb: 5,
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Image
                src={Banner}
                alt="banner"
                layout="responsive"
                priority
              ></Image>
              <Box sx={BannerStyle}>
                <h1>
                  <span style={{ fontWeight: "lighter" }}>Welcome to</span>
                  <br />
                  Gaskeuun
                </h1>
              </Box>
            </Box>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={BannerSmStyle}
            >
              <h1>
                <span style={{ fontWeight: "lighter" }}>Welcome to</span>
                <br />
                Gaskeuun
              </h1>
            </Stack>
          </Grid>
          <Box sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              sx={button}
              onClick={() => router.push("/event/create")}
            >
              Add Event
            </Button>
          </Box>
          <Stack divider={<Divider />}>
            {data.map((item: any, index) => (
              <Grid
                key={index}
                container
                justifyContent="space-evenly"
                sx={{ py: 3 }}
              >
                <Grid
                  item
                  xs={10}
                  sm={5}
                  md={4}
                  sx={{
                    borderRadius: 5,
                    display: "block",
                    px: 10,
                    boxShadow: 2,
                    alignSelf: "center",
                  }}
                >
                  <Image
                    src={
                      "https://cdn-icons-png.flaticon.com/512/2659/2659360.png"
                    }
                    alt={`${index}`}
                    width={"100%"}
                    height={"100%"}
                    layout="responsive"
                  ></Image>
                </Grid>
                <Grid item xs={10} sm={6} md={5}>
                  <p>{moment(item.date).format("dddd MMM Do YYYY")}</p>
                  <Link href={`/${item.id}`}>
                    <a>
                      <Typography
                        variant="h4"
                        sx={{ mb: 5, textTransform: "capitalize" }}
                      >
                        {item.title}
                      </Typography>
                    </a>
                  </Link>
                  <p>Hosted by {item.host}</p>
                </Grid>
                <Grid item lg={1} sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
