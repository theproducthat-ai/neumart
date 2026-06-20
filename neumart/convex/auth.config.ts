const clerkFrontendApiUrl = process.env.CLERK_FRONTEND_API_URL;

if (!clerkFrontendApiUrl) {
  throw new Error(
    "Missing CLERK_FRONTEND_API_URL environment variable. " +
      "Set it to your Clerk Frontend API URL (e.g. https://<your-instance>.clerk.accounts.dev)."
  );
}

export default {
  providers: [
    {
      domain: clerkFrontendApiUrl,
      applicationID: "convex",
    },
  ],
};
