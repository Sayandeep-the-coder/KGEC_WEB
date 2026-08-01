import DepartmentsClient from "./DepartmentsClient";

export const metadata = {
  title: "Academic Departments | Kalyani Government Engineering College",
  description: "Explore the undergraduate and postgraduate engineering departments at KGEC.",
};

export default function DepartmentsIndexPage() {
  return <DepartmentsClient />;
}
