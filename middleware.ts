import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_ORIGIN = "https://hypush.co";

/**
 * Keep the public site on hypush.co only. Vercel’s automatic *.vercel.app
 * aliases stay deployed for internal use, but visitors are sent to the
 * canonical domain so the preview hostname is not a second public surface.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (!host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    CANONICAL_ORIGIN,
  );
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
