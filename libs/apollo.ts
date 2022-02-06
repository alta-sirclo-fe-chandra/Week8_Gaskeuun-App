import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://3.0.145.22:8080/query",
  cache: new InMemoryCache(),
});

export default client;
