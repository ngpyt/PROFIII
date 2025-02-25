import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Career {
  title: string;
  description: string;
  steps: string[];
}

interface TestResultsProps {
  careers: Career[];
  onCareerSelect: (career: Career) => void;
}

const TestResults = ({ careers, onCareerSelect }: TestResultsProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Вот кем ты можешь стать!</h1>
          <p className="text-lg text-gray-600">
            На основе твоих ответов мы подобрали три профессии, которые идеально
            подходят тебе
          </p>
        </div>

        <div className="space-y-8">
          {careers.map((career, index) => (
            <Card key={index} className="p-6 bg-white">
              <h2 className="text-2xl font-semibold mb-4">
                {`${index + 1}️⃣ ${career.title}`}
              </h2>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Что тебе нужно знать:</h3>
                <p className="text-gray-600">{career.description}</p>
              </div>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Что тебе стоит сделать:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {career.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => {
                  onCareerSelect(career);
                  navigate("/career-roadmap");
                }}
                className="w-full gap-2"
              >
                Выбрать этот путь
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestResults;
