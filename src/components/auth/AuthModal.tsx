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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, isStudent);
      }
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? "Вход" : "Регистрация"}</DialogTitle>
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
            <div className="space-y-2">
              <Label>Вы школьник?</Label>
              <RadioGroup
                value={isStudent ? "yes" : "no"}
                onValueChange={(value) => setIsStudent(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Да</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">Нет</Label>
                </div>
              </RadioGroup>
            </div>
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
              {isLogin ? "Создать аккаунт" : "Уже есть аккаунт?"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
