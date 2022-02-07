/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "../libs/apollo";
import AuthContext from "../store/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/spinner.css";
import { Stack } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleAuth();
  }, []);

  const handleAuth = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    if (
      accessToken &&
      (router.pathname === "/sign-in" || router.pathname === "/sign-up")
    ) {
      setIsAuth(true);
      await router.push("/").finally(() => setIsLoading(false));
    } else if (
      !accessToken &&
      (router.pathname === "/profile" ||
        router.pathname === "/event" ||
        router.pathname === "/my-event")
    ) {
      setIsAuth(false);
      await router.push("/").finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ApolloProvider client={client}>
        {!isLoading ? (
          <Component {...pageProps} />
        ) : (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100vh" }}
          >
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Stack>
        )}
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
