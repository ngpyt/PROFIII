import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    isStudent: boolean,
  ) => Promise<void>;
  signUpEmployer: (
    email: string,
    password: string,
    companyName: string,
    industry: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isEmployer: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkIfEmployer(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkIfEmployer(session.user.id);
      } else {
        setIsEmployer(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfEmployer = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("employer_profiles")
        .select("id")
        .eq("id", userId)
        .single();

      setIsEmployer(!!data);
    } catch (error) {
      setIsEmployer(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    isStudent: boolean,
  ) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          email,
          is_student: isStudent,
          education_level: isStudent ? "school" : "graduated",
          is_employer: false,
        },
      ]);

      if (profileError) {
        // If profile creation fails, delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }
    }
  };

  const signUpEmployer = async (
    email: string,
    password: string,
    companyName: string,
    industry: string,
  ) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // Create employer profile
      const { error: profileError } = await supabase
        .from("employer_profiles")
        .insert([
          {
            id: authData.user.id,
            email,
            company_name: companyName,
            industry,
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        // If profile creation fails, delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }

      setIsEmployer(true);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signUp,
        signUpEmployer,
        signOut,
        isEmployer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
