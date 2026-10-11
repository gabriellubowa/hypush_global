import { Seo } from "../components/layout/Seo";
import METADATA from "../constants/metadata";
import dynamic from "next/dynamic";
import React from "react";

/**
 * Code-split the puzzle so the 404 document + SEO shell can paint first.
 * SSR stays on so crawlers and first HTML still include the board.
 */
const NotFoundGame = dynamic(
  () => import("../components/not-found/NotFoundGame").then((mod) => mod.NotFoundGame),
  {
    ssr: true,
    loading: () => (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "var(--color-background)",
          color: "var(--color-text)",
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(2.5rem, 10vw, 3.5rem)",
          fontWeight: 600,
          letterSpacing: "-0.06em",
        }}
      >
        404
      </div>
    ),
  },
);

export default function NotFound() {
  return (
    <>
      <Seo title="404" metadata={METADATA.NOT_FOUND_PAGE} />
      <NotFoundGame />
    </>
  );
}
