"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function UserSync() {
  const { isSignedIn } = useUser();
  const ensureCurrentUser = useMutation(api.users.ensureCurrentUser);

  useEffect(() => {
    if (isSignedIn) {
      ensureCurrentUser().catch(() => {});
    }
  }, [isSignedIn, ensureCurrentUser]);

  return null;
}
