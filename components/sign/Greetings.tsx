import { Box, Typography } from "@mui/material";
import { navy } from "../../styles/colorStyle";
import { greetings, subtitle } from "../../styles/signStyle";

type GreetingsProp = {
  title: string;
  desc: string;
};

const Greetings = ({ title, desc }: GreetingsProp) => {
  return (
    <Box sx={greetings}>
      <Typography variant="h4" fontWeight="bold" sx={navy}>
        {title}
      </Typography>
      <Typography variant="subtitle1" fontWeight={500} sx={subtitle}>
        {desc}
      </Typography>
    </Box>
  );
};

export default Greetings;
