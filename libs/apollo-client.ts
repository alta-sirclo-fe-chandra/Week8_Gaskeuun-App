import { ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const link = new HttpLink({
  uri: "http://3.0.145.22:8080/query",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
