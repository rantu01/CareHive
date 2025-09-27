import DashboardStats from "@/app/Component/DoctorsComponent/DashboardStats";
import DoctorsSchedule from "@/app/Component/DoctorsComponent/DoctorsSchedule ";
import Header from "@/app/Component/DoctorsComponent/Header";
import PerformanceAndActions from "@/app/Component/DoctorsComponent/PerformanceAndActions";


export default function DoctorDashboard() {
  return (
    <div>
      <Header />
      <DashboardStats />
      <DoctorsSchedule />
      <PerformanceAndActions />
    </div>
  );
}
