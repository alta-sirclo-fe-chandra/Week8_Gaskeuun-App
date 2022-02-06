import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "../libs/apollo";
import AuthContext from "../store/AuthContext";
import { useState } from "react";
import UserContext from "../store/UserContext";
import { User } from "../types/User";

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({} as User);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
