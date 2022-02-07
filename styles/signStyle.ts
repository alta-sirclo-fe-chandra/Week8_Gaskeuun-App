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
  width: "100%",
  mt: 2,
  mb: 1,
};

export const subtitle: SxProps = { ...navy, mb: 2 };

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
