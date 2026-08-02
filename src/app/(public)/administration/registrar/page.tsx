import AdministrationRolePage from "../[role]/page";

export const metadata = {
  title: "Office of the Registrar | Kalyani Government Engineering College",
  description: "Academic governance, university coordination, statutory compliance, student records, and institutional administration at KGEC.",
};

export default function Page() {
  return <AdministrationRolePage params={Promise.resolve({ role: "registrar" })} />;
}
