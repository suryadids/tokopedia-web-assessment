import { ApolloClient, InMemoryCache } from "@apollo/client";
import { pokeapi } from "../../constants";

export const client = new ApolloClient({
  ssrMode: true,
  uri: pokeapi,
  cache: new InMemoryCache(),
});
