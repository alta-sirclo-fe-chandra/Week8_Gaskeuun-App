import { Container, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Divider />
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Typography textAlign="center" sx={{ fontSize: 14 }}>
          &copy; 2022 Copyright Gaskeuun App. All Rights Reserved.{" "}
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
