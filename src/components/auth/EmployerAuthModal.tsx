import { useState } from "react";
import { useAuth } from "./AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EmployerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmployerAuthModal({ isOpen, onClose }: EmployerAuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const { signIn, signUpEmployer } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUpEmployer(email, password, companyName, industry);
      }
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isLogin ? "Вход для работодателя" : "Регистрация работодателя"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName">Название компании</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Отрасль</Label>
                <RadioGroup
                  value={industry}
                  onValueChange={setIndustry}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="IT" id="it" />
                    <Label htmlFor="it">IT и технологии</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manufacturing" id="manufacturing" />
                    <Label htmlFor="manufacturing">Производство</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="education" id="education" />
                    <Label htmlFor="education">Образование</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Другое</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}
          <div className="flex flex-col gap-2">
            <Button type="submit">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Создать аккаунт работодателя" : "Уже есть аккаунт?"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
