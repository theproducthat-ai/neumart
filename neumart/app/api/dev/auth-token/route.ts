import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const ALLOWED_USER_IDS = [
  "user_3FIyF9TExoIqwe6cSfJClu6C7fF", // admin
  "user_3Ff3rJQJvzbpzluRvbrbX7afciB", // qa customer
];

export async function POST(req: Request): Promise<NextResponse> {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const secret = req.headers.get("x-dev-secret");
  if (secret !== "playwright-qa-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = (await req.json()) as { userId: string };
  if (!ALLOWED_USER_IDS.includes(userId)) {
    return NextResponse.json({ error: "User not allowed" }, { status: 403 });
  }

  const clerk = await clerkClient();
  const result = await clerk.signInTokens.createSignInToken({
    userId,
    expiresInSeconds: 300,
  });

  return NextResponse.json({ token: result.token });
}
