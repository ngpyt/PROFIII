import CourseCard, { Course } from "./CourseCard";

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Основы веб-разработки",
    description: "Изучите HTML, CSS и JavaScript с нуля",
    duration: "8 недель",
    level: "Начинающий",
    category: "Программирование",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: "2",
    title: "UI/UX Дизайн",
    description: "Создавайте привлекательные и удобные интерфейсы",
    duration: "6 недель",
    level: "Средний",
    category: "Дизайн",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
  {
    id: "3",
    title: "Data Science",
    description: "Анализ данных и машинное обучение",
    duration: "12 недель",
    level: "Продвинутый",
    category: "Аналитика",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
];

const RecommendedCourses = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Рекомендуемые курсы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedCourses;
