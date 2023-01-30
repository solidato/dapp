import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Box, CircularProgress, ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme, LightTheme } from "../styles/theme";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import * as React from "react";
import { Theme } from "@emotion/react";

interface DappProps extends AppProps {
  Component: NextPage & {
    title: string;
    requireLogin?: boolean;
  };
}

const PREFERENCE_COOKIE_NAME = "theme-preference";

export default function App({ Component, pageProps }: DappProps) {
  const userSystemThemePreferenceDark = useMediaQuery("(prefers-color-scheme: dark)");

  const [activeTheme, setActiveTheme] = React.useState(LightTheme);
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

  const defaultInitialTheme = userSystemThemePreferenceDark ? "dark" : "light";
  const preferredTheme =
    cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME] ? cookieTheme[PREFERENCE_COOKIE_NAME] : defaultInitialTheme;

  const [selectedTheme, setSelectedTheme] = React.useState<"light" | "dark">(preferredTheme);
  const [mounted, setMounted] = React.useState(false);

  const pageTitle = Component.title ? `NeokingdomDAO | ${Component.title}` : "NeokingdomDAO";
  const { asPath } = useRouter();

  const { isLoading, user } = useUser({
    redirectTo: `/login?redirectTo=${asPath}`,
    shouldSkip: !Component.requireLogin,
  });

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === "light" ? "dark" : "light";

    setSelectedTheme(desiredTheme);
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme);
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setActiveTheme(getTheme(selectedTheme));
  }, [selectedTheme]);

  React.useEffect(() => {
    setSelectedTheme(preferredTheme);
  }, [preferredTheme]);

  React.useEffect(() => {
    document.body.style.backgroundColor =
      activeTheme.palette.mode === "dark" ? activeTheme.palette.grey[900] : activeTheme.palette.grey[100];
  }, [activeTheme]);

  const appElement = (
    <ThemeProvider theme={activeTheme}>
      <Layout toggleTheme={toggleTheme}>
        {isLoading && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {((!isLoading && !Component.requireLogin) || user?.isLoggedIn) && <Component {...pageProps} />}
      </Layout>
    </ThemeProvider>
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
      {mounted ? appElement : <div style={{ visibility: "hidden" }}>{appElement}</div>}
    </>
  );
}
