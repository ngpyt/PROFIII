import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "../auth/AuthProvider";

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
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const handleCareerSelect = async (career: Career) => {
    setSelectedCareer(career.title);
    onCareerSelect(career);

    if (user) {
      try {
        const { error } = await supabase.from("user_careers").insert({
          user_id: user.id,
          career_title: career.title,
          selected_at: new Date().toISOString(),
        });

        if (error) throw error;

        // Navigate to career roadmap after a short delay
        setTimeout(() => {
          navigate("/career-roadmap");
        }, 1000);
      } catch (error) {
        console.error("Error saving career selection:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Вот кем ты можешь стать!</h1>
          <p className="text-lg text-gray-600">
            На основе твоих ответов мы подобрали профессии, которые идеально
            подходят тебе. Выбери ту, которая тебе нравится больше всего!
          </p>
        </div>

        <div className="space-y-8">
          {careers.map((career, index) => (
            <Card key={index} className="p-6 bg-white relative overflow-hidden">
              {selectedCareer === career.title && (
                <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-bl-lg flex items-center gap-1">
                  <Check className="w-4 h-4" /> Выбрано
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-4">{career.title}</h2>
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
                onClick={() => handleCareerSelect(career)}
                className="w-full gap-2"
                disabled={selectedCareer === career.title}
              >
                {selectedCareer === career.title
                  ? "Подходит!"
                  : "Выбрать этот путь"}
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
