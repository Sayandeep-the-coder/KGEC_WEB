import { NextResponse } from "next/server";

export function handleApiError(error: unknown, routeContext: string) {
  // Always log full detailed error server-side for debugging
  console.error(`[API Error] ${routeContext}:`, error);

  // Return a generic client message to prevent internal stack trace or DB structure leaks in production
  const isDev = process.env.NODE_ENV !== "production";
  const errorMessage = isDev && error instanceof Error 
    ? error.message 
    : "An unexpected error occurred while processing your request. Please try again later.";
    
  return NextResponse.json(
    {
      error: errorMessage,
      ...(isDev && { details: String(error) })
    },
    { status: 500 }
  );
}
