export interface IMetadata {
  DESCRIPTION: string;
  /** Optional short title used in <title> / og:title (falls back to SiteLayout title). */
  TITLE?: string;
  TYPE?: string;
  CANONICAL_PATH?: string;
  ROBOTS?: string;
  OG_IMAGE?: {
    URL: string;
    WIDTH: number;
    HEIGHT: number;
    ALT: string;
  };
  TAGS?: string[];
  ARTICLE_SECTION?: string;
  PUBLISHED_TIME?: string;
}

const METADATA = {
  HOST_URL: "https://hypush.co",
  SITE_NAME: "HYPush",
  /** Default document title (homepage). Keep under ~60 chars. */
  TITLE: "HYPush | Music Marketing, PR, Distribution & Promotion",
  DESCRIPTION:
    "HYPush plans and runs music marketing, PR, distribution and promotion campaigns for artists, labels and brands across Africa and beyond.",
  TAGS: [
    "Music marketing",
    "Music PR",
    "Music promotion",
    "Music distribution",
    "Personal branding",
    "Event management",
    "Digital marketing",
    "Kampala",
    "Uganda",
    "Africa",
  ],
  TWITTER_HANDLE: "@hypush_co",
  OG_TYPE: "website",
  OG_IMAGE: {
    URL: "/brand/hypush-og.jpg",
    WIDTH: 1200,
    HEIGHT: 630,
    ALT: "HYPush — music marketing, PR, distribution and promotion",
  },
  LOCALE: "en_US",
  FAVICON: {
    MEDIUM: "/favicon-32x32.png",
    SMALL: "/favicon-16x16.png",
    APPLE_TOUCH_ICON: "/apple-touch-icon.png",
  },
  MANIFEST: "/site.webmanifest",
  THEME_COLOR: "#f00809",
  DEFAULT_ROBOTS: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",

  HOME_PAGE: {
    TITLE: "HYPush | Music Marketing, PR, Distribution & Promotion",
    DESCRIPTION:
      "HYPush plans and runs music marketing, PR, distribution and promotion campaigns for artists, labels and brands across Africa and beyond.",
  },
  SERVICES_PAGE: {
    TITLE: "Services",
    DESCRIPTION:
      "Release campaigns, PR, crisis communications, content, social, SEO, events, personal branding and AI — services from HYPush.",
  },
  QUOTE_PAGE: {
    TITLE: "Get a Quote",
    DESCRIPTION:
      "Tell HYPush about your release, the services you need and your budget — we'll send a clear proposal.",
  },
  ABOUT_PAGE: {
    TITLE: "About",
    DESCRIPTION:
      "Meet HYPush — music marketing and PR professionals helping artists turn releases into results.",
  },
  TALENTS_PAGE: {
    TITLE: "Talents",
    DESCRIPTION:
      "An invitation-only HYPush network of artists, producers, influencers and creators.",
  },
  CASE_STUDY_PAGE: {
    TITLE: "Case Study",
    DESCRIPTION:
      "Artists, creators and campaigns HYPush has pushed — browse collaborations in the case study gallery.",
  },
  CONTACT_PAGE: {
    TITLE: "Contact",
    DESCRIPTION:
      "Email, phone and office details for HYPush — or start a quote for your next release.",
  },
  FAQ_PAGE: {
    TITLE: "FAQ",
    DESCRIPTION:
      "How HYPush campaigns work, who we work with, timelines and what to expect when you bring us a release.",
  },
  PRIVACY_PAGE: {
    TITLE: "Privacy Policy",
    DESCRIPTION:
      "How HYPush Technologies Co. Ltd collects, uses and protects personal information on hypush.co.",
    CANONICAL_PATH: "/privacy",
  },
  TERMS_OF_SERVICE: {
    TITLE: "Terms of Service",
    DESCRIPTION:
      "Terms of Service for hypush.co and related HYPush websites operated by HYPush Technologies Co. Ltd.",
    CANONICAL_PATH: "/terms",
  },
  NOT_FOUND_PAGE: {
    TITLE: "Page Not Found",
    DESCRIPTION: "This page doesn't exist on hypush.co. Head home or play the 404 board to find the exit.",
    ROBOTS: "noindex, follow",
    CANONICAL_PATH: "/",
  },
};

export default METADATA;
