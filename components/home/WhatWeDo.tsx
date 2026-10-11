import { DashMark, RingMark } from "../decor/marks";
import { EdgeMark, SplitSection } from "./SplitSection";
import { IServiceGroup, SERVICE_GROUPS } from "../../data/services";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

/*
 * "What we do" as a bento grid: the heading commands a wide block and each
 * discipline is an elevated card with its services as pill links.
 *
 *   desktop          tablet          phone
 *   [intro  ][rel]   [intro  ]       [intro]
 *   [pr][growth  ]   [rel][pr]       [rel  ]
 *                    [growth ]       [pr   ]
 *                                    [grow ]
 */

const AREAS = ["release", "press", "growth"] as const;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    "intro intro release"
    "press growth growth";
  gap: 20px;
  margin: 0 var(--margins-lg);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "intro intro"
      "release press"
      "growth growth";
    margin: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "intro" "release" "press" "growth";
    gap: 16px;
  }
`;

const Intro = styled.header`
  grid-area: intro;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 320px;
  padding: 2.5rem 2.5rem 2.5rem 0;

  /* Low-opacity abstract wash for visual weight without an image. */
  &::before {
    content: "";
    position: absolute;
    inset: -10% 10% -10% -6%;
    z-index: -1;
    background:
      radial-gradient(42% 55% at 18% 30%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%),
      radial-gradient(38% 45% at 70% 80%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 70%);
    filter: blur(8px);
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    min-height: 0;
    padding: 1.5rem 0 1rem;
  }
`;

const Heading = styled.h2`
  max-width: 11ch;
  padding: 0;
  font-size: clamp(2.75rem, 1.4rem + 4.2vw, 5.25rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.05em;
`;

const Card = styled.article<{ $area: string }>`
  grid-area: ${(props) => props.$area};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  border: 1px solid var(--color-card-border);
  border-radius: 18px;
  background: var(--color-card);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 24px 48px -36px rgba(0, 0, 0, 0.3);
  transition: transform var(--duration-normal) var(--ease-out-expo);

  /* Deeper hover shadow on a layer so only opacity animates. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.35);
    opacity: 0;
    transition: opacity var(--duration-normal) linear;
    pointer-events: none;
  }

  &:hover,
  &:focus-within {
    transform: translateY(-3px);
  }

  &:hover::after,
  &:focus-within::after {
    opacity: 1;
  }

  &:hover .number,
  &:focus-within .number {
    color: var(--color-accent);
  }

  @media (max-width: 640px) {
    padding: 2rem;
  }
`;

const CardNumber = styled.span`
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  transition: color var(--duration-fast) linear;
`;

const Title = styled.h3`
  margin-top: 1.75rem;
  padding: 0;
  font-size: clamp(1.5rem, 1.3rem + 0.6vw, 1.85rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0.75rem 0 0;
  max-width: 34ch;
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-secondary);
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: auto 0 0;
  padding: 2rem 0 0;
  list-style: none;
`;

const Tag = styled(Link)`
  display: inline-block;
  padding: 7px 14px;
  border: 1px solid var(--color-card-border);
  border-radius: 999px;
  background: var(--color-background);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
  transition: border-color var(--duration-fast) linear, background-color var(--duration-fast) linear;

  &:hover {
    border-color: var(--color-text);
    background: var(--color-surface);
  }
`;

const DisciplineCard = ({ group, index }: { group: IServiceGroup; index: number }) => {
  const titleId = `discipline-${group.slug}`;
  return (
    <Card
      $area={AREAS[index]}
      aria-labelledby={titleId}
      data-aos="fade-up"
      data-aos-delay={String(100 + index * 90)}
    >
      <CardNumber className="number">{String(index + 1).padStart(2, "0")}</CardNumber>
      <Title id={titleId}>{group.name}</Title>
      <Description>{group.intro}</Description>
      <Tags aria-label={`${group.name} services`}>
        {group.services.map((service) => (
          <li key={service.slug}>
            <Tag href={`/services#${service.slug}`}>{service.name}</Tag>
          </li>
        ))}
      </Tags>
    </Card>
  );
};

export const WhatWeDo = () => (
  <SplitSection aria-labelledby="what-heading">
    <EdgeMark>
      <RingMark />
    </EdgeMark>
    <Grid>
      <Intro data-aos="fade-up">
        <Heading id="what-heading">One Team, Three Disciplines.</Heading>
      </Intro>
      {SERVICE_GROUPS.map((group, index) => (
        <DisciplineCard key={group.slug} group={group} index={index} />
      ))}
    </Grid>
    <EdgeMark>
      <DashMark />
    </EdgeMark>
  </SplitSection>
);
