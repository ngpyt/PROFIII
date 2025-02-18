import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Briefcase, Trophy } from "lucide-react";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: any;
  status: "current" | "upcoming" | "completed";
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "Основы Python",
    description:
      "Изучите основы программирования на Python, включая синтаксис, типы данных и базовые алгоритмы",
    duration: "8 недель",
    icon: GraduationCap,
    status: "current",
  },
  {
    id: 2,
    title: "Продвинутый Python",
    description:
      "Углубленное изучение Python: ООП, работа с данными, веб-фреймворки",
    duration: "12 недель",
    icon: Trophy,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Junior Python Developer",
    description: "Начните карьеру как младший Python-разработчик в IT-компании",
    duration: "Полная занятость",
    icon: Briefcase,
    status: "upcoming",
  },
];

const CareerRoadmap = () => {
  return (
    <div className="min-h-screen bg-violet-950/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ваш карьерный путь</h1>
          <p className="text-muted-foreground text-lg mb-8">
            На основе ваших интересов и навыков мы разработали персональный план
            развития
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {roadmapSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {index !== roadmapSteps.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-1 bg-primary/20" />
              )}
              <Card
                className={`p-6 mb-8 border-${step.status === "current" ? "primary" : "violet-800/30"} bg-violet-950/20`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`p-3 rounded-full ${step.status === "current" ? "bg-primary text-primary-foreground" : "bg-violet-900/50"}`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    {step.status === "current" && (
                      <Button className="gap-2">
                        Начать обучение
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
