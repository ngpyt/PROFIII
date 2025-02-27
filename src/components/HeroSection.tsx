import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { AuthModal } from "./auth/AuthModal";
import { useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleTestClick = () => {
    if (user) {
      navigate("/test");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleCareerClick = () => {
    if (user) {
      navigate("/career-roadmap");
    } else {
      setShowAuthModal(true);
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xl mb-6">
          Найди своё я
        </h1>
        <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Пройди данные тесты и узнай кто ты
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full gap-2"
            onClick={handleTestClick}
          >
            Вперёд к призванию
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={handleCareerClick}
          >
            Я уже знаю, кем хочу быть
          </Button>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
