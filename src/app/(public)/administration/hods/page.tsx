import AdministrationRolePage from "../[role]/page";

export const metadata = {
  title: "Heads of Academic Departments (HODs) | Kalyani Government Engineering College",
  description: "Academic leadership across Computer Science, Information Technology, ECE, EE, Mechanical, MCA, and M.Tech at KGEC.",
};

export default function Page() {
  return <AdministrationRolePage params={Promise.resolve({ role: "hods" })} />;
}
