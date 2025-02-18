import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  category: string;
  nextLesson: string;
  image: string;
}

const enrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    title: "Основы веб-разработки",
    progress: 65,
    category: "Программирование",
    nextLesson: "CSS Flexbox и Grid",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: "2",
    title: "UI/UX Дизайн",
    progress: 30,
    category: "Дизайн",
    nextLesson: "Принципы пользовательского опыта",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
];

const EnrolledCourses = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Мои курсы</h2>
      <div className="space-y-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{course.title}</h3>
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Прогресс</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Следующий урок: {course.nextLesson}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EnrolledCourses;
