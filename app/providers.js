// app/providers.js
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init("phc_WVM4sxPaeFIR5BhZ4L1lvB67z2ch0bspv7ZlJKzzjrE", {
    api_host: "https://eu.posthog.com",
  });
}
export function CSPostHogProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
