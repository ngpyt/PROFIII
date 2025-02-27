import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Building, MapPin, Users, Mail, Phone, Globe } from "lucide-react";
import JobPostForm from "../jobs/JobPostForm";
import { Badge } from "@/components/ui/badge";

interface EmployerProfile {
  id: string;
  company_name: string;
  industry: string;
  description: string;
  location: string;
  website: string;
  contact_email: string;
  contact_phone: string;
  employees_count: string;
  logo_url: string;
}

const defaultProfile: EmployerProfile = {
  id: "",
  company_name: "",
  industry: "",
  description: "",
  location: "",
  website: "",
  contact_email: "",
  contact_phone: "",
  employees_count: "",
  logo_url: "",
};

const EmployerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<EmployerProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    if (user) {
      fetchEmployerProfile();
      fetchPostedJobs();
    }
  }, [user]);

  const fetchEmployerProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("employer_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching employer profile:", error);
    }
  };

  const fetchPostedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPostedJobs(data || []);
    } catch (error) {
      console.error("Error fetching posted jobs:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async () => {
    try {
      const { error } = await supabase.from("employer_profiles").upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Профиль работодателя
        </h1>

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Профиль компании</TabsTrigger>
            <TabsTrigger value="jobs">Мои вакансии</TabsTrigger>
            <TabsTrigger value="post">Разместить вакансию</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            {!isEditing ? (
              <Card className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {profile.logo_url ? (
                        <img
                          src={profile.logo_url}
                          alt={profile.company_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {profile.company_name || "Название компании"}
                      </h2>
                      <Badge variant="secondary" className="mt-1">
                        {profile.industry || "Отрасль не указана"}
                      </Badge>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>
                    Редактировать
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">О компании</h3>
                    <p className="text-gray-600">
                      {profile.description || "Описание компании не добавлено"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>
                        {profile.location || "Местоположение не указано"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>
                        {profile.employees_count ||
                          "Количество сотрудников не указано"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{profile.contact_email || user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>
                        {profile.contact_phone || "Телефон не указан"}
                      </span>
                    </div>
                    {profile.website && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <a
                          href={
                            profile.website.startsWith("http")
                              ? profile.website
                              : `https://${profile.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-semibold mb-6">
                  Редактирование профиля
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Название компании</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        value={profile.company_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Отрасль</Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={profile.industry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Местоположение</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employees_count">
                        Количество сотрудников
                      </Label>
                      <Input
                        id="employees_count"
                        name="employees_count"
                        value={profile.employees_count}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_email">Email для связи</Label>
                      <Input
                        id="contact_email"
                        name="contact_email"
                        type="email"
                        value={profile.contact_email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_phone">Телефон для связи</Label>
                      <Input
                        id="contact_phone"
                        name="contact_phone"
                        value={profile.contact_phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Веб-сайт</Label>
                      <Input
                        id="website"
                        name="website"
                        value={profile.website}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo_url">URL логотипа</Label>
                      <Input
                        id="logo_url"
                        name="logo_url"
                        value={profile.logo_url}
                        onChange={handleInputChange}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">О компании</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={profile.description}
                      onChange={handleInputChange}
                      rows={5}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Отмена
                    </Button>
                    <Button onClick={saveProfile}>Сохранить</Button>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <Card className="p-6 bg-white shadow-lg rounded-xl">
              <h2 className="text-xl font-semibold mb-6">Мои вакансии</h2>
              {postedJobs.length > 0 ? (
                <div className="space-y-4">
                  {postedJobs.map((job) => (
                    <Card key={job.id} className="p-4 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-gray-600 text-sm">
                            {job.location} • {job.salary}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {job.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Редактировать
                          </Button>
                          <Button variant="destructive" size="sm">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  У вас пока нет размещенных вакансий. Перейдите на вкладку
                  "Разместить вакансию", чтобы создать новую.
                </p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="post" className="mt-6">
            <JobPostForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerProfile;
