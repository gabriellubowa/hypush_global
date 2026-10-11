import { useEffect } from "react";
import { useRouter } from "next/router";

/** Legacy path → /terms */
export default function TermsOfServiceRedirect() {
  const router = useRouter();
  useEffect(() => {
    void router.replace("/terms");
  }, [router]);
  return null;
}
