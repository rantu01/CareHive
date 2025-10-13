import ContactSection from "../Component/ContactSection";
import DailyWellnessCheckIn from "../Component/DailyWellnessCheckIn";
import FeaturedServices from "../Component/FeaturedServices";
import Hero from "../Component/Hero";
import HowItWork from "../Component/HowItWork";
import MoodBasedHealth from "../Component/MoodBasedHealth";
import Testimonial from "../Component/Testimonial";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedServices></FeaturedServices>
      <HowItWork></HowItWork>
      <ContactSection></ContactSection>
      <Testimonial></Testimonial>
      <MoodBasedHealth></MoodBasedHealth>
      <DailyWellnessCheckIn></DailyWellnessCheckIn>
    </div>
  );
}
