import { SxProps } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { blue, navy } from "./colorStyle";

const theme = createTheme();
export const fontSize = responsiveFontSizes(theme);

export const mainContent: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const greetings: SxProps = {
  width: "90%",
  mt: "10%",
  mb: "2%",
};

export const subtitle: SxProps = { ...navy, mb: 3 };

export const labelForm: SxProps = { ...navy, fontWeight: "bold" };

export const inputForm: SxProps = {
  p: 2,
  height: "50px",
  border: "1px solid #2A6AC8",
  borderRadius: 1,
  mt: "1%",
  mb: "2%",
};

export const button: SxProps = {
  marginY: 2,
  fontWeight: "bold",
  backgroundColor: "#F1B505",
  "&:hover": {
    backgroundColor: "#F1B505",
  },
};

export const girlContent: SxProps = {
  display: { xs: "none", md: "flex" },
  minHeight: "100vh",
  backgroundColor: "#2A6AC8",
  paddingY: 7,
  paddingX: 3,
  alignItems: "center",
};

export const linkStyle = {
  ...blue,
  cursor: "pointer",
  textDecoration: "underline",
};
