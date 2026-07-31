import { NextResponse } from "next/server";

export function handleApiError(error: unknown, routeContext: string) {
  // Always log full detailed error server-side for debugging
  console.error(`[API Error] ${routeContext}:`, error);

  // Return a generic client message to prevent internal stack trace or DB structure leaks
  return NextResponse.json(
    {
      error: "An unexpected error occurred while processing your request. Please try again later.",
    },
    { status: 500 }
  );
}
