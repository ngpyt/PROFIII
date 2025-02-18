import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Найдите свой путь с помощью
          <span className="text-primary block">искусственного интеллекта</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Определите свое призвание, получите персонализированные рекомендации
          по образованию и карьере на основе ваших интересов и способностей
        </p>
        <Link to="/profile">
          <Button size="lg" className="gap-2">
            Начать тестирование
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
