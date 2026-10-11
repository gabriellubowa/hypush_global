import { Accordion } from "../components/Accordion";
import { CallToAction } from "../components/CallToAction";
import type { GetStaticProps } from "next";
import { IFAQGroup } from "../types/faq";
import METADATA from "../constants/metadata";
import { PageIntro } from "../components/PageIntro";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";
import { faqPageJsonLd } from "../lib/seo/jsonLd";
import { fetchFAQGroups } from "../services/faq";
import styled from "styled-components";

const Group = styled.section`
  width: 100%;
  margin-bottom: var(--margins-xl);

  h2 {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
`;

interface Props {
  groups: ReadonlyArray<IFAQGroup>;
}

export default function Faq({ groups }: Props) {
  return (
    <SiteLayout
      title="FAQ"
      metadata={METADATA.FAQ_PAGE}
      pageType="FAQPage"
      jsonLd={[faqPageJsonLd(groups)]}
    >
      <PageIntro
        eyebrow="FAQ"
        title="Questions, Answered."
        lead="How campaigns work, who we work with and what to expect when you bring us a release."
      />
      {groups.map((group) => (
        <Group key={group.tag} aria-label={group.tag} data-aos="fade-up">
          <h2>{group.tag}</h2>
          <Accordion
            items={group.items.map((item) => ({
              id: item.slug,
              title: item.question,
              content: item.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
            }))}
          />
        </Group>
      ))}
      <CallToAction />
    </SiteLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { groups: await fetchFAQGroups() },
});
