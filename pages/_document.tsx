import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { redHatFont } from "styles/theme";
import { getInitColorSchemeScript } from "@mui/material";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={redHatFont.className}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />

          <link rel="manifest" href="/manifest.json" />
          <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>

          <style
            dangerouslySetInnerHTML={{
              __html: `
body {
  background-color: #FAFAFA;
}
[data-mui-color-scheme="dark"] body {
  background-color: #232323;
}`,
            }}
          />
        </Head>
        <body>
          {getInitColorSchemeScript({ defaultMode: "system" })}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
