import { Box } from "@mui/material";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Index = (props: {
  preContainer?: any;
  children?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <>
      <Navbar />
      <main role="main">
        <Box sx={{ mt: 10 }}>
          {props.preContainer && props.preContainer}
          {props.children}
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Index;
