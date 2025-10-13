import { 
  Home, 
  BarChart, 
  Calendar, 
  Pill, 
  Activity, 
  User, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle2, 
  PlusSquare 
} from "lucide-react";

export const navItems = {
  user: [
    { name: "Overview", path: "/dashboard/user", icon: <Home size={18} /> },
    { name: "Health Stats", path: "/dashboard/user/health-stats", icon: <BarChart size={18} /> },
    { name: "Appointments", path: "/dashboard/user/appointments", icon: <Calendar size={18} /> },
    { name: "Medications", path: "/dashboard/user/medications", icon: <Pill size={18} /> },
    { name: "Goals & Progress", path: "/dashboard/user/goals", icon: <Activity size={18} /> },
  ],
  doctor: [
    { name: "Overview", path: "/dashboard/doctor", icon: <Home size={18} /> },
     {  name: "Availability",
     path: (doctorId) => `/dashboard/doctor/${doctorId}/available-time-slot`,
      icon: <Clock size={18} /> },
    { name: "Appointments", path: "/dashboard/doctor/appointments", icon: <Calendar size={18} /> },
    { name: "Patients", path: "/dashboard/doctor/patients", icon: <Users size={18} /> },
    { name: "Create Post", path: "/dashboard/doctor/doctors-social-post", icon: <PlusSquare size={18} /> },
  ],
  admin: [
    { name: "Dashboard Overview", path: "/dashboard/admin", icon: <BarChart size={18} /> },
    { name: "Users", path: "/dashboard/admin/users", icon: <Users size={18} /> },
    { name: "Doctors", path: "/dashboard/admin/doctors", icon: <User size={18} /> },
    { name: "Reports", path: "/dashboard/admin/reports", icon: <FileText size={18} /> },
    { name: "Doctor Approval", path: "/dashboard/admin/doctor-approval", icon: <CheckCircle2 size={18} /> },
  ],
};
