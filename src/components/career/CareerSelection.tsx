import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const careers = [
  {
    title: "UX/UI-дизайнер",
    description:
      "Создание удобных и красивых интерфейсов для цифровых продуктов",
  },
  {
    title: "Frontend-разработчик",
    description: "Разработка пользовательских интерфейсов для веб-приложений",
  },
  {
    title: "Backend-разработчик",
    description: "Разработка серверной части веб-приложений",
  },
  {
    title: "Data Scientist",
    description: "Анализ данных и создание моделей машинного обучения",
  },
  {
    title: "DevOps-инженер",
    description: "Автоматизация процессов разработки и развертывания",
  },
  {
    title: "Product Manager",
    description: "Управление развитием цифровых продуктов",
  },
  // Add more careers as needed
];

const CareerSelection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCareerSelect = (career: (typeof careers)[0]) => {
    // Here you would typically save the selected career to your backend
    navigate("/career-roadmap");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Выберите специальность
          </h1>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск специальности..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4">
            {filteredCareers.map((career, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {career.title}
                    </h3>
                    <p className="text-gray-600">{career.description}</p>
                  </div>
                  <Button onClick={() => handleCareerSelect(career)}>
                    Выбрать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSelection;
