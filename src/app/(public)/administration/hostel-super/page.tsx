import AdministrationRolePage from "../[role]/page";

export const metadata = {
  title: "Hostel Administration & Superintendence | Kalyani Government Engineering College",
  description: "Student residential welfare, campus dining facilities, hall superintendence, and student life discipline at KGEC.",
};

export default function Page() {
  return <AdministrationRolePage params={Promise.resolve({ role: "hostel-super" })} />;
}
