import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Box, CircularProgress } from "@mui/material";
import { newTheme } from "../styles/theme";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import * as React from "react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { META } from "./_document";

interface DappProps extends AppProps {
  Component: NextPage & {
    title: string;
    requireLogin?: boolean;
  };
}

export default function App({ Component, pageProps }: DappProps) {
  const pageTitle = Component.title ? `${META.title} | ${Component.title}` : META.title;
  const { asPath } = useRouter();

  const { isLoading, user } = useUser({
    redirectTo: `/login?redirectTo=${asPath}`,
    shouldSkip: !Component.requireLogin,
  });

  const appElement = (
    <CssVarsProvider theme={newTheme} defaultMode="system">
      <Layout>
        {isLoading && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {((!isLoading && !Component.requireLogin) || user?.isLoggedIn) && <Component {...pageProps} />}
      </Layout>
    </CssVarsProvider>
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      {appElement}
    </>
  );
}
