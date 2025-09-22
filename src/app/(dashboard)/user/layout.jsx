import DashboardLayout from "@/app/Component/Dashboard/DashboardLayout";


export default function UserLayout({ children }) {
  return <DashboardLayout role="user">{children}</DashboardLayout>;
}

