import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Menu, Home, Calendar, Info, Phone } from "lucide-react";

const navigationItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/events", label: "رویدادهای آینده", icon: Calendar },
  { href: "#about", label: "درباره ما", icon: Info },
  { href: "#contact", label: "تماس", icon: Phone },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
            <BookOpen className="text-cafe-brown text-2xl ml-2" />
            <span className="text-xl font-bold text-cafe-brown font-serif">باشگاه کتاب کافه</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 space-x-reverse">
              {navigationItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-cafe-brown bg-cafe-cream"
                        : "text-cafe-dark hover:text-cafe-brown hover:bg-cafe-cream"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button className="bg-cafe-brown text-white hover:bg-cafe-dark-brown">
                ورود / ثبت نام
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-cafe-brown hover:text-cafe-orange">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex items-center mb-8 mt-4">
                  <BookOpen className="text-cafe-brown text-2xl ml-2" />
                  <span className="text-xl font-bold text-cafe-brown font-serif">باشگاه کتاب کافه</span>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link key={item.href} to={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-right ${
                          isActive(item.href)
                            ? "text-cafe-brown bg-cafe-cream"
                            : "text-cafe-dark hover:text-cafe-brown hover:bg-cafe-cream"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="w-4 h-4 ml-2" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  
                  <Button className="bg-cafe-brown text-white hover:bg-cafe-dark-brown mt-4">
                    ورود / ثبت نام
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}