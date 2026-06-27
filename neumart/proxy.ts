import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/products(.*)",
  "/api/dev(.*)", // Dev test utilities protected by x-dev-secret header
]);

// In development, allow up to 24h of JWT clock skew so Playwright tests
// don't need FAPI access to refresh the 60-second session JWT.
const DEV_CLOCK_SKEW_MS =
  process.env.NODE_ENV === "development" ? 24 * 60 * 60 * 1000 : 5000;

export default clerkMiddleware(
  async (auth, req) => {
    const { userId } = await auth();

    // Admin routes: require authentication only — role check happens in the layout
    if (isAdminRoute(req) && !userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (!isPublicRoute(req) && !userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
  { clockSkewInMs: DEV_CLOCK_SKEW_MS }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
