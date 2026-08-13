import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { alumni } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import AlumniClient, { AlumniMember } from "./AlumniClient";

export const metadata: Metadata = {
  title: "Alumni Network | Kalyani Government Engineering College",
  description: "Connect with the global KGEC Alumni Network.",
};

const getCachedAlumniList = unstable_cache(
  async () => {
    try {
      const dbRows = await db.select().from(alumni).orderBy(desc(alumni.batchYear));
      return dbRows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.currentRole,
        category: r.category,
        highlight: r.bio || r.company,
        batchYear: r.batchYear,
        department: r.department,
        company: r.company,
        location: r.location,
        linkedinUrl: r.linkedinUrl,
        photoUrl: r.photoUrl,
      }));
    } catch (err) {
      console.warn("Database connection failed for alumni page, serving empty list:", err);
      return [];
    }
  },
  ["alumni-page"],
  { revalidate: 3600, tags: ["alumni"] }
);

export default async function AlumniPage() {
  const alumniData = await getCachedAlumniList();

  return <AlumniClient initialAlumni={alumniData} />;
}
