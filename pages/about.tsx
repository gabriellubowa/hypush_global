import { BRAND } from "../constants/brand";
import Link from "next/link";
import METADATA from "../constants/metadata";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";

const CAPABILITIES = [
  {
    kicker: "Audience Growth",
    body: "Campaigns engineered to land coverage, radio and platforms that turn listeners into a durable following.",
  },
  {
    kicker: "Media Features",
    body: "Press pitching and media outreach so editors and journalists actually see the release — and pick it up.",
  },
  {
    kicker: "Industry Connectivity",
    body: "Access to managers, agents, A&R and supervisors when the campaign needs the right rooms opened.",
  },
  {
    kicker: "Revenue Conversion",
    body: "Plans that move from awareness to conversion: streams, tickets, merch and paying fans.",
  },
] as const;

const PILLARS = [
  {
    title: "Deep Industry Leverage",
    body: "We bypass the gatekeepers because we are the gatekeepers. Direct access to DSPs, media, and touring networks.",
  },
  {
    title: "Proprietary Tech",
    body: "We build the platforms our artists use to scale, from streaming apps to ticketing infrastructure.",
  },
  {
    title: "Ruthless Execution",
    body: "No vanity metrics. We operate on clear timelines, plain-language reporting, and measurable ROI.",
  },
] as const;

export default function About() {
  return (
    <SiteLayout title="About" metadata={METADATA.ABOUT_PAGE} fullBleed pageType="AboutPage">
      {/* Why Choose Us — The Infrastructure Advantage */}
      <section aria-labelledby="advantage-heading">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <h1
            id="advantage-heading"
            className="m-0 max-w-[16ch] text-5xl font-bold leading-[0.95] tracking-tighter text-[var(--color-text)] sm:text-6xl"
          >
            The Infrastructure Advantage.
          </h1>

          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-neutral-500 sm:text-xl dark:text-neutral-400">
            We do not run on guesswork or empty hype. We run on data, scalable
            technology, and deep industry relationships. Every campaign is
            engineered for clear, accountable execution.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-8">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="border-t-2 border-[var(--color-text)] pt-6 sm:border-l-2 sm:border-t-0 sm:pl-6 sm:pt-0"
              >
                <h2 className="m-0 p-0 text-base font-semibold tracking-tight text-[var(--color-text)] sm:text-lg">
                  {pillar.title}
                </h2>
                <p className="mt-3 mb-0 text-[15px] leading-relaxed text-[var(--color-secondary)]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4 sm:mt-16">
            <Link
              href={BRAND.CONTACT_URL}
              className="inline-flex items-center justify-center bg-black px-7 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
            >
              Start your project
            </Link>
            <Link
              href="/talents"
              className="inline-flex items-center justify-center border border-current bg-transparent px-7 py-3.5 text-[15px] font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
            >
              View our work
            </Link>
          </div>
        </div>
      </section>

      {/* Execution & Scale — 2×2 technical grid */}
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <h2 className="m-0 pb-10 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Execution &amp; Scale
        </h2>

        <div className="grid grid-cols-1 border-t border-l border-neutral-200 dark:border-neutral-800 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <article
              key={item.kicker}
              className="border-b border-r border-neutral-200 p-6 sm:p-8 dark:border-neutral-800"
            >
              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {item.kicker}
              </p>
              <p className="mt-3 mb-0 max-w-[36ch] text-[15px] leading-relaxed text-[var(--color-secondary)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
