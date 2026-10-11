import { BRAND } from "../../constants/brand";
import METADATA from "../../constants/metadata";
import { SERVICE_GROUPS } from "../../data/services";
import { TALENTS } from "../../data/talents";
import { IFAQGroup } from "../../types/faq";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${METADATA.HOST_URL}/#organization`,
    name: METADATA.SITE_NAME,
    legalName: "HYPush",
    url: METADATA.HOST_URL,
    email: BRAND.EMAIL,
    telephone: BRAND.PHONE_LABEL,
    description: METADATA.DESCRIPTION,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kampala",
        addressCountry: "UG",
      },
    },
    areaServed: [
      { "@type": "Country", name: "Uganda" },
      { "@type": "Continent", name: "Africa" },
    ],
    knowsAbout: METADATA.TAGS,
    logo: {
      "@type": "ImageObject",
      url: `${METADATA.HOST_URL}${METADATA.FAVICON.APPLE_TOUCH_ICON}`,
    },
    image: `${METADATA.HOST_URL}${METADATA.OG_IMAGE.URL}`,
    sameAs: [
      "https://x.com/hypush_co",
      "https://facebook.com/hypush.co",
      "https://linkedin.com/company/hypush",
      "https://instagram.com/hypush.co",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: BRAND.EMAIL,
        telephone: BRAND.PHONE_LABEL,
        availableLanguage: ["English"],
        url: `${METADATA.HOST_URL}/quote`,
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${METADATA.HOST_URL}/#website`,
    name: METADATA.SITE_NAME,
    url: METADATA.HOST_URL,
    description: METADATA.DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${METADATA.HOST_URL}/#organization` },
    potentialAction: {
      "@type": "CommunicateAction",
      name: BRAND.CONTACT_LABEL,
      target: `${METADATA.HOST_URL}${BRAND.CONTACT_URL}`,
    },
  };
}

export function webPageJsonLd(options: {
  path: string;
  title: string;
  description: string;
  type?: string;
}): JsonLd {
  const url = `${METADATA.HOST_URL}${options.path === "/" ? "" : options.path}`;
  return {
    "@context": "https://schema.org",
    "@type": options.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.title,
    description: options.description,
    isPartOf: { "@id": `${METADATA.HOST_URL}/#website` },
    about: { "@id": `${METADATA.HOST_URL}/#organization` },
    inLanguage: "en",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${METADATA.HOST_URL}${METADATA.OG_IMAGE.URL}`,
      width: METADATA.OG_IMAGE.WIDTH,
      height: METADATA.OG_IMAGE.HEIGHT,
    },
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${METADATA.HOST_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqPageJsonLd(groups: ReadonlyArray<IFAQGroup>): JsonLd {
  const entities = groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.join(" "),
      },
    })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };
}

export function servicesJsonLd(): JsonLd {
  const offers = SERVICE_GROUPS.flatMap((group) =>
    group.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        url: `${METADATA.HOST_URL}/services#${service.slug}`,
        provider: { "@id": `${METADATA.HOST_URL}/#organization` },
        serviceType: group.name,
        areaServed: "Africa",
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "HYPush Services",
    url: `${METADATA.HOST_URL}/services`,
    itemListElement: offers,
  };
}

export function talentsJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HYPush Talents",
    url: `${METADATA.HOST_URL}/talents`,
    numberOfItems: TALENTS.length,
    itemListElement: TALENTS.map((talent, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: talent.name,
      url: `${METADATA.HOST_URL}/talents`,
      image: `${METADATA.HOST_URL}${talent.imageSrc}`,
    })),
  };
}
