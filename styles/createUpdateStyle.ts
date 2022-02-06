import { SxProps } from "@mui/material";
import { labelForm } from "./formStyle";

export const outerContainer: SxProps = {
  display: "flex",
  justifyContent: "center",
};

export const innerContainer: SxProps = {
  width: "80%",
  pt: 2,
  paddingX: 2,
};

export const gridItemMargin: SxProps = {
  mb: 2,
};

export const itemContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
};

export const label: SxProps = {
  ...labelForm,
  mb: 1,
};
