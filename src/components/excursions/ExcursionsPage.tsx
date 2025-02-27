import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Building } from "lucide-react";
import { useState } from "react";

interface Excursion {
  id: string;
  company: string;
  title: string;
  description: string;
  location: string;
  date: string;
  spots: number;
  category: string;
  image: string;
}

const sampleExcursions: Excursion[] = [
  {
    id: "1",
    company: "Яндекс",
    title: "Экскурсия в офис Яндекса",
    description:
      "Познакомьтесь с работой крупнейшей IT-компании России, узнайте о процессе разработки продуктов и карьерных возможностях.",
    location: "Москва",
    date: "15 июня 2023",
    spots: 20,
    category: "IT-компании",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
  },
  {
    id: "2",
    company: "НИИ Микроэлектроники",
    title: "Посещение лаборатории микроэлектроники",
    description:
      "Увидите процесс создания микрочипов, познакомитесь с инженерами и узнаете о перспективах развития отрасли.",
    location: "Санкт-Петербург",
    date: "22 июня 2023",
    spots: 15,
    category: "Научные лаборатории",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa",
  },
  {
    id: "3",
    company: "Студия анимации 'Мельница'",
    title: "Как создаются мультфильмы",
    description:
      "Экскурсия в студию анимации, где вы увидите процесс создания мультфильмов от идеи до готового продукта.",
    location: "Москва",
    date: "30 июня 2023",
    spots: 12,
    category: "Творческие студии",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279",
  },
];

const ExcursionsPage = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredExcursions = filter
    ? sampleExcursions.filter((excursion) => excursion.category === filter)
    : sampleExcursions;

  const categories = Array.from(
    new Set(sampleExcursions.map((e) => e.category)),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Экскурсии на предприятия</h1>
          <p className="text-lg text-gray-600 mb-8">
            Посети интересующие тебя компании и узнай больше о профессиях
            изнутри
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            onClick={() => setFilter(null)}
            className="mb-2"
          >
            Все
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExcursions.map((excursion) => (
            <Card
              key={excursion.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group bg-white border border-gray-100 rounded-xl"
            >
              <div className="aspect-video relative">
                <img
                  src={excursion.image}
                  alt={excursion.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2 bg-primary/90">
                  {excursion.category}
                </Badge>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  <Building className="w-4 h-4" />
                  <span>{excursion.company}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {excursion.title}
                </h3>
                <p className="text-gray-600 mb-4">{excursion.description}</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{excursion.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{excursion.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>Осталось мест: {excursion.spots}</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white transition-colors">
                  Записаться
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcursionsPage;
