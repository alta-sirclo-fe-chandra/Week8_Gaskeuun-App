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
        {props.preContainer && props.preContainer}
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Index;
