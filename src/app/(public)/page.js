import ContactSection from "../Component/ContactSection";
import FeaturedServices from "../Component/FeaturedServices";
import Hero from "../Component/Hero";
import HowItWork from "../Component/HowItWork";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedServices></FeaturedServices>
      <HowItWork></HowItWork>
      <ContactSection></ContactSection>
    </div>
  );
}
