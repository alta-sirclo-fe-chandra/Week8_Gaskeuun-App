import { SxProps } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme();
export const fontSize = responsiveFontSizes(theme);

export const leftContent: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const greetings: SxProps = {
  width: "90%",
  mt: "10%",
  mb: "2%",
};

export const fontNavy: SxProps = {
  color: "#0C0D36",
};

export const labelForm: SxProps = { ...fontNavy, fontWeight: "bold" };

export const inputForm: SxProps = {
  p: 2,
  height: "8.5vh",
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

export const rightContent: SxProps = {
  display: { xs: "none", md: "block" },
  minHeight: "100vh",
  border: "1px solid blue",
  backgroundColor: "#2A6AC8",
  paddingY: 7,
  paddingX: 3,
};
