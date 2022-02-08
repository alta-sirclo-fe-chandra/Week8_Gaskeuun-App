import { Box } from "@mui/material";
import Image from "next/image";

const EmptyList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image alt="logo" width={100} height={100} src="/empty.png" priority />
      <p>There is no data</p>
    </Box>
  );
};

export default EmptyList;
