import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();

  return (
    <Box sx={{ mt: 3, cursor: "pointer", position: "relative" }}>
      <Image
        alt="logo"
        width={80}
        height={80}
        src="/logo.svg"
        onClick={() => router.push("/")}
        priority
      />
    </Box>
  );
};

export default Logo;
