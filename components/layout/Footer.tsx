import { BRAND } from "../../constants/brand";
import { BrandMark } from "../logo/BrandMark";
import { ClutchLogo, TrustpilotLogo } from "./FooterReviewLogos";
import { FooterThemeSwitch } from "./FooterThemeSwitch";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeProvider";

// Footer layout ported from the HYPushEasy site footer.

const LAB_LINK = { label: "Tech Lab", href: "https://hypush.io" };
const CONTACT = {
  email: BRAND.EMAIL,
  phoneLabel: BRAND.PHONE_LABEL,
  phoneHref: BRAND.PHONE_HREF,
};

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/hypush_co",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/hypush.co",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/hypush",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/hypush.co",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
] as const;

const REVIEW_LINKS = {
  clutch: { label: "Clutch", href: "https://clutch.co/profile/hypush" },
  trustpilot: { label: "Trustpilot", href: "https://www.trustpilot.com/review/hypush.io" },
} as const;

const LOCKUP_HEIGHT = "58.19px";
const TABLET = "@media (max-width: 900px)";
const PHONE = "@media (max-width: 640px)";
const ABOVE_PHONE = "@media (min-width: 641px)";

const Wrapper = styled.footer`
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;

  width: 100%;
  padding: var(--space-lg) 0;
  border-top: 1px solid var(--color-text);

  ${TABLET} {
    --space-lg: 40px;
  }

  ${PHONE} {
    --space-lg: 32px;
  }
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: auto auto;
  align-items: start;
  column-gap: var(--space-lg);
  row-gap: 10px;

  ${TABLET} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: var(--space-md);
  }
`;

const LogoRow = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: max-content;
  max-width: 100%;

  ${TABLET} {
    grid-row: auto;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: ${LOCKUP_HEIGHT};
  flex: none;
`;

const VerticalRule = styled.span`
  width: 1px;
  height: ${LOCKUP_HEIGHT};
  flex: none;
  background: var(--color-text);
`;

const StudioLink = styled.a`
  color: var(--color-text);
  font-size: 21.16px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-muted);
  }
`;

const Bottom = styled.div`
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-lg);

  ${TABLET} {
    grid-row: auto;
    align-self: start;
  }

  ${PHONE} {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
`;

const MetaLine = styled.p`
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;

  a {
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--color-text);
  }

  ${TABLET} {
    flex-wrap: wrap;
    white-space: normal;
  }
`;

const Reviews = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  ${ABOVE_PHONE} {
    align-items: flex-end;
  }

  ${PHONE} {
    align-items: flex-start;
  }
`;

const ReviewsLabel = styled.p`
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;

  ${ABOVE_PHONE} {
    width: 100%;
    text-align: right;
  }
`;

const ReviewButtons = styled.nav`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: flex-end;

  ${PHONE} {
    justify-content: flex-start;
  }
`;

const ReviewLink = styled.a`
  display: block;
  flex: none;
  padding: 0 8px;
  line-height: 0;

  svg {
    display: block;
    width: auto;
    height: 22px;
    filter: var(--review-logo-filter);
    transition: filter 0.45s ease;
  }

  &:hover svg {
    filter: grayscale(0%);
  }
`;

const ReviewDivider = styled.span`
  width: 1px;
  height: 22px;
  flex: none;
  margin: 0 2px;
  background: var(--color-text);
`;

const Columns = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: max-content 1px max-content;
  align-items: stretch;
  column-gap: var(--space-lg);

  h2 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: normal;
  }

  p {
    margin: 0;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.05em;
  }

  section > p:first-of-type {
    margin: var(--space-md) 0 calc(var(--space-sm) * 1.0625);
  }

  p a {
    color: var(--color-muted);
    transition: color 0.2s ease;
  }

  p a:hover {
    color: var(--color-text);
  }

  ${ABOVE_PHONE} {
    section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    section:last-child p:last-child {
      margin-top: auto;
    }
  }

  ${TABLET} {
    grid-column: 1;
    grid-row: auto;
  }

  ${PHONE} {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
`;

const ColumnsRule = styled.span`
  width: 1px;
  min-height: 100%;
  align-self: stretch;
  background: var(--color-text);

  ${PHONE} {
    width: 100%;
    height: 1px;
    min-height: 0;
  }
`;

const Social = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;

  ${ABOVE_PHONE} {
    margin-top: auto;
    justify-content: flex-end;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: var(--color-muted);
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--color-text);
  }

  svg {
    display: block;
    width: 18px;
    height: 18px;
  }
`;

const NewTab = () => <span className="sr-only"> (opens in new tab)</span>;

export const Footer = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  return (
  <Wrapper id="site-footer">
    <Top>
      <LogoRow>
        <LogoLink href="/" aria-label="HYPush home">
          <BrandMark onDark={isDark} height={40} />
        </LogoLink>
        <VerticalRule aria-hidden="true" />
        <StudioLink href={LAB_LINK.href} target="_blank" rel="noopener noreferrer">
          {LAB_LINK.label}
          <NewTab />
        </StudioLink>
      </LogoRow>

      <Bottom>
        <MetaLine>
          Copyright © {new Date().getFullYear()} // HYPush <span aria-hidden="true">•</span>{" "}
          <Link href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true">•</span>
          <FooterThemeSwitch />
        </MetaLine>

        <Reviews>
          <ReviewsLabel>Review us on</ReviewsLabel>
          <ReviewButtons aria-label="Review platforms">
            <ReviewLink
              href={REVIEW_LINKS.clutch.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Review us on ${REVIEW_LINKS.clutch.label} (opens in new tab)`}
            >
              <ClutchLogo />
            </ReviewLink>
            <ReviewDivider aria-hidden="true" />
            <ReviewLink
              href={REVIEW_LINKS.trustpilot.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Review us on ${REVIEW_LINKS.trustpilot.label} (opens in new tab)`}
            >
              <TrustpilotLogo />
            </ReviewLink>
          </ReviewButtons>
        </Reviews>
      </Bottom>

      <Columns>
        <section aria-labelledby="footer-office">
          <h2 id="footer-office">OFFICE</h2>
          <p>Kampala, Uganda</p>
          <Social aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in new tab)`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d={social.path} />
                </svg>
              </a>
            ))}
          </Social>
        </section>
        <ColumnsRule aria-hidden="true" />
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact">CONTACT</h2>
          <p>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a>
          </p>
        </section>
      </Columns>
    </Top>
  </Wrapper>
  );
};
