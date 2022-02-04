import { SxProps } from "@mui/material";

import { navy } from "./colorStyle";

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
