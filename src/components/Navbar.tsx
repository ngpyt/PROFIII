import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { AuthModal } from "./auth/AuthModal";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  return (
    <div className="border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <Link to="/" className="font-bold text-xl">
            ПрофИИ
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-6">
            <NavigationMenuItem>
              <Link to="/" className="text-sm font-medium">
                Главная
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/jobs" className="text-sm font-medium">
                Вакансии
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/career-roadmap" className="text-sm font-medium">
                Карьерный план
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    />
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/profile">
                  <DropdownMenuItem>Профиль</DropdownMenuItem>
                </Link>
                <Link to="/career-roadmap">
                  <DropdownMenuItem>Карьерный план</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Мои курсы</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setShowAuthModal(true)}>Войти</Button>
          )}
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
