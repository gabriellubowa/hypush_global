import { Footer } from "./Footer";
import { Header } from "./Header";
import { IMetadata } from "../../constants/metadata";
import { NewsTicker } from "./NewsTicker";
import React from "react";
import { Seo } from "./Seo";
import styled from "styled-components";

/*
 * AMW site chrome order:
 *   1. sticky black <header>
 *   2. news ticker directly below the header
 *   3. <main> page content
 */

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Page = styled.div<{ $fullBleed?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  max-width: ${(props) => (props.$fullBleed ? "none" : "var(--page-max-width)")};
  min-height: 100px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    margin: ${(props) => (props.$fullBleed ? "0" : "0 var(--margins-lg)")};
    width: ${(props) => (props.$fullBleed ? "100%" : "auto")};
  }
`;

const Main = styled.main`
  width: 100%;
`;

const FooterWrap = styled.div`
  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 var(--margins-lg);
`;

interface Props {
  title?: string;
  metadata?: IMetadata;
  /** Edge-to-edge main content (roster grids). Footer stays constrained. */
  fullBleed?: boolean;
  jsonLd?: ReadonlyArray<Record<string, unknown>>;
  /** Schema.org WebPage subtype, e.g. AboutPage / ContactPage / CollectionPage. */
  pageType?: string;
  children: React.ReactNode;
}

export const SiteLayout = ({
  title,
  metadata,
  fullBleed = false,
  jsonLd,
  pageType,
  children,
}: Props) => (
  <Shell>
    <Seo title={title} metadata={metadata} jsonLd={jsonLd} pageType={pageType} />
    {/* Exact AMW placement: header first, ticker below header */}
    <Header />
    <NewsTicker />
    <Page $fullBleed={fullBleed}>
      <Main>{children}</Main>
      {fullBleed ? (
        <FooterWrap>
          <Footer />
        </FooterWrap>
      ) : (
        <Footer />
      )}
    </Page>
  </Shell>
);
