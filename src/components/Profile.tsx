import ProfileForm from "./ProfileForm";
import EnrolledCourses from "./EnrolledCourses";

const Profile = () => {
  return (
    <div className="min-h-screen bg-violet-950/30 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Ваш профиль</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Заполните информацию о себе, чтобы получать персонализированные
          рекомендации по курсам и карьерному развитию
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileForm />
          </div>
          <div>
            <EnrolledCourses />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
