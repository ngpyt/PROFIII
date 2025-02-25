import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, MapPin, Calendar } from "lucide-react";

interface Course {
  title: string;
  provider: string;
  duration: string;
  type: string;
  link: string;
}

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
}

interface University {
  name: string;
  program: string;
  degree: string;
  duration: string;
  location: string;
}

interface CareerPathProps {
  courses: Course[];
  jobs: Job[];
  universities?: University[];
  isStudent: boolean;
}

const CareerPath = ({
  courses,
  jobs,
  universities,
  isStudent,
}: CareerPathProps) => {
  return (
    <div className="space-y-8">
      {isStudent && universities && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Где учиться
          </h2>
          <div className="grid gap-4">
            {universities.map((uni, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{uni.name}</h3>
                    <p className="text-gray-600 mb-2">{uni.program}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {uni.degree}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {uni.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {uni.location}
                      </span>
                    </div>
                  </div>
                  <Button>Подробнее</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Рекомендуемые курсы
        </h2>
        <div className="grid gap-4">
          {courses.map((course, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-2">{course.provider}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{course.type}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                </div>
                <Button asChild>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Записаться
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Вакансии
        </h2>
        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="font-medium text-primary">
                      {job.salary}
                    </span>
                  </div>
                </div>
                <Button>Откликнуться</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerPath;
