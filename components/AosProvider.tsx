import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Boots Animate On Scroll once on the client and refreshes after client
 * navigations so newly mounted page sections animate correctly.
 */
export function AosProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 720,
      easing: "ease-out-cubic",
      once: true,
      offset: 48,
      disable: prefersReducedMotion,
    });
  }, []);

  useEffect(() => {
    const refresh = () => {
      AOS.refreshHard();
    };

    router.events.on("routeChangeComplete", refresh);
    return () => {
      router.events.off("routeChangeComplete", refresh);
    };
  }, [router.events]);

  return <>{children}</>;
}
