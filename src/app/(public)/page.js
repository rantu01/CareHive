import ContactSection from "../Component/ContactSection";
import DailyWellnessCheckIn from "../Component/DailyWellnessCheckIn";
import FeaturedServices from "../Component/FeaturedServices";
import Hero from "../Component/Hero";
import HowItWork from "../Component/HowItWork";
import MoodBasedHealth from "../Component/MoodBasedHealth";
import NutritionAdvisor from "../Component/NutritionAdvisor";
import RecipeOfTheDay from "../Component/RecipeOfTheDay";
import Testimonial from "../Component/Testimonial";
import WellnessSection from "../Component/WellnessSection";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedServices></FeaturedServices>
      <HowItWork></HowItWork>
      <Testimonial></Testimonial>
      <WellnessSection></WellnessSection>
      <RecipeOfTheDay></RecipeOfTheDay>
      <NutritionAdvisor></NutritionAdvisor>
      <ContactSection></ContactSection>
    </div>
  );
}
