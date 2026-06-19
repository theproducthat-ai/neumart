"use client";

import { ConvexProviderWithClerk as ConvexWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexProviderWithClerk({ children }: { children: React.ReactNode }) {
  return (
    <ConvexWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexWithClerk>
  );
}
