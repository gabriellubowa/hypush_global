import { EdgeMark, LeadPane, SplitSection, TrailPane } from "../components/home/SplitSection";
import { DashMark, SectionRule, TurningPlusMark } from "../components/decor/marks";
import { BRAND } from "../constants/brand";
import { CallToAction, PrimaryButton } from "../components/CallToAction";
import Link from "next/link";
import METADATA from "../constants/metadata";
import { OrbitingListener } from "../components/OrbitingListener";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { HowWeWork } from "../components/home/HowWeWork";
import { WhatWeDo } from "../components/home/WhatWeDo";
import styled from "styled-components";

const HeroTitle = styled.h1`
  font-size: clamp(2.35rem, 1.4rem + 3.6vw, 4.5rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.045em;
  margin: 0;

  em {
    font-style: normal;
    color: var(--color-accent);
  }
`;

const HeroList = styled.ul`
  list-style: none;
  padding: 0;
  margin: var(--margins-xl) 0;
  font-family: var(--font-mono);
  font-size: 15px;
  line-height: 2;
  color: var(--color-secondary);

  li::before {
    content: "–";
    margin-right: 10px;
    color: var(--color-accent);
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--margins-lg);
`;

const UnderlineLink = styled(Link)`
  font-weight: 600;
  border-bottom: 2px solid var(--color-text);
  padding-bottom: 2px;
  transition: border-color var(--duration-fast) linear;

  &:hover {
    border-color: var(--color-accent);
  }
`;

const Hero = () => (
  <>
    <SplitSection aria-labelledby="hero-heading">
      <EdgeMark>
        <TurningPlusMark />
      </EdgeMark>
      <LeadPane $maxWidth="46%">
        <HeroTitle id="hero-heading">
          Strategic hype. <em>Relentless push.</em>
        </HeroTitle>
        <HeroList>
          <li>Launch Releases That Land</li>
          <li>Build a Name Fans Remember</li>
          <li>Get Heard Beyond Your City</li>
        </HeroList>
        <HeroActions>
          <PrimaryButton href={BRAND.CONTACT_URL}>
            {BRAND.CONTACT_LABEL} <span aria-hidden="true">→</span>
          </PrimaryButton>
          <UnderlineLink href="/services">Explore Services</UnderlineLink>
        </HeroActions>
      </LeadPane>
      <TrailPane $maxWidth="54%" $center>
        <OrbitingListener />
      </TrailPane>
      <EdgeMark>
        <DashMark />
      </EdgeMark>
    </SplitSection>
    <SectionRule />
  </>
);

export default function Home() {
  return (
    <SiteLayout metadata={METADATA.HOME_PAGE} pageType="WebPage">
      <Hero />
      <WhatWeDo />
      <SectionRule />
      <HowWeWork />
      <CallToAction />
    </SiteLayout>
  );
}
