import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";


export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
