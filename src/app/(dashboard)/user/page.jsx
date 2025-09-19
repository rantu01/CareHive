// app/user/page.jsx

import UserDashboard from "@/app/Component/Dashboard/user-dashboard/[userId]/page";
import DashboardLayout from "@/app/Component/Dashboard/DashboardLayout";


export default function UserDashboardPage() {
  return (
    <DashboardLayout role="user">
      <h1 className="text-2xl font-bold">Welcome back, John!</h1>
    </DashboardLayout>
  );
}
