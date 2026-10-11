import { CaseStudyGallery } from "../components/case-study/CaseStudyGallery";
import { PageIntro, TitleMark } from "../components/PageIntro";
import { CASE_STUDIES } from "../data/case-studies";
import METADATA from "../constants/metadata";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";

export default function CaseStudy() {
  return (
    <SiteLayout
      title="Case Study"
      metadata={METADATA.CASE_STUDY_PAGE}
      fullBleed
      pageType="CollectionPage"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-[var(--margins-lg)]">
        <PageIntro
          eyebrow="Case Study"
          title={
            <>
              Work We&apos;ve <TitleMark>Pushed.</TitleMark>
            </>
          }
          lead="Campaigns, artists and collaborations in one place. Tap any shot to open the gallery — swipe like Photos on iPhone."
        />
      </div>
      <CaseStudyGallery items={CASE_STUDIES} />
    </SiteLayout>
  );
}
