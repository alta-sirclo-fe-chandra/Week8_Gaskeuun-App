import { SxProps } from "@mui/material";

export const BannerStyle: SxProps = {
    ml: 5,
    position: "relative",
    top: "-19rem",
    color: "white",
    fontSize: "1.5rem"
};

export const BannerSmStyle: SxProps = {
    display: {
        xs: "flex",
        md: "none",
    },
    height: "100%",
    bgcolor: "primary.main",
    color: "white",
    borderRadius: 10
}
  
export const SearchStyle: SxProps = {
    width: "30%",
    color: "white"
}