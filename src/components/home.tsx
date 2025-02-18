import HeroSection from "./HeroSection";
import BenefitsGrid from "./BenefitsGrid";
import QuestionnairePreview from "./QuestionnairePreview";
import Navbar from "./Navbar";
import TestimonialSection from "./TestimonialSection";
import RecommendedCourses from "./RecommendedCourses";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsGrid />
      <QuestionnairePreview />
      <RecommendedCourses />
      <TestimonialSection />
    </div>
  );
}

export default Home;
