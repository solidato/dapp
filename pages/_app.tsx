import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";

interface DappProps extends AppProps {
  Component: NextPage & {
    title: string;
    requireLogin?: boolean;
  };
}

export default function App({ Component, pageProps }: DappProps) {
  const pageTitle = Component.title ? `NeokingdomDAO | ${Component.title}` : "NeokingdomDAO";
  const { isLoading, user } = useUser({ redirectTo: "/login", shouldSkip: !Component.requireLogin });

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          {isLoading && (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {((!isLoading && !Component.requireLogin) || user?.isLoggedIn) && <Component {...pageProps} />}
        </Layout>
      </ThemeProvider>
    </>
  );
}
