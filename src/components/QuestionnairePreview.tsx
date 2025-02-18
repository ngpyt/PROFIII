import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sampleQuestions = [
  "В каком классе или на каком курсе вы учитесь?",
  "Какие предметы вам больше всего нравятся?",
  "Чем вы любите заниматься в свободное время?",
];

const QuestionnairePreview = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-fuchsia-950/40 via-violet-950/40 to-indigo-950/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Простой путь к вашей будущей карьере
          </h2>
          <p className="text-muted-foreground text-lg">
            Ответьте на несколько вопросов и получите персональные рекомендации
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6 bg-background">
          <div className="space-y-6">
            {sampleQuestions.map((question, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/30">
                <p className="font-medium">{question}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg">Пройти анкетирование</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuestionnairePreview;
