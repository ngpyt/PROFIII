import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group bg-white border border-gray-100 rounded-xl">
      <div className="aspect-video relative">
        <img
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            {course.category}
          </Badge>
          <Badge variant="outline" className="text-gray-600 border-gray-300">
            {course.level}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            {course.duration}
          </span>
          <Button className="bg-primary hover:bg-primary/90 text-white transition-colors">
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
