/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Grid,
  Button,
  Stack,
  Typography,
  Divider,
  InputBase,
  Pagination,
} from "@mui/material";
import Layout from "../layouts";
import Banner from "../assets/banner.svg";
import Image from "next/image";
import { BannerSmStyle, BannerStyle } from "../styles/homeStyle";
import { searchForm, searchFormLg } from "../styles/formStyle";
import { GET_EVENTS_PARAMS } from "../libs/queries";
import moment from "moment";
import Link from "next/link";
import { KeyboardEvent, useEffect, useRef } from "react";
import { useState } from "react";
import HeadPage from "../components/head";
import { useQuery } from "@apollo/client";

const Home = () => {
  const [page, setPage] = useState(1);
  const [param, setParam] = useState("");
  const { data, refetch } = useQuery(GET_EVENTS_PARAMS, {
    variables: {
      page,
      param,
    },
  });

  const searchSm = useRef<HTMLInputElement>();
  const searchLg = useRef<HTMLInputElement>();
  const [filter, setFilter] = useState("");
  const category = ["Game", "Art", "Sport", "Technology", "Music", "Education"];

  useEffect(() => {
    refetch();
  }, []);

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
      setParam(search);
    } else {
      setParam("");
    }
  };

  const handleFilter = (item: string) => {
    handleSubmit(item);
    setFilter(item);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <HeadPage />
      {data && (
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
                    handleSubmit();
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
              {data.getEventParam.event.map((item: any) => (
                <Grid
                  key={item.id}
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
                      alt={`${item.id}`}
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
            <Stack direction="row" justifyContent="end" sx={{ my: 4 }}>
              <Pagination
                count={data.getEventParam.totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default Home;
