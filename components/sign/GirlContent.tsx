import Image from "next/image";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

import { girlContent } from "../../styles/signStyle";

const GirlContent = () => {
  const router = useRouter();

  const isSignIn = router.pathname === "/sign-in";

  return (
    <Grid item md={6} sx={girlContent}>
      <Image
        src={isSignIn ? `/signin.png` : `/signup.png`}
        alt="signin-girl"
        width={650}
        height={500}
        priority
      />
    </Grid>
  );
};

export default GirlContent;
