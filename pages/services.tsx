import { SERVICE_GROUPS } from "../data/services";
import { CallToAction } from "../components/CallToAction";
import { SiteLayout } from "../components/layout/SiteLayout";
import METADATA from "../constants/metadata";
import { servicesJsonLd } from "../lib/seo/jsonLd";
import { PageIntro, TitleMark } from "../components/PageIntro";
import React from "react";
import styled from "styled-components";

const StyledGroup = styled.section`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 2.4fr;
  gap: var(--margins-xl);
  width: 100%;
  padding: var(--margins-xl) 0;
  border-bottom: 1px solid var(--color-border-accordion);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: var(--margins-md);
  }
`;

const GroupHeading = styled.div`
  position: sticky;
  top: var(--margins-lg);
  align-self: start;

  h2 {
    font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
    letter-spacing: -0.02em;
  }

  p {
    color: var(--color-muted);
    margin: 0;
  }

  @media (max-width: 860px) {
    position: static;
  }
`;

const ServiceList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ServiceItem = styled.li`
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: var(--margins-md);
  padding: var(--margins-lg) 0;
  border-top: 1px solid var(--color-border-accordion);
  scroll-margin-top: var(--margins-xl);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }

  h3 {
    position: relative;
    width: fit-content;
    font-size: clamp(1.25rem, 1.1rem + 0.6vw, 1.6rem);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
    padding-bottom: 4px;
  }

  h3::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--color-accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--duration-normal) var(--ease-out-expo);
  }

  &:hover h3::after,
  &:target h3::after {
    transform: scaleX(1);
  }

  p {
    margin: var(--margins-sm) 0 0;
    color: var(--color-secondary);
    max-width: 60ch;
  }
`;

const Index = styled.span`
  font-size: clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-accent);
  font-variant-numeric: tabular-nums;
`;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Services() {
  let counter = 0;
  return (
    <SiteLayout
      title="Services"
      metadata={METADATA.SERVICES_PAGE}
      pageType="CollectionPage"
      jsonLd={[servicesJsonLd()]}
    >
        <PageIntro
          title={
            <>
              Everything a <TitleMark>Brand Needs.</TitleMark>
            </>
          }
          lead="Hire us for one piece or the whole campaign. Every service below can run on its own or alongside the others, planned against the same goal."
        />
        {SERVICE_GROUPS.map((group) => (
          <StyledGroup
            key={group.slug}
            aria-labelledby={`group-${group.slug}`}
            data-aos="fade-up"
          >
            <GroupHeading>
              <h2 id={`group-${group.slug}`}>{group.name}</h2>
              <p>{group.intro}</p>
            </GroupHeading>
            <ServiceList>
              {group.services.map((service) => {
                counter += 1;
                return (
                  <ServiceItem
                    key={service.slug}
                    id={service.slug}
                    data-aos="fade-up"
                    data-aos-delay="60"
                  >
                    <Index aria-hidden="true">{pad(counter)}</Index>
                    <div>
                      <h3>{service.name}</h3>
                      <p>{service.summary}</p>
                    </div>
                  </ServiceItem>
                );
              })}
            </ServiceList>
          </StyledGroup>
        ))}
        <CallToAction />
      </SiteLayout>
  );
}
