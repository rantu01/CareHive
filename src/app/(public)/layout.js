import { Toaster } from "react-hot-toast";
import HospitalAIAssistant from "../Component/Ai-Chat-BOT/HospitalAIAssistant";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import Notifications from "../Component/Notifications";
import LogoLoader from "../Component/LogoLoader";

export default function PublicLayout({ children }) {
  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{
        background: "var(--dashboard-bg)",
        color: "var(--text-color-all)",
      }}
    >
      <LogoLoader />
      <Notifications />
      <Toaster />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <HospitalAIAssistant />
      <Footer />
    </div>
  );
}
