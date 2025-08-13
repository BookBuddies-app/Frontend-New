import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookOpen, 
  Menu, 
  Home, 
  Calendar, 
  Info, 
  Phone, 
  LogIn, 
  UserPlus,
  User
} from "lucide-react";

const navigationItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/events", label: "رویدادهای آینده", icon: Calendar },
  { href: "/about", label: "درباره ما", icon: Info },
  { href: "/contact", label: "تماس", icon: Phone },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white dark:bg-cafe-espresso shadow-lg sticky top-0 z-50 border-b border-cafe-cream dark:border-cafe-mocha">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity group">
            <BookOpen className="text-cafe-mocha dark:text-cafe-caramel text-3xl ml-3 group-hover:text-cafe-caramel dark:group-hover:text-cafe-golden transition-colors" />
            <span className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif group-hover:text-cafe-caramel dark:group-hover:text-cafe-golden transition-colors">
              باشگاه کتاب کافه
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 ${
                      isActive(item.href)
                        ? "text-cafe-warm-white bg-cafe-caramel shadow-lg"
                        : "text-cafe-rich-brown dark:text-cafe-latte hover:text-cafe-warm-white hover:bg-cafe-cinnamon dark:hover:bg-cafe-mocha"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white transition-all duration-300 px-5 py-2.5 rounded-xl font-medium"
                  >
                    <LogIn className="w-4 h-4 ml-2" />
                    ورود
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 px-5 py-2.5 rounded-xl font-medium">
                    <UserPlus className="w-4 h-4 ml-2" />
                    ثبت نام
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-cafe-mocha dark:text-cafe-caramel hover:text-cafe-caramel dark:hover:text-cafe-golden">
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] bg-white dark:bg-cafe-espresso border-l border-cafe-cream dark:border-cafe-mocha">
                <div className="flex items-center mb-10 mt-6">
                  <BookOpen className="text-cafe-mocha dark:text-cafe-caramel text-3xl ml-3" />
                  <span className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">باشگاه کتاب کافه</span>
                </div>
                
                <div className="flex flex-col space-y-5">
                  {navigationItems.map((item) => (
                    <Link key={item.href} to={item.href}>
                      <Button
                        variant="ghost"
                        size="lg"
                        className={`w-full justify-start text-right px-6 py-4 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? "text-cafe-warm-white bg-cafe-caramel shadow-lg"
                            : "text-cafe-rich-brown dark:text-cafe-latte hover:text-cafe-warm-white hover:bg-cafe-cinnamon dark:hover:bg-cafe-mocha"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="w-5 h-5 ml-3" />
                        <span className="text-lg">{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                  
                  <div className="flex flex-col gap-3 mt-6">
                    <Link to="/login">
                      <Button 
                        variant="outline" 
                        className="w-full border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white transition-all duration-300 px-6 py-4 rounded-xl font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn className="w-5 h-5 ml-2" />
                        ورود
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button 
                        className="w-full bg-cafe-warm-gradient text-white hover:shadow-lg px-6 py-4 rounded-xl font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserPlus className="w-5 h-5 ml-2" />
                        ثبت نام
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}