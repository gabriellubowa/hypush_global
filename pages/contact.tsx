import { BRAND } from "../constants/brand";
import { CallToAction, PrimaryButton } from "../components/CallToAction";
import Link from "next/link";
import METADATA from "../constants/metadata";
import { PageIntro } from "../components/PageIntro";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin: 0 0 var(--margins-xl);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.section`
  padding: 1.75rem;
  border: 1px solid var(--color-card-border);
  border-radius: 16px;
  background: var(--color-card);

  h2 {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-family: var(--font-mono);
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  p {
    margin: 1rem 0 0;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.3;
  }

  a {
    color: inherit;
    transition: color var(--duration-fast) linear;
  }

  a:hover {
    color: var(--color-accent);
  }
`;

const Note = styled.p`
  max-width: 52ch;
  margin: 0 0 var(--margins-xl);
  color: var(--color-secondary);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--margins-md);
  margin-bottom: var(--margins-xxl);
`;

const TextLink = styled(Link)`
  font-weight: 600;
  border-bottom: 2px solid var(--color-text);
  padding-bottom: 2px;
  align-self: center;

  &:hover {
    border-color: var(--color-accent);
  }
`;

export default function Contact() {
  return (
    <SiteLayout title="Contact" metadata={METADATA.CONTACT_PAGE} pageType="ContactPage">
      <PageIntro
        title="How Can We Help?"
        lead="Our team is a call or email away. For a campaign quote, use the form — it takes a few minutes."
      />

      <Grid>
        <Card aria-labelledby="contact-email">
          <h2 id="contact-email">Email</h2>
          <p>
            <a href={`mailto:${BRAND.EMAIL}`}>{BRAND.EMAIL}</a>
          </p>
        </Card>
        <Card aria-labelledby="contact-phone">
          <h2 id="contact-phone">Phone</h2>
          <p>
            <a href={BRAND.PHONE_HREF}>{BRAND.PHONE_LABEL}</a>
          </p>
        </Card>
        <Card aria-labelledby="contact-office">
          <h2 id="contact-office">Office</h2>
          <p>Kampala, Uganda</p>
        </Card>
      </Grid>

      <Note>
        Prefer a structured brief? Start a quote and we&apos;ll come back with a
        plan and written numbers.
      </Note>

      <Actions>
        <PrimaryButton href={BRAND.CONTACT_URL}>
          {BRAND.CONTACT_LABEL} <span aria-hidden="true">→</span>
        </PrimaryButton>
        <TextLink href="/faq">Read the FAQ</TextLink>
      </Actions>

      <CallToAction />
    </SiteLayout>
  );
}
