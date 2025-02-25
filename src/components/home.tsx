import HeroSection from "./HeroSection";
import BenefitsGrid from "./BenefitsGrid";
import TestimonialSection from "./TestimonialSection";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsGrid />
      <TestimonialSection />
    </div>
  );
}

export default Home;
