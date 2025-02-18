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
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group border-violet-800/30 bg-violet-950/20">
      <div className="aspect-video relative">
        <img
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-muted-foreground mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {course.duration}
          </span>
          <Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
