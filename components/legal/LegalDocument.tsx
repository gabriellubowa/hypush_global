import { IMetadata } from "../../constants/metadata";
import { SiteLayout } from "../layout/SiteLayout";
import Link from "next/link";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Shell = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: var(--margins-xxl) 0 calc(var(--margins-xxl) + var(--margins-lg));
`;

const DocHeader = styled.header`
  margin-bottom: var(--margins-xl);
  padding-bottom: var(--margins-lg);
  border-bottom: 1px solid var(--color-border-accordion);
`;

const Title = styled.h1`
  margin: 0 0 var(--margins-sm);
  font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const Meta = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-muted);
`;

const Lead = styled.p`
  margin: var(--margins-md) 0 0;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--color-secondary);
`;

const Toc = styled.nav`
  margin: 0 0 var(--margins-xl);
  padding: var(--margins-lg);
  border: 1px solid var(--color-border-accordion);
  background: var(--color-surface);

  h2 {
    margin: 0 0 var(--margins-md);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  ol {
    margin: 0;
    padding-left: 1.4em;
    color: var(--color-secondary);
  }

  li + li {
    margin-top: 0.35em;
  }

  a {
    color: var(--color-text);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  a:hover {
    color: var(--color-accent);
  }
`;

const Article = styled.article`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-secondary);
`;

const Section = styled.section`
  margin: 0 0 var(--margins-xl);
  scroll-margin-top: 96px;

  h2 {
    margin: 0 0 var(--margins-md);
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }

  p {
    margin: 0 0 var(--margins-md);
  }

  ul {
    margin: 0 0 var(--margins-md);
    padding-left: 1.35em;
  }

  li + li {
    margin-top: 0.4em;
  }

  a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  strong.emphasis {
    display: block;
    margin: var(--margins-md) 0;
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.6;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: var(--color-text);
  }
`;

export type LegalBlock =
  | { type: "paragraph"; text: ReactNode }
  | { type: "list"; items: ReadonlyArray<ReactNode> }
  | { type: "emphasis"; text: ReactNode };

export interface ILegalSection {
  id: string;
  heading: string;
  blocks: ReadonlyArray<LegalBlock>;
}

interface Props {
  title: string;
  lead?: string;
  updatedLabel: string;
  metadata: IMetadata;
  sections: ReadonlyArray<ILegalSection>;
}

function BlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "emphasis":
      return <strong className="emphasis">{block.text}</strong>;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export const LegalDocument = ({ title, lead, updatedLabel, metadata, sections }: Props) => {
  const withContact: ReadonlyArray<ILegalSection> = [
    ...sections,
    {
      id: "questions",
      heading: "Questions",
      blocks: [
        {
          type: "paragraph",
          text: (
            <>
              If you have questions about this document, contact us on the{" "}
              <Link href="/contact">contact page</Link> or{" "}
              <Link href="/quote">request a quote</Link>.
            </>
          ),
        },
      ],
    },
  ];

  return (
    <SiteLayout title={title} metadata={metadata} pageType="WebPage">
      <Shell>
        <DocHeader data-aos="fade-up">
          <Title>{title}</Title>
          <Meta>{updatedLabel}</Meta>
          {lead ? <Lead>{lead}</Lead> : null}
        </DocHeader>

        <Toc aria-label="Contents" data-aos="fade-up">
          <h2>Contents</h2>
          <ol>
            {withContact.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  {index + 1}. {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </Toc>

        <Article>
          {withContact.map((section, index) => (
            <Section key={section.id} id={section.id} data-aos="fade-up">
              <h2>
                {index + 1}. {section.heading}
              </h2>
              {section.blocks.map((block, blockIndex) => (
                <BlockView key={`${section.id}-${blockIndex}`} block={block} />
              ))}
            </Section>
          ))}
        </Article>
      </Shell>
    </SiteLayout>
  );
};
