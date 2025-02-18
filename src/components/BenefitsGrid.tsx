import { Brain, GraduationCap, Briefcase, Target } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "ИИ-анализ",
    description:
      "Умный анализ ваших интересов и способностей для точных рекомендаций",
  },
  {
    icon: GraduationCap,
    title: "Образование",
    description:
      "Подбор учебных заведений и курсов, соответствующих вашим целям",
  },
  {
    icon: Briefcase,
    title: "Карьера",
    description:
      "Актуальные вакансии и стажировки для студентов по выбранной специальности",
  },
  {
    icon: Target,
    title: "Развитие",
    description: "Персональный план развития навыков и компетенций",
  },
];

const BenefitsGrid = () => {
  return (
    <div className="py-16 bg-violet-950/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card text-card-foreground hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <benefit.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsGrid;
