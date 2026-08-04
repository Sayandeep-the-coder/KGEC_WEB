import AdministrationRolePage from "../[role]/page";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";

export const metadata = {
  title: "Hostel Administration & Superintendence | Kalyani Government Engineering College",
  description: "Student residential welfare, campus dining facilities, hall superintendence, and student life discipline at KGEC.",
};

export default function Page() {
  return <AdministrationRolePage params={Promise.resolve({ role: "hostel-super" })} />;
}
