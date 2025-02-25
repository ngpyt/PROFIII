import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  category: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    category: "Сфера деятельности",
    question: "С кем тебе комфортнее работать?",
    options: [
      "С людьми",
      "С животными",
      "С техникой",
      "С данными и цифрами",
      "С искусством и креативными проектами",
    ],
  },
  {
    category: "Сфера деятельности",
    question: "В какой среде тебе комфортнее?",
    options: [
      "Офис, стабильность",
      "Творческая атмосфера",
      "Полевая работа, движение",
      "Работа из дома",
    ],
  },
  {
    category: "Тип мышления и сильные стороны",
    question: "Что тебе даётся лучше всего?",
    options: [
      "Анализировать, решать логические задачи",
      "Придумывать новое, креативить",
      "Общаться, помогать людям",
      "Работать руками, чинить, строить",
    ],
  },
  {
    category: "Тип мышления и сильные стороны",
    question: "Что тебе больше нравится?",
    options: [
      "Чёткие инструкции и структура",
      "Свобода, возможность импровизировать",
      "Исследования и изучение нового",
      "Работа по готовым схемам",
    ],
  },
  {
    category: "Предпочтения в работе",
    question: "Какой стиль работы тебе подходит?",
    options: [
      "Работа в команде",
      "Самостоятельная работа",
      "Комбинированный вариант",
    ],
  },
  {
    category: "Предпочтения в работе",
    question: "Что важнее в работе?",
    options: [
      "Высокая зарплата",
      "Самореализация",
      "Помощь другим",
      "Креативность и свобода",
    ],
  },
  {
    category: "Личные качества",
    question: "Насколько ты устойчив к стрессу?",
    options: ["Очень устойчив", "Средне", "Предпочитаю спокойную работу"],
  },
  {
    category: "Личные качества",
    question: "Как ты относишься к дедлайнам?",
    options: [
      "Мне комфортно работать в сжатые сроки",
      "Предпочитаю равномерную работу",
      "Люблю работать в своём темпе",
    ],
  },
  {
    category: "Личные качества",
    question: "Ты больше интроверт или экстраверт?",
    options: [
      "Интроверт (люблю работать один, в спокойной обстановке)",
      "Экстраверт (люблю командную работу, общение)",
      "Амбиверт (гибкий, зависит от ситуации)",
    ],
  },
  {
    category: "Интересы и увлечения",
    question: "Чем ты любишь заниматься в свободное время?",
    options: [
      "Читаю, изучаю новое",
      "Творю (рисую, пишу, создаю)",
      "Помогаю другим",
      "Испытываю технологии, пробую гаджеты",
      "Провожу время на природе",
    ],
  },
  // Add more questions here
];

import TestResults from "./TestResults";

const TestLayout = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const sampleCareers = [
    {
      title: "UX/UI-дизайнер",
      description:
        "Ты обладаешь отличным вкусом, интуицией и чувством пропорций. Тебе нравится работать с технологиями, и ты умеешь делать их доступными и красивыми. В этой профессии ты сможешь воплотить свои креативные идеи в реальность, помогая улучшать опыт пользователей.",
      steps: [
        "Изучить основы графического дизайна и UX-психологии",
        "Пройти курсы по Figma или Adobe XD",
        "Начать с небольших проектов для портфолио",
      ],
    },
    {
      title: "Психолог",
      description:
        "Ты — эмпатичный и чуткий человек, тебе нравится помогать людям разобраться в своих чувствах и решать их проблемы. Психология — это сфера, где ты сможешь развивать свои таланты и получать удовлетворение от того, что можешь влиять на жизнь людей.",
      steps: [
        "Пройти курсы или обучение по психологии",
        "Начать с волонтёрских программ или стажировок",
        "Развивать навыки активного слушания и консультирования",
      ],
    },
    {
      title: "Инженер-робототехник",
      description:
        "Ты любишь решать сложные задачи, работать с техникой и разбираться в том, как всё устроено. Профессия инженера-робототехника откроет тебе мир инноваций, где ты сможешь создавать технологии, меняющие будущее.",
      steps: [
        "Изучить программирование и мехатронику",
        "Освоить конструирование и моделирование роботов",
        "Поискать стажировки и начать создавать проекты",
      ],
    },
  ];

  const handleCareerSelect = (career: any) => {
    // Here you would typically save the selected career to your backend
    console.log("Selected career:", career);
  };

  if (showResults) {
    return (
      <TestResults
        careers={sampleCareers}
        onCareerSelect={handleCareerSelect}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              {questions[currentQuestion].category}
            </h2>
            <h1 className="text-2xl font-bold">
              {questions[currentQuestion].question}
            </h1>
          </div>

          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} disabled={!answers[currentQuestion]}>
              {currentQuestion === questions.length - 1 ? "Завершить" : "Далее"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestLayout;
