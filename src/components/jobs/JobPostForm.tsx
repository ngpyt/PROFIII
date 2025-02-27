import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(2, "Введите название вакансии"),
  company: z.string().min(2, "Введите название компании"),
  location: z.string().min(2, "Укажите город"),
  description: z.string().min(10, "Опишите требования и обязанности"),
  salary: z.string().min(1, "Укажите зарплату"),
  tags: z.array(z.string()).min(1, "Добавьте хотя бы один тег"),
});

const JobPostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
    },
  });

  const [currentTag, setCurrentTag] = useState("");
  const tags = form.watch("tags");

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      form.setValue("tags", [...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.from("jobs").insert([
        {
          ...values,
          experience: "1-3 года", // Default value
          created_by: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);
      if (error) throw error;

      // Reset form
      form.reset();
      // You might want to show a success message or redirect
    } catch (error) {
      console.error("Error posting job:", error);
      // You might want to show an error message
    }
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto bg-white shadow-lg border border-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Разместить вакансию
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название вакансии</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Python-разработчик (junior+)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Компания</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ООО Центр цифрового развития"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Город</FormLabel>
                <FormControl>
                  <Input placeholder="Красноярск" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Зарплата</FormLabel>
                <FormControl>
                  <Input placeholder="от 80 000 до 120 000 руб." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание вакансии</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Требования, обязанности, условия работы"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Теги</FormLabel>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Добавить тег"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button type="button" onClick={addTag}>
                Добавить
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Опубликовать вакансию
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default JobPostForm;
