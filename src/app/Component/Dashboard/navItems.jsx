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
  PlusSquare,
  Clipboard,
  MessageCircle,
  Thermometer,
  MessageCircleCode,
} from "lucide-react";

export const navItems = {
  user: [
    { name: "Overview", path: "/dashboard/user", icon: <Home size={18} /> },
    { name: "Health Stats", path: "/dashboard/user/health-stats", icon: <BarChart size={18} /> },
    { name: "Appointments", path: "/dashboard/user/appointments", icon: <Calendar size={18} /> },
    { name: "Medications", path: "/dashboard/user/medications", icon: <Pill size={18} /> },
    { name: "Goals & Progress", path: "/dashboard/user/goals", icon: <Activity size={18} /> },
    { name: "Report Analyzer", path: "/dashboard/user/report-analyzer", icon: <Clipboard size={24} /> },
    { name: "Chat With doctor", path: "/dashboard/user/doctor-chat", icon: <MessageCircle size={24} /> },
    { name: "Symptoms Analyzer", path: "/dashboard/user/symptoms-analyzer", icon: <Thermometer size={24} /> },
    { name: "Donate", path: "/dashboard/user/add-donor", icon: <Thermometer size={24} /> },
  ],
  doctor: [
    { name: "Overview", path: "/dashboard/doctor", icon: <Home size={18} /> },
    {
      name: "Appointments",
      path: (doctorId) => `/dashboard/doctor/${doctorId}/appointments`,
      icon: <Calendar size={18} />,
    },
    {
      name: "Availability",
      path: (doctorId) => `/dashboard/doctor/${doctorId}/available-time-slot`,
      icon: <Clock size={18} />,
    },
    {
      name: "Patients",
      path: (doctorId) => `/dashboard/doctor/${doctorId}/patients`,
      icon: <Users size={18} />,
    },
    {
      name: "Create Post",
      path: "/dashboard/doctor/doctors-social-post",
      icon: <PlusSquare size={18} />,
    },
    {
      name: "Chat with Users",
      path: "/dashboard/doctor/messages",
      icon: <MessageCircleCode size={18} />,
    },
  ],
  admin: [
    {
      name: "Dashboard Overview",
      path: "/dashboard/admin",
      icon: <BarChart size={18} />,
    },
    {
      name: "Users",
      path: "/dashboard/admin/users",
      icon: <Users size={18} />,
    },
    {
      name: "Doctors",
      path: "/dashboard/admin/doctors",
      icon: <User size={18} />,
    },
    {
      name: "Reports",
      path: "/dashboard/admin/reports",
      icon: <FileText size={18} />,
    },
    {
      name: "Doctor Approval",
      path: "/dashboard/admin/doctor-approval",
      icon: <CheckCircle2 size={18} />,
    },
    // {
    //   name: "Add Fitness Info",
    //   path: "/dashboard/admin/add-fitness-info",
    //   icon: <CheckCircle2 size={18} />,
    // },
    {
      name: "Add Gym Plans",
      path: "/dashboard/admin/add-gym-plans",
      icon: <CheckCircle2 size={18} />,
    },
    {
      name: "Add Yoga Technique",
      path: "/dashboard/admin/add-yoga-technique",
      icon: <CheckCircle2 size={18} />,
    },
  ],
};
