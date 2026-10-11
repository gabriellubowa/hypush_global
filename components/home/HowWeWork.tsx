import { DashMark, TurningPlusMark } from "../decor/marks";
import { EdgeMark, SplitSection } from "./SplitSection";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

/*
 * "How we work" as connected steps. Mobile first: a vertical timeline with
 * numbered markers joined by a line. From 900px the same list becomes three
 * columns joined by a horizontal line.
 */

const STEPS = [
  {
    title: "Listen",
    body: "We start with the music and the goal, not a package. One call to understand who it's for and what success looks like.",
  },
  {
    title: "Plan",
    body: "A written plan with dates, channels and budget, so everyone knows what happens before, on and after release day.",
  },
  {
    title: "Push",
    body: "We run the campaign, adjust as the numbers come in, and report back in plain language.",
  },
];

const MARKER = 44; // px
const DESKTOP = "@media (min-width: 900px)";

const Body = styled.div`
  flex: 1;
  min-width: 0;

  ${DESKTOP} {
    margin: 0 var(--margins-lg);
  }
`;

const Heading = styled.h2`
  padding: 0;
  font-size: clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.05em;
`;

const Steps = styled.ol`
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 0;

  ${DESKTOP} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
    margin-top: 3.5rem;
  }
`;

const Step = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: ${MARKER}px minmax(0, 1fr);
  column-gap: 20px;
  padding-bottom: 2.25rem;

  /* Connecting line to the next step: down on mobile, across on desktop. */
  &:not(:last-child)::before {
    content: "";
    position: absolute;
    top: ${MARKER + 8}px;
    bottom: 8px;
    left: ${MARKER / 2 - 1}px;
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(var(--color-accent), var(--color-card-border));
  }

  &:last-child {
    padding-bottom: 0;
  }

  ${DESKTOP} {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 1.5rem;
    padding-bottom: 0;

    &:not(:last-child)::before {
      top: ${MARKER / 2 - 1}px;
      bottom: auto;
      left: ${MARKER + 12}px;
      right: -20px;
      width: auto;
      height: 2px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-card-border));
    }
  }
`;

// Outlined markers for listen and plan; the final "push" is solid.
const Marker = styled.span<{ $isFinal: boolean }>`
  display: grid;
  place-items: center;
  width: ${MARKER}px;
  height: ${MARKER}px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  background: ${(props) => (props.$isFinal ? "var(--color-accent)" : "var(--color-background)")};
  color: ${(props) => (props.$isFinal ? "var(--color-on-accent)" : "var(--color-text)")};
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 400;
`;

const StepText = styled.div`
  padding-top: 8px;

  h3 {
    padding: 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0.5rem 0 0;
    max-width: 42ch;
    font-size: 16px;
    line-height: 1.65;
    color: var(--color-secondary);
  }

  ${DESKTOP} {
    padding-top: 0;
  }
`;

// High-contrast CTA: solid in the text color (black on light, near-white on
// dark), full width on phones for an easy tap target.
const FaqButton = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2.5rem;
  padding: 16px 28px;
  border-radius: 12px;
  background: var(--color-text);
  color: var(--color-background);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: transform var(--duration-fast) var(--ease-out-expo), background-color var(--duration-fast) linear;

  &:hover {
    transform: translateY(-2px);
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  &:active {
    transform: translateY(0);
  }

  ${DESKTOP} {
    display: inline-flex;
    width: auto;
    margin-top: 3rem;
  }
`;

export const HowWeWork = () => (
  <SplitSection aria-labelledby="how-heading">
    <EdgeMark>
      <DashMark />
    </EdgeMark>
    <Body>
      <Heading id="how-heading" data-aos="fade-up">
        Listen. Plan. Push.
      </Heading>
      <Steps>
        {STEPS.map((step, index) => (
          <Step
            key={step.title}
            data-aos="fade-up"
            data-aos-delay={String(80 + index * 100)}
          >
            <Marker aria-hidden="true" $isFinal={index === STEPS.length - 1}>
              {index + 1}
            </Marker>
            <StepText>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </StepText>
          </Step>
        ))}
      </Steps>
      <FaqButton href="/faq" data-aos="fade-up">
        Read the FAQ
      </FaqButton>
    </Body>
    <EdgeMark>
      <TurningPlusMark />
    </EdgeMark>
  </SplitSection>
);
