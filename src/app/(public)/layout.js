import HospitalAIAssistant from "../Component/Ai-Chat-BOT/HospitalAIAssistant";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

export default function PublicLayout({ children }) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "var(--dashboard-bg)",
        color: "var(--fourground-color)",
      }}
    >
      <Navbar />
      <main className="flex-grow">{children}</main>
      <HospitalAIAssistant/>
      <Footer />
    </div>
  );
}
