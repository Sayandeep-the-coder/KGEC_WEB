// Utility helpers shared across route handlers

import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validates that a string is a valid UUID v4 format.
 * Returns null if valid, or a 400 NextResponse if invalid.
 */
export function validateUuid(id: string, label = "ID") {
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json(
      { error: `Invalid ${label} format. Expected a valid UUID.` },
      { status: 400 }
    );
  }
  return null;
}
