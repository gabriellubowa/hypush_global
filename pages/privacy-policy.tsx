import { useEffect } from "react";
import { useRouter } from "next/router";

/** Legacy path → /privacy */
export default function PrivacyPolicyRedirect() {
  const router = useRouter();
  useEffect(() => {
    void router.replace("/privacy");
  }, [router]);
  return null;
}
