import {
  Home,
  BarChart,
  Calendar,
  Pill,
  Activity,
  ClipboardList,
  MessageCircle,
  HeartHandshake,
  FileHeart,
  Stethoscope,
  Users,
  Clock,
  PlusSquare,
  FileText,
  CheckCircle2,
  Dumbbell,
  Clipboard,
  MessageCircleCode,
  User,
  StretchHorizontal, 
} from "lucide-react";

export const navItems = {
  user: [
    { name: "Overview", path: "/dashboard/user", icon: <Home size={18} /> },
    { name: "Health Stats", path: "/dashboard/user/health-stats", icon: <BarChart size={18} /> },
    { name: "Appointments", path: "/dashboard/user/appointments", icon: <Calendar size={18} /> },
    { name: "Medications", path: "/dashboard/user/medications", icon: <Pill size={18} /> },
    { name: "Goals & Progress", path: "/dashboard/user/goals", icon: <Activity size={18} /> },
    { name: "Report Analyzer", path: "/dashboard/user/report-analyzer", icon: <ClipboardList size={18} /> },
    { name: "Chat With Doctor", path: "/dashboard/user/doctor-chat", icon: <MessageCircle size={18} /> },
    { name: "Donate", path: "/dashboard/user/add-donor", icon: <HeartHandshake size={18} /> },
    { name: "eHealth Report", path: "/dashboard/user/ehealth-report", icon: <FileHeart size={18} /> },
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
    {
      name: "Reports",
      path: "/dashboard/doctor/reports",
      icon: <Clipboard size={18} />,
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
      icon: <Stethoscope size={18} />,
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
    {
      name: "Add Gym Plans",
      path: "/dashboard/admin/add-gym-plans",
      icon: <Dumbbell size={18} />,
    },
    {
      name: "Add Yoga Technique",
      path: "/dashboard/admin/add-yoga-technique",
      icon: <StretchHorizontal size={18} />, // ✅ replaced Yoga
    },
  ],
};
