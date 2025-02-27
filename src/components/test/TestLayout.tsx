import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestResults from "./TestResults";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "@/lib/supabase";

interface Question {
  question: string;
  options: string[];
}

const testCategories = [
  {
    id: "sphere",
    title: "Сфера",
    description: "Определи, с чем тебе комфортнее работать",
    questions: [
      {
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
        question: "В какой среде тебе комфортнее?",
        options: [
          "Офис, стабильность",
          "Творческая атмосфера",
          "Полевая работа, движение",
          "Работа из дома",
        ],
      },
    ],
  },
  {
    id: "thinking",
    title: "Мышление",
    description: "Узнай свои сильные стороны и особенности мышления",
    questions: [
      {
        question: "Что тебе даётся лучше всего?",
        options: [
          "Анализировать, решать логические задачи",
          "Придумывать новое, креативить",
          "Общаться, помогать людям",
          "Работать руками, чинить, строить",
        ],
      },
      {
        question: "Что тебе больше нравится?",
        options: [
          "Чёткие инструкции и структура",
          "Свобода, возможность импровизировать",
          "Исследования и изучение нового",
          "Работа по готовым схемам",
        ],
      },
    ],
  },
  {
    id: "preferences",
    title: "Предпочтения",
    description: "Определи, что для тебя важно в работе",
    questions: [
      {
        question: "Какой стиль работы тебе подходит?",
        options: [
          "Работа в команде",
          "Самостоятельная работа",
          "Комбинированный вариант",
        ],
      },
      {
        question: "Что важнее в работе?",
        options: [
          "Высокая зарплата",
          "Самореализация",
          "Помощь другим",
          "Креативность и свобода",
        ],
      },
    ],
  },
  {
    id: "personal",
    title: "Качества",
    description: "Узнай свои личностные особенности",
    questions: [
      {
        question: "Насколько ты устойчив к стрессу?",
        options: ["Очень устойчив", "Средне", "Предпочитаю спокойную работу"],
      },
      {
        question: "Как ты относишься к дедлайнам?",
        options: [
          "Мне комфортно работать в сжатые сроки",
          "Предпочитаю равномерную работу",
          "Люблю работать в своём темпе",
        ],
      },
      {
        question: "Ты больше интроверт или экстраверт?",
        options: [
          "Интроверт (люблю работать один, в спокойной обстановке)",
          "Экстраверт (люблю командную работу, общение)",
          "Амбиверт (гибкий, зависит от ситуации)",
        ],
      },
    ],
  },
  {
    id: "interests",
    title: "Интересы",
    description: "Расскажи о своих хобби и увлечениях",
    questions: [
      {
        question: "Чем ты любишь заниматься в свободное время?",
        options: [
          "Читаю, изучаю новое",
          "Творю (рисую, пишу, создаю)",
          "Помогаю другим",
          "Испытываю технологии, пробую гаджеты",
          "Провожу время на природе",
        ],
      },
      {
        question: "Какие темы тебе интересны?",
        options: [
          "Технологии и наука",
          "Искусство и культура",
          "Психология и отношения",
          "Бизнес и экономика",
          "Природа и экология",
        ],
      },
    ],
  },
  {
    id: "excursions",
    title: "Экскурсии",
    description: "Выбери интересующие тебя экскурсии на предприятия",
    questions: [
      {
        question: "Какие предприятия тебе интересно посетить?",
        options: [
          "IT-компании",
          "Производственные предприятия",
          "Медицинские учреждения",
          "Творческие студии",
          "Научные лаборатории",
        ],
      },
      {
        question: "Что тебе хотелось бы увидеть на экскурсии?",
        options: [
          "Рабочий процесс специалистов",
          "Оборудование и технологии",
          "Организацию работы компании",
          "Возможности для стажировки",
        ],
      },
    ],
  },
];

const TestLayout = () => {
  const [activeTab, setActiveTab] = useState("sphere");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, Record<number, string>>
  >({});
  const [showResults, setShowResults] = useState(false);
  const { user } = useAuth();

  const activeTest = testCategories.find((test) => test.id === activeTab);
  const questions = activeTest?.questions || [];

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [activeTab]: { ...(answers[activeTab] || {}), [currentQuestion]: answer },
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If we're at the last question of the current test
      const currentIndex = testCategories.findIndex(
        (test) => test.id === activeTab,
      );
      if (currentIndex < testCategories.length - 1) {
        // Move to the next test
        setActiveTab(testCategories[currentIndex + 1].id);
        setCurrentQuestion(0);
      } else {
        // We've completed all tests
        saveResults();
        setShowResults(true);
      }
    }
  };

  const saveResults = async () => {
    if (user) {
      try {
        const { error } = await supabase.from("test_results").insert({
          user_id: user.id,
          results: answers,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error saving test results:", error);
      }
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

  if (showResults) {
    return (
      <TestResults
        careers={sampleCareers}
        onCareerSelect={(career) => {
          console.log("Selected career:", career);
          // Here you would save the selected career to the user's profile
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Найди своё я</h1>
          <p className="text-lg text-gray-600 mb-8">
            Пройди данные тесты и узнай кто ты
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-2xl mx-auto"
        >
          <TabsList className="grid grid-cols-6 mb-8 text-xs md:text-sm">
            {testCategories.map((test) => (
              <TabsTrigger key={test.id} value={test.id}>
                {test.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {testCategories.map((test) => (
            <TabsContent key={test.id} value={test.id}>
              <Card className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">{test.title}</h2>
                  <p className="text-gray-600">{test.description}</p>
                </div>

                {questions.length > 0 && (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">
                        {questions[currentQuestion].question}
                      </h3>

                      <RadioGroup
                        value={answers[activeTab]?.[currentQuestion] || ""}
                        onValueChange={handleAnswer}
                        className="space-y-4"
                      >
                        {questions[currentQuestion].options.map(
                          (option, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option}
                                id={`option-${index}`}
                              />
                              <Label htmlFor={`option-${index}`}>
                                {option}
                              </Label>
                            </div>
                          ),
                        )}
                      </RadioGroup>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Вопрос {currentQuestion + 1} из {questions.length}
                      </div>
                      <Button
                        onClick={handleNext}
                        disabled={!answers[activeTab]?.[currentQuestion]}
                      >
                        {currentQuestion === questions.length - 1 &&
                        activeTab ===
                          testCategories[testCategories.length - 1].id
                          ? "Завершить"
                          : "Далее"}
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TestLayout;
