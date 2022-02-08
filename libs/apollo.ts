import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://3.0.145.22:80/query",
});

const authLink = setContext((_, { headers }) => {
  let token: string | null = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
