import { SxProps } from "@mui/material";

import { navy } from "./colorStyle";

export const pageContainer: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

export const leftContent: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  p: 5,
  pb: 0,
  height: "100%",
};

export const profilePicture: SxProps = { width: "15rem", height: "15rem" };

export const rightContent: SxProps = {
  p: 5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "80vh",
};

export const backToHome: SxProps = {
  ...navy,
  cursor: "pointer",
  textDecoration: "underline",
  textAlign: "end",
};
