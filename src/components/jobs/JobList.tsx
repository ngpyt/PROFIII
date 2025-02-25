import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  tags: string[];
  experience: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No jobs found. Be the first to post a job!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="p-6 bg-white shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 rounded-xl"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {job.title}
              </h3>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {job.experience}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold mb-2 text-primary">
                {job.salary}
              </div>
              <Button>Откликнуться</Button>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
