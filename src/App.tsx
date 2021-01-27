import React from "react";
import { Countries } from "./pages";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries-274616.ew.r.appspot.com/",
  cache: new InMemoryCache(),
});

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <Countries />
    </ApolloProvider>
  );
};

export default App;
