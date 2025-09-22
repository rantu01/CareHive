// app/user/page.jsx

import UserDashboard from "@/app/(All Page Here)/user-dashboard/page";
import DashboardLayout from "@/app/Component/Dashboard/DashboardLayout";



export default function UserDashboardPage() {
  return (
    <DashboardLayout role="user">

      <UserDashboard/>
    
    </DashboardLayout>
  );
}
