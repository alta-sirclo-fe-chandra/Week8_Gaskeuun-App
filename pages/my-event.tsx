import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import Layout from "../layouts";
import Banner from "../assets/banner.svg";
import Image from "next/image";
import { BannerSmStyle, BannerStyle } from "../styles/homeStyle";
import { GET_JOINED_EVENTS } from "../libs/queries";
import moment from "moment";
import Link from "next/link";
import HeadPage from "../components/head";
import { useQuery } from "@apollo/client";

const Home = () => {
  const { data } = useQuery(GET_JOINED_EVENTS);

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
            <Stack divider={<Divider />}>
              {data.getEventJoinedByUser.event.map(
                (item: any, index: number) => (
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
                  </Grid>
                )
              )}
            </Stack>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default Home;
