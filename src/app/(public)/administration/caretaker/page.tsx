import AdministrationRolePage from "../[role]/page";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";

export const metadata = {
  title: "Campus Caretaker & Estate Management | Kalyani Government Engineering College",
  description: "Campus physical infrastructure maintenance, utilities management, civil amenities, and campus estate upkeep at KGEC.",
};

export default function Page() {
  return <AdministrationRolePage params={Promise.resolve({ role: "caretaker" })} />;
}
