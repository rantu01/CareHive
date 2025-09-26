import { Home, BarChart, Calendar, Pill, Activity, History, Heart, User } from "lucide-react";

export const navItems = {
  user: [
    { name: "Overview", path: "/dashboard/user", icon: <Home size={18} /> },
    { name: "Health Stats", path: "/dashboard/user/health-stats", icon: <BarChart size={18} /> },
    { name: "Appointments", path: "/dashboard/user/appointments", icon: <Calendar size={18} /> },
    { name: "Medications", path: "/dashboard/user/medications", icon: <Pill size={18} /> },
    { name: "Goals & Progress", path: "/dashboard/user/goals", icon: <Activity size={18} /> },
    { name: "Health History", path: "/dashboard/user/history", icon: <History size={18} /> },
    { name: "Wellness Programs", path: "/dashboard/user/wellness", icon: <Heart size={18} /> },
  ],
  doctor: [
    { name: "Overview", path: "/dashboard/doctor", icon: <Home size={18} /> },
    { name: "Appointments", path: "/dashboard/doctor/appointments", icon: <Calendar size={18} /> },
    { name: "Patients", path: "/dashboard/doctor/patients", icon: <User size={18} /> },
    { name: "Create Post", path: "/dashboard/doctor/doctors-social-post", icon: <User size={18} /> },
  ],
  admin: [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Dashboard Overview", path: "/dashboard/admin", icon: <Home size={18} /> },
    { name: "Users", path: "/dashboard/admin/users", icon: <User size={18} /> },
    { name: "Doctors", path: "/dashboard/admin/doctors", icon: <User size={18} /> },
    { name: "Reports", path: "/dashboard/admin/reports", icon: <BarChart size={18} /> },
  ],
};
