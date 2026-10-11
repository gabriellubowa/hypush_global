import METADATA from "../constants/metadata";
import { PageIntro } from "../components/PageIntro";
import { ProjectForm } from "../components/project-form/ProjectForm";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";
import styled from "styled-components";

// Split screen on desktop: a sticky intro panel on the left, the form on the
// right. Below 1024px the two stack, intro first.
const DESKTOP = "@media (min-width: 1024px)";

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  ${DESKTOP} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
`;

const IntroColumn = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  background: var(--color-card);

  ${DESKTOP} {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    padding: clamp(2.5rem, 1rem + 3vw, 4.5rem);
    border-radius: 0;
  }
`;

const FormColumn = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0.25rem;

  ${DESKTOP} {
    min-height: 100vh;
    min-height: 100svh;
    padding: clamp(2.5rem, 1rem + 3vw, 4.5rem);
  }
`;

export default function Quote() {
  return (
    <SiteLayout title="Get a Quote" metadata={METADATA.QUOTE_PAGE}>
      <Split>
        <IntroColumn aria-label="About this form">
          <PageIntro
            variant="split"
            eyebrow="Quote"
            title="Let's Work Around Your Budget."
            lead="Tell us about the music, what you need and what you're working with. We'll review it and come back with a proposal. Three quick steps."
          />
        </IntroColumn>
        <FormColumn aria-label="Project request form" data-aos="fade-up" data-aos-delay="100">
          <ProjectForm />
        </FormColumn>
      </Split>
    </SiteLayout>
  );
}
