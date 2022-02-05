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
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../layouts";
import Banner from "../assets/banner.svg";
import Image from "next/image";
import { BannerSmStyle, BannerStyle, SearchStyle } from "../styles/homeStyle";
import { searchForm, searchFormLg } from "../styles/formStyle";

const Home: NextPage = () => {
  const category = ["Game", "Art", "Sport", "Technology", "Music", "Education"];
  return (
    <>
      <Head>
        <title>Gaskeuun App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <Image src={Banner} alt="banner" layout="responsive"></Image>
              <Box sx={BannerStyle}>
                <h1>
                  <span style={{ fontWeight: "lighter" }}>Welcome to</span>
                  <br />
                  Gaskeuun
                </h1>
                <InputBase
                  id="search"
                  name="email"
                  autoComplete="email"
                  sx={searchFormLg}
                  autoFocus
                  placeholder="search"
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
                name="email"
                autoComplete="email"
                sx={searchForm}
                autoFocus
                placeholder="search"
              />
            </Stack>
          </Grid>
          <Stack direction="row" justifyContent="center" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={2} sx={{ overflow: "auto" }}>
              <Button variant="outlined">All</Button>
              {category.map((item: string, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{ px: { xs: 7, md: 3 } }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Stack>
          <Stack divider={<Divider />}>
            {category.map((item: string, index: number) => (
              <>
                <Grid
                  key={index}
                  container
                  justifyContent="space-evenly"
                  sx={{ py: 3 }}
                >
                  <Grid
                    item
                    xs={10}
                    sm={4}
                    sx={{
                      borderRadius: 5,
                      display: "block",
                      bgcolor: "text.secondary",
                      py: 10,
                    }}
                  ></Grid>
                  <Grid item xs={10} sm={6} md={5}>
                    <p>Monday, 12 Feb 2022</p>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                      Judul disini yaa
                    </Typography>
                    <p>Hosted by Gaskeuun</p>
                  </Grid>
                </Grid>
              </>
            ))}
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
