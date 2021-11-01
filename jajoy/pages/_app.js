import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Layout from "../component/Layout";
import Head from "next/head";

// CONTEXT
import { AuthProvider } from "../context/authContext";
import ApolloClient from "../apollo/apolloClient";
// APOLLO
import { ApolloProvider } from "@apollo/client";
import { NextSeo } from "next-seo";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
// import Document, { Html, Head, Main, NextScript } from "next/document";

Sentry.init({
  dsn: "https://05fcf6537f774731b39230005a481082@o864679.ingest.sentry.io/5822474",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// const tagManagerArgs = {
//   id: "G-GT44W9004V",
// };

function MyApp({ Component, pageProps }) {
  const { client } = ApolloClient();
  // useEffect(() => {
  //   TagManager.initialize(tagManagerArgs);
  // }, []);

  return (
    <div className="bg-bgsection">
      <Head>
        <title>JaJoin</title>
        <link rel="icon" className="" href="/AW Jajoin.co(brown).png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <NextSeo
        title="JaJoin"
        openGraph={{
          title: "JaJoin",
          description: "JaJoin Blogger",
          images: [
            {
              url: "/AW Jajoin.co(brown).png",
              width: 800,
              height: 600,
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <ApolloProvider client={client}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
