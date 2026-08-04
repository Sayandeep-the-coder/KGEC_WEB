import AdministrationRolePage from "../[role]/page";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";

export const metadata = {
  title: "Office of the Accounts Officer | Kalyani Government Engineering College",
  description: "Fiscal planning, state budget allocation, research grant disbursements, student fees, and audit compliance at KGEC.",
};

export default function Page() {
  return <AdministrationRolePage params={Promise.resolve({ role: "accounts-officer" })} />;
}
