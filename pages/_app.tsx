import "@fontsource-variable/instrument-sans/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "../styles/globals.css";
import { AosProvider } from "../components/AosProvider";
import { COLOR_TOKENS, SPACING_TOKENS } from "../theme/tokens";
import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { createGlobalStyle } from "styled-components";

const declarations = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([name, value]) => `${name}: ${value};`)
    .join("\n");

// Light-mode defaults for the server render; the color-mode script swaps in
// the visitor's mode before first paint.
const TokenDefaults = createGlobalStyle`
  :root {
    ${declarations(SPACING_TOKENS)}
    ${declarations(COLOR_TOKENS.light)}
  }
`;

export default function HyPushApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <TokenDefaults />
      <AosProvider>
        <Component {...pageProps} />
      </AosProvider>
    </ThemeProvider>
  );
}
