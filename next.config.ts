import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { createHash } from "node:crypto";
import { COLOR_MODE_SCRIPT } from "./theme/colorModeScript.js";

// Allow exactly the inline color-mode script by hash instead of
// 'unsafe-inline'.
const colorModeScriptHash = createHash("sha256").update(COLOR_MODE_SCRIPT).digest("base64");

// Everything (fonts, images, scripts) is self-hosted, so no third-party
// origins are allowed. The dev server additionally needs eval for fast refresh.
//
// Never send upgrade-insecure-requests in development: Safari upgrades
// http://127.0.0.1 to https and the page fails to load.
function contentSecurityPolicy(isDev: boolean): string {
  const scriptSrc = ["'self'", `'sha256-${colorModeScriptHash}'`, ...(isDev ? ["'unsafe-eval'"] : [])];
  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
  ];
  if (!isDev) directives.push("upgrade-insecure-requests");
  return directives.join("; ");
}

function securityHeaders(isDev: boolean) {
  const headers = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(isDev) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
    },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ];

  // HSTS + COOP only in production — both can interfere with local Safari/http.
  if (!isDev) {
    headers.push(
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    );
  }

  return headers;
}

export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    reactStrictMode: true,
    poweredByHeader: false,
    compiler: { styledComponents: true },
    // Pin the workspace root: a stray lockfile in a parent folder must not
    // change how this project is built.
    turbopack: { root: process.cwd() },
    async headers() {
      return [
        { source: "/(.*)", headers: securityHeaders(isDev) },
        {
          source: "/api/(.*)",
          headers: [
            { key: "Cache-Control", value: "no-store, max-age=0" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          ],
        },
      ];
    },
    async redirects() {
      return [
        { source: "/start-a-project", destination: "/quote", permanent: true },
        { source: "/clients", destination: "/case-study", permanent: true },
        { source: "/terms-of-service", destination: "/terms", permanent: true },
        { source: "/privacy-policy", destination: "/privacy", permanent: true },
        { source: "/terms-of-use", destination: "/terms", permanent: true },
      ];
    },
  };
}
