import METADATA, { IMetadata } from "../../constants/metadata";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../../lib/seo/jsonLd";
import Head from "next/head";
import React, { useMemo } from "react";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  metadata?: IMetadata;
  /** Extra schema.org graphs (e.g. FAQPage). Organization + WebSite are always included. */
  jsonLd?: ReadonlyArray<Record<string, unknown>>;
  /** Schema.org @type for the WebPage node (AboutPage, ContactPage, CollectionPage…). */
  pageType?: string;
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${METADATA.HOST_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function buildPageTitle(title: string | undefined, metadata: IMetadata | undefined): string {
  if (metadata?.TITLE && !title) return metadata.TITLE;
  if (!title) return METADATA.TITLE;
  // Keep titles short for SERP truncation: "Services | HYPush"
  if (title.includes(METADATA.SITE_NAME)) return title;
  return `${title} | ${METADATA.SITE_NAME}`;
}

// Page title, description, social cards, robots and JSON-LD for every page.
export function Seo({ title, metadata, jsonLd = [], pageType }: Props) {
  const { asPath } = useRouter();
  const pathFromRouter = asPath.split(/[?#]/)[0] || "/";
  const path = metadata?.CANONICAL_PATH ?? pathFromRouter;
  const pageTitle = buildPageTitle(title, metadata);
  const description = metadata?.DESCRIPTION ?? METADATA.DESCRIPTION;
  const robots = metadata?.ROBOTS ?? METADATA.DEFAULT_ROBOTS;
  const ogType = metadata?.TYPE ?? METADATA.OG_TYPE;
  const ogImage = metadata?.OG_IMAGE ?? METADATA.OG_IMAGE;
  const pageUrl = absoluteUrl(path === "/" ? "/" : path);
  const imageUrl = absoluteUrl(ogImage.URL);
  const keywords = (metadata?.TAGS ?? METADATA.TAGS).join(", ");

  const graphs = useMemo(() => {
    const crumbs =
      path === "/"
        ? [{ name: "Home", path: "/" }]
        : [
            { name: "Home", path: "/" },
            { name: title ?? metadata?.TITLE ?? "Page", path },
          ];

    return [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path,
        title: pageTitle,
        description,
        type: pageType,
      }),
      breadcrumbJsonLd(crumbs),
      ...jsonLd,
    ];
  }, [path, title, metadata?.TITLE, pageTitle, description, pageType, jsonLd]);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={METADATA.SITE_NAME} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content={METADATA.THEME_COLOR} />
      <meta name="application-name" content={METADATA.SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={METADATA.SITE_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={METADATA.SITE_NAME} />
      <meta property="og:locale" content={METADATA.LOCALE} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={String(ogImage.WIDTH)} />
      <meta property="og:image:height" content={String(ogImage.HEIGHT)} />
      <meta property="og:image:alt" content={ogImage.ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={METADATA.TWITTER_HANDLE} />
      <meta name="twitter:creator" content={METADATA.TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={ogImage.ALT} />

      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" type="image/png" sizes="32x32" href={METADATA.FAVICON.MEDIUM} />
      <link rel="icon" type="image/png" sizes="16x16" href={METADATA.FAVICON.SMALL} />
      <link rel="apple-touch-icon" sizes="180x180" href={METADATA.FAVICON.APPLE_TOUCH_ICON} />
      <link rel="manifest" href={METADATA.MANIFEST} />
      <link rel="alternate" type="application/rss+xml" title="HYPush Blog" href="https://hypush.co/blog" />

      {graphs.map((graph, index) => (
        <script
          key={`ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </Head>
  );
}
