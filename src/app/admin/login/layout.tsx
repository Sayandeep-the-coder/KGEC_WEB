import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If already authenticated, redirect to admin dashboard
  if (session) {
    redirect("/admin");
  }

  return <>{children}</>;
}
