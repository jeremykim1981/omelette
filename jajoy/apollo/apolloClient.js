import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// export const STRAPI_URI = process.env.NEXTAUTH_BACKEND_URL;
// export const STRAPI_URI = "http://localhost:1337";

const initialApplloClient = () => {
  const NODE_ENV = process.env.NODE_ENV;
  const httpLink = createHttpLink({
    uri:
      NODE_ENV === "development"
        ? process.env.NEXTAUTH_BACKEND_URL + "/graphql"
        : process.env.NEXTAUTH_BACKEND_PRODUCTION_URL + "/graphql",
  });

  // const authLink = setContext((_, { headers }) => {
  //     // get the authentication token from local storage if it exists
  //     if (typeof window !== "undefined") {
  //         var accessToken = window.localStorage.getItem("accessToken");
  //     }
  //     // return the headers to the context so httpLink can read them
  //     return {
  //         headers: {
  //             ...headers,
  //             Authorization: accessToken ? `Bearer ${accessToken}` : "",
  //         },
  //     };
  // });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return {
    client,
  };
};

export default initialApplloClient;
