import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Анна",
    role: "Студентка",
    content:
      "Благодаря Проф-ИИ я нашла свое призвание в веб-разработке и уже начала стажировку в IT-компании.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
  },
  {
    name: "Михаил",
    role: "Школьник",
    content:
      "Платформа помогла мне определиться с выбором университета и направления обучения. Теперь я точно знаю, куда поступать.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    name: "Елена",
    role: "Выпускница",
    content:
      "Проф-ИИ предложил мне курсы, которые идеально подошли для развития в выбранной профессии.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
  },
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-violet-950/40 via-fuchsia-950/30 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Истории успеха</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
