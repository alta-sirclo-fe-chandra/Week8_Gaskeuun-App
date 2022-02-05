import { SxProps, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#2A6AC8",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#2A6AC8",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2A6AC8",
    },
    "&:hover fieldset": {
      borderColor: "#2A6AC8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2A6AC8",
    },
  },
});
