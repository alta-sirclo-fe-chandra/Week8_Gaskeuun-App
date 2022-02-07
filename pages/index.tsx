import {
  Box,
  Container,
  Grid,
  Button,
  Stack,
  Typography,
  Divider,
  InputBase,
} from "@mui/material";
import Layout from "../layouts";
import Banner from "../assets/banner.svg";
import Image from "next/image";
import { BannerSmStyle, BannerStyle } from "../styles/homeStyle";
import { searchForm, searchFormLg } from "../styles/formStyle";
import { GET_EVENTS, GET_EVENTS_PARAMS } from "../libs/queries";
import client from "../libs/apollo";
import moment from "moment";
import Link from "next/link";
import { KeyboardEvent, useRef } from "react";
import { Events } from "../types/event";
import { useState } from "react";
import HeadPage from "../components/head";

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: GET_EVENTS,
  });

  return {
    props: {
      events: data.getEvents.event,
    },
  };
};

const Home = ({ events }: Events) => {
  const [data, setData] = useState(events);
  const searchSm = useRef<HTMLInputElement>();
  const searchLg = useRef<HTMLInputElement>();
  const [filter, setFilter] = useState("");
  const category = ["Game", "Art", "Sport", "Technology", "Music", "Education"];

  const handleKeyPressLg = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSubmit(searchLg.current?.value);
    }
  };

  const handleKeyPressSm = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSubmit(searchSm.current?.value);
    }
  };

  const handleSubmit = async (search?: any) => {
    if (search) {
      const { data } = await client.query({
        query: GET_EVENTS_PARAMS,
        variables: { param: search },
      });
      data.getEventParam.event
        ? setData(data.getEventParam.event)
        : setData([]);
    } else {
      setData(events);
    }
  };

  const handleFilter = (item: string) => {
    handleSubmit(item);
    setFilter(item);
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
                <InputBase
                  id="searchLg"
                  sx={searchFormLg}
                  autoFocus
                  placeholder="search"
                  inputRef={searchLg}
                  onKeyPress={handleKeyPressLg}
                />
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
              <InputBase
                id="search"
                sx={searchForm}
                autoFocus
                placeholder="search"
                inputRef={searchSm}
                onKeyPress={handleKeyPressSm}
              />
            </Stack>
          </Grid>
          <Stack direction="row" justifyContent="center" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={2} sx={{ overflow: "auto" }}>
              <Button
                variant={filter === "" ? "contained" : "outlined"}
                onClick={() => {
                  handleSubmit("");
                  setFilter("");
                }}
              >
                All
              </Button>
              {category.map((item: string, index: number) => (
                <Button
                  key={index}
                  variant={filter === item ? "contained" : "outlined"}
                  sx={{ px: { xs: 7, md: 3 } }}
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Stack>
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
                <Grid item xs={10} sm={5}>
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
              </Grid>
            ))}
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
