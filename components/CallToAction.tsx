import { BRAND } from "../constants/brand";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const StyledBand = styled.section`
  position: relative;
  width: 100%;
  margin: var(--margins-xxl) 0 var(--margins-lg);
  padding: clamp(2rem, 1rem + 4vw, 4.5rem);
  background: var(--color-text);
  color: var(--color-background);
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: -60px;
    top: -60px;
    width: 220px;
    height: 220px;
    border: 28px solid var(--color-accent);
    border-radius: 50%;
    opacity: 0.9;
  }

  h2 {
    position: relative;
    z-index: 1;
    max-width: 16ch;
    color: var(--color-background);
  }

  p {
    position: relative;
    z-index: 1;
    max-width: 48ch;
    margin: var(--margins-md) 0 var(--margins-xl);
    color: var(--color-background);
    opacity: 0.8;
  }
`;

const Actions = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--margins-md);
`;

export const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01em;
  transition: transform var(--duration-fast) var(--ease-out-expo),
    box-shadow var(--duration-fast) linear;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px -12px var(--color-accent);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GhostButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 13px 25px;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-weight: 600;
  font-size: 15px;
  transition: background-color var(--duration-fast) linear,
    color var(--duration-fast) linear;

  &:hover {
    background: var(--color-background);
    color: var(--color-text);
  }
`;

export const CallToAction = () => (
  <StyledBand aria-labelledby="cta-heading" data-aos="fade-up">
    <h2 id="cta-heading">Got a Release Coming Up?</h2>
    <p>
      Tell us about the music, the date and the goal. We will come back with a
      plan and a written quote.
    </p>
    <Actions>
      <PrimaryButton href={BRAND.CONTACT_URL}>
        {BRAND.CONTACT_LABEL} <span aria-hidden="true">→</span>
      </PrimaryButton>
      <GhostButton href="/services">See All Services</GhostButton>
    </Actions>
  </StyledBand>
);
