import { Home, BarChart, Calendar, Pill, Activity, History, Heart, User } from "lucide-react";

export const navItems = {
  user: [
    { name: "Overview", path: "/user", icon: <Home size={18} /> },
    { name: "Health Stats", path: "/user/health-stats", icon: <BarChart size={18} /> },
    { name: "Appointments", path: "/user/appointments", icon: <Calendar size={18} /> },
    { name: "Medications", path: "/user/medications", icon: <Pill size={18} /> },
    { name: "Goals & Progress", path: "/user/goals", icon: <Activity size={18} /> },
    { name: "Health History", path: "/user/history", icon: <History size={18} /> },
    { name: "Wellness Programs", path: "/user/wellness", icon: <Heart size={18} /> },
  ],
  doctor: [
    { name: "Overview", path: "/doctor/overview", icon: <Home size={18} /> },
    { name: "Appointments", path: "/doctor/appointments", icon: <Calendar size={18} /> },
    { name: "Patients", path: "/doctor/patients", icon: <User size={18} /> },
  ],
  admin: [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={18} /> },
    { name: "Users", path: "/admin/users", icon: <User size={18} /> },
    { name: "Doctors", path: "/admin/doctors", icon: <User size={18} /> },
    { name: "Reports", path: "/admin/reports", icon: <BarChart size={18} /> },
  ],
};
