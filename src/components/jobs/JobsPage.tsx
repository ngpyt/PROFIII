import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobList from "./JobList";
import JobPostForm from "./JobPostForm";

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Вакансии
          </h1>

          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Поиск вакансий</TabsTrigger>
              <TabsTrigger value="post">Разместить вакансию</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              <JobList />
            </TabsContent>

            <TabsContent value="post">
              <JobPostForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
