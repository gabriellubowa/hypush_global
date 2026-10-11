import React, { ReactNode } from "react";
import styled from "styled-components";

type Variant = "page" | "split";

const StyledIntro = styled.header<{ $variant: Variant }>`
  width: 100%;
  padding: ${(props) => (props.$variant === "split" ? "0" : "var(--margins-xxl) 0 var(--margins-xl)")};
  border-bottom: ${(props) => (props.$variant === "split" ? "none" : "1px solid var(--color-border-accordion)")};
  margin-bottom: ${(props) => (props.$variant === "split" ? "0" : "var(--margins-xl)")};
`;

export const Eyebrow = styled.p`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin: 0 0 var(--margins-md);

  &::before {
    content: "";
    display: inline-block;
    width: 28px;
    height: 3px;
    margin-right: 12px;
    vertical-align: middle;
    background: var(--color-accent);
  }
`;

// The split variant is the large, tightly set headline of a split-screen page.
const StyledTitle = styled.h1<{ $variant: Variant }>`
  font-size: ${(props) => (props.$variant === "split" ? "clamp(3rem, 1.4rem + 4.2vw, 6.25rem)" : "var(--text-hero)")};
  font-weight: 600;
  line-height: ${(props) => (props.$variant === "split" ? "0.9" : "0.95")};
  letter-spacing: ${(props) => (props.$variant === "split" ? "-0.055em" : "-0.035em")};
  margin: 0;
`;

/** White-on-accent block for a punchy phrase inside a PageIntro title. */
export const TitleMark = styled.span`
  display: inline;
  padding: 0.06em 0.18em 0.08em;
  margin: 0 -0.04em;
  color: var(--color-on-accent);
  background: var(--color-accent);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
`;

const StyledLead = styled.p`
  font-size: var(--text-lead);
  color: var(--color-secondary);
  max-width: 56ch;
  margin: var(--margins-lg) 0 0;
`;

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  variant?: Variant;
}

export const PageIntro = ({ variant = "page", ...props }: Props) => (
  <StyledIntro $variant={variant} data-aos="fade-up">
    {props.eyebrow && <Eyebrow>{props.eyebrow}</Eyebrow>}
    <StyledTitle $variant={variant}>{props.title}</StyledTitle>
    {props.lead && <StyledLead>{props.lead}</StyledLead>}
  </StyledIntro>
);
