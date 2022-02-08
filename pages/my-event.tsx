/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
  Pagination,
} from "@mui/material";
import Layout from "../layouts";
import Image from "next/image";
import { BannerSmStyle, BannerStyle } from "../styles/homeStyle";
import { GET_JOINED_EVENTS } from "../libs/queries";
import moment from "moment";
import Link from "next/link";
import HeadPage from "../components/head";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useQuery(GET_JOINED_EVENTS, {
    variables: { page },
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
                src="/banner.svg"
                alt="banner"
                width="100%"
                height="35%"
                layout="responsive"
                priority
              />
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
            {data &&
              data.getEventJoinedByUser.event.map(
                (item: any, index: number) => (
                  <Grid
                    key={index}
                    container
                    justifyContent="space-evenly"
                    sx={{ py: 3 }}
                  >
                    <Grid item xs={10} sm={5} md={4} sx={{ px: 3 }}>
                      <Image
                        src={item.imageUrl}
                        alt={`${item.id}`}
                        width={"100%"}
                        height={"70%"}
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
          {data && (
            <Stack direction="row" justifyContent="end" sx={{ my: 4 }}>
              <Pagination
                count={data.getEventJoinedByUser.totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Home;
