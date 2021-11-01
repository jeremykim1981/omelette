import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import "react-slideshow-image/dist/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import nProgress from "nprogress";
import Router from "next/router";
import Amplify, { Storage } from "aws-amplify";
import store from "../_redux/store";
import { Provider } from "react-redux";
// import config from "../../aws-exports";
import "../styles/nprogress.css";
import Layout from "../components/Layouts/Layout";
import CartContextProvider from "../context/CartContext";

const hostname = "localhost";

const NODE_ENV = process.env.NODE_ENV;

const oauth = {
  domain: "rakjangfarm.auth.ap-southeast-1.amazoncognito.com",
  scope: [
    "phone",
    "email",
    "profile",
    "openid",
    "aws.cognito.signin.user.admin",
  ],
  redirectSignIn:
    NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://www.rakjangfarm.com/",
  redirectSignOut:
    NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://www.rakjangfarm.com/",
  responseType: "code",
};

// Storage.configure({
//   bucket: "rakjangfarm171025-production", //REQUIRED -  Amazon S3 bucket name
//   region: "ap-southeast-1", //OPTIONAL -  Amazon service region
//   identityPoolId: "ap-southeast-1:f2ccf57b-a776-4adc-a338-fea6a2d6ca5f",
// });
Amplify.configure({
  // ...config,
  oauth: oauth,
  Auth: {
    identityPoolId: "ap-southeast-1:769d6998-a342-49bc-ad30-08d05c50f50e", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "ap-southeast-1", // REQUIRED - Amazon Cognito Region
    userPoolId: "ap-southeast-1_Xl71jonfo", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "56ctle5lljo0dnkf7ndj3so5uh", //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: "rakjangfarm171025-production", //REQUIRED -  Amazon S3 bucket name
      region: "ap-southeast-1", //OPTIONAL -  Amazon service region
    },
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <div>
      <Head>
        {/* <link rel="shortcut icon" href={favicon} /> */}
        <title>Rakjangfarm</title>

        <link rel="shortcut icon" href="../logo/logo.png" />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <div className=" font-Kanit">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </div>
          </CartContextProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
