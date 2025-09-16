
import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import Footer from "./Component/Footer";
import FeaturedServices from "./Component/FeaturedServices";
import ContactSection from "./Component/ContactSection";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <FeaturedServices></FeaturedServices>
      <ContactSection></ContactSection>
      <Footer></Footer>
      
    </div>
  );
}
