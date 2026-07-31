import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";

type AuditAction = "create" | "update" | "delete" | "grant" | "revoke";

interface AuditLogEntry {
  adminId: string;
  adminEmail: string;
  action: AuditAction;
  resource: string;
  resourceId?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Writes a row to the audit_log table. Fire-and-forget safe — errors
 * are logged but never thrown to the caller.
 */
export async function writeAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await db.insert(auditLog).values({
      adminId: entry.adminId,
      adminEmail: entry.adminEmail,
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId ?? null,
      metadata: entry.metadata ?? null,
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}
