import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Menu, 
  Home, 
  Calendar, 
  Info, 
  Phone, 
  LogIn, 
  UserPlus,
  User,
  LogOut,
  Settings
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);

  // Mock user login state - in real implementation this would come from context/auth
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

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
              باشگاه کافه کتاب
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-4 xl:gap-6">
              {navigationItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-300 hover:scale-105 ${
                      isActive(item.href)
                        ? "text-cafe-warm-white bg-cafe-caramel shadow-lg"
                        : "text-cafe-rich-brown dark:text-cafe-latte hover:text-cafe-warm-white hover:bg-cafe-cinnamon dark:hover:bg-cafe-mocha"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Auth Section */}
              <div className="flex items-center gap-2 xl:gap-3">
                {isLoggedIn && user ? (
                  <div className="flex items-center gap-2">
                    <Link to="/profile">
                      <Button variant="ghost" className="flex items-center gap-2 p-2 hover:bg-cafe-cream dark:hover:bg-cafe-mocha rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-cafe-caramel text-white font-bold">
                            {user.fullName.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-cafe-rich-brown dark:text-cafe-latte hidden xl:inline">
                          {user.fullName.split(' ')[0]}
                        </span>
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleLogout}
                      className="text-cafe-rich-brown dark:text-cafe-latte hover:text-red-600 p-2 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white transition-all duration-300 px-3 xl:px-4 py-2 rounded-lg font-medium text-sm"
                      >
                        <LogIn className="w-4 h-4 ml-1 xl:ml-2" />
                        <span className="hidden sm:inline">ورود</span>
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button 
                        size="sm"
                        className="bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 px-3 xl:px-4 py-2 rounded-lg font-medium text-sm"
                      >
                        <UserPlus className="w-4 h-4 ml-1 xl:ml-2" />
                        <span className="hidden sm:inline">ثبت نام</span>
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-cafe-mocha dark:text-cafe-caramel hover:text-cafe-caramel dark:hover:text-cafe-golden">
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] bg-white dark:bg-cafe-espresso border-l border-cafe-cream dark:border-cafe-mocha">
                <div className="flex items-center mb-10 mt-6">
                  <BookOpen className="text-cafe-mocha dark:text-cafe-caramel text-3xl ml-3" />
                  <span className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">باشگاه کافه کتاب</span>
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
                    {isLoggedIn && user ? (
                      <>
                        <Link to="/profile">
                          <Button 
                            variant="outline"
                            className="w-full border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white transition-all duration-300 px-6 py-4 rounded-xl font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            <User className="w-5 h-5 ml-2" />
                            پروفایل من
                          </Button>
                        </Link>
                        <Button 
                          variant="outline"
                          className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 px-6 py-4 rounded-xl font-medium"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="w-5 h-5 ml-2" />
                          خروج
                        </Button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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