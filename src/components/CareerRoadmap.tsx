import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Briefcase, Trophy } from "lucide-react";
import CareerPath from "./career/CareerPath";

const sampleData = {
  courses: [
    {
      title: "Основы UX/UI дизайна",
      provider: "Coursera",
      duration: "8 недель",
      type: "Онлайн",
      link: "https://coursera.org",
    },
    {
      title: "Figma для начинающих",
      provider: "Udemy",
      duration: "4 недели",
      type: "Онлайн",
      link: "https://udemy.com",
    },
    {
      title: "Практикум по веб-дизайну",
      provider: "Яндекс Практикум",
      duration: "3 месяца",
      type: "Онлайн + практика",
      link: "https://practicum.yandex.ru",
    },
  ],
  jobs: [
    {
      title: "Junior UX/UI Designer",
      company: "IT Solutions",
      location: "Москва",
      salary: "от 60 000 ₽",
    },
    {
      title: "Младший дизайнер интерфейсов",
      company: "Digital Agency",
      location: "Удаленно",
      salary: "от 50 000 ₽",
    },
  ],
  universities: [
    {
      name: "Московский Политехнический Университет",
      program: "Графический дизайн и мультимедиа",
      degree: "Бакалавриат",
      duration: "4 года",
      location: "Москва",
    },
    {
      name: "НИУ ВШЭ",
      program: "Дизайн и программирование",
      degree: "Бакалавриат",
      duration: "4 года",
      location: "Москва",
    },
  ],
};

import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { supabase } from "@/lib/supabase";

const CareerRoadmap = () => {
  const { user } = useAuth();
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("is_student")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setIsStudent(data?.is_student ?? false);
        });
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Ваш карьерный путь
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            На основе ваших интересов и навыков мы разработали персональный план
            развития
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <CareerPath
            courses={sampleData.courses}
            jobs={sampleData.jobs}
            universities={sampleData.universities}
            isStudent={isStudent}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
