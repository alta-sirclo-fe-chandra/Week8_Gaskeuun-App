import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useScrollTrigger } from "@mui/material";
import { button } from "../styles/formStyle";
import AuthContext from "../store/AuthContext";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const Navbar = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  let isLoggedIn = authContext.isAuth;

  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      isLoggedIn = true;
    }
  }

  const pages = [
    ["Home", "/"],
    isLoggedIn ? ["My Event", "/my-event"] : ["Sign Up", "/sign-up"],
  ];
  const settings = [["Profile", "/profile"], ["Event", "/event"], ["Logout"]];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSetting = (item: any) => {
    handleCloseUserMenu();
    if (item[0] !== "Logout") {
      router.push(item[1]);
    } else {
      router.reload();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
    }
  };

  const ElevationScroll = (props: Props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  };

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ backgroundColor: "white" }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box
                component="div"
                sx={{
                  flexGrow: 1,
                }}
              >
                <Link href="/">
                  <a>
                    <Image
                      alt="logo"
                      width={50}
                      height={50}
                      src="/logo.svg"
                      priority
                    />
                  </a>
                </Link>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ mt: "45px", ml: { xs: "55%", sm: "77%" } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page[0]}
                    onClick={() => router.push(page[1])}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    {page[0]}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0, display: isLoggedIn ? "block" : "none" }}>
                <Box
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    flexGrow: 1,
                  }}
                >
                  <Avatar alt="Customer" />
                  <Typography
                    textAlign="center"
                    sx={{
                      ml: 1,
                      color: "black",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    Hi, Customer
                  </Typography>
                </Box>
                <Menu
                  sx={{ mt: "45px", ml: { xs: "70%", sm: "85%" } }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting[0]}
                      onClick={() => handleSetting(setting)}
                    >
                      <Typography textAlign="center">{setting[0]}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0, display: isLoggedIn ? "none" : "block" }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => router.push("/sign-in")}
                  sx={button}
                >
                  Sign In
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  );
};
export default Navbar;
