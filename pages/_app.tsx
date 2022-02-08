/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "../libs/apollo";
import AuthContext from "../store/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/spinner.css";
import Loading from "../components/Loading";

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

    if (accessToken) {
      setIsAuth(true);
      if (router.pathname === "/sign-in" || router.pathname === "/sign-up") {
        router.push("/").finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    } else {
      setIsAuth(false);
      if (
        router.pathname === "/profile" ||
        router.pathname === "/event" ||
        router.pathname === "/event/edit" ||
        router.pathname === "/event/create" ||
        router.pathname === "/my-event"
      ) {
        router.push("/").finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ApolloProvider client={client}>
        {!isLoading ? <Component {...pageProps} /> : <Loading />}
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
