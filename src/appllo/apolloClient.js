import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const initialApplloClient = () => {
  const NODE_ENV = process.env.NODE_ENV;
  const httpLink = createHttpLink({
    uri:
      NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_URL + "/graphql"
        : process.env.REACT_APP_BACKEND_PRODUCTION_URL + "/graphql",
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return {
    client,
  };
};

export default initialApplloClient;
