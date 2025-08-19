import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RegistrationModal from "@/components/registration-modal";
import { formatPersianDate } from "@/lib/persian-utils";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  UserPlus, 
  ArrowRight,
  BookOpen,
  LogIn
} from "lucide-react";
import type { Event } from "@shared/schema";

export default function EventDetail() {
  const [, params] = useRoute("/events/:id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { toast } = useToast();

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleRegistrationClick = () => {
    if (!user) {
      setShowLoginMessage(true);
      toast({
        title: "ورود مورد نیاز است",
        description: "لطفاً ابتدا ثبت‌نام و ورود کنید، سپس می‌توانید در رویداد شرکت کنید.",
        variant: "destructive",
      });
      return;
    }
    setIsModalOpen(true);
  };
  
  const { data: event, isLoading } = useQuery<Event & { registrationCount: number }>({
    queryKey: ["/api/events", params?.id],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cafe-caramel mx-auto mb-4"></div>
          <p className="text-cafe-mocha dark:text-cafe-warm-white">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-cafe-caramel opacity-50" />
          <h2 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4">
            رویداد پیدا نشد
          </h2>
          <p className="text-cafe-rich-brown dark:text-cafe-latte mb-6">
            رویداد مورد نظر وجود ندارد یا حذف شده است.
          </p>
          <Link to="/events">
            <Button className="bg-cafe-warm-gradient text-white">
              <ArrowRight className="w-4 h-4 ml-2" />
              بازگشت به رویدادها
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isEventFull = event.registrationCount >= event.capacity;
  const isEventPast = new Date(event.date) < new Date();
  const eventLocation = ["کافه نادری", "کافه چای خونه", "کافه گاندی", "کافه کتاب", "کافه رستگار"][parseInt(event.id) % 5];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "رمان کلاسیک":
      case "ادبیات کلاسیک":
        return "bg-cafe-sage text-white";
      case "شعر معاصر":
      case "شعر کلاسیک":
        return "bg-cafe-caramel text-white";
      case "رمان معاصر":
        return "bg-cafe-cinnamon text-white";
      case "ادبیات عرفانی":
        return "bg-cafe-golden text-cafe-espresso";
      case "حماسه":
        return "bg-cafe-mocha text-white";
      case "ادبیات کودک و نوجوان":
        return "bg-cafe-latte text-cafe-espresso";
      default:
        return "bg-cafe-rich-brown text-white";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back Button */}
          <Link to="/events">
            <Button variant="ghost" className="mb-6 text-cafe-mocha dark:text-cafe-warm-white hover:bg-cafe-cream dark:hover:bg-cafe-rich-brown">
              <ArrowRight className="w-4 h-4 ml-2" />
              بازگشت به رویدادها
            </Button>
          </Link>

          {/* Event Header */}
          <Card className="bg-white dark:bg-cafe-mocha rounded-2xl shadow-lg mb-8">
            {event.imageUrl && (
              <div className="w-full h-64 rounded-t-2xl overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge
                      className={`px-4 py-2 text-sm font-medium rounded-full ${getCategoryColor(event.category)}`}
                    >
                      {event.category}
                    </Badge>
                    <span className="text-cafe-rich-brown dark:text-cafe-latte">
                      {formatPersianDate(new Date(event.date))}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">
                    {event.bookTitle}
                  </h1>
                  
                  <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte mb-6">
                    نویسنده: {event.author}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-xl">
                      <Calendar className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <div>
                        <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">تاریخ</div>
                        <div className="font-medium text-cafe-mocha dark:text-cafe-warm-white">
                          {formatPersianDate(new Date(event.date))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-xl">
                      <Clock className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <div>
                        <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">ساعت</div>
                        <div className="font-medium text-cafe-mocha dark:text-cafe-warm-white persian-numbers">
                          {event.time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-xl">
                      <MapPin className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <div>
                        <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">مکان</div>
                        <div className="font-medium text-cafe-mocha dark:text-cafe-warm-white">
                          {eventLocation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-80">
                  <Card className="bg-cafe-cream dark:bg-cafe-espresso border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 ml-2 text-cafe-caramel" />
                          <span className="text-cafe-mocha dark:text-cafe-warm-white font-medium">ظرفیت</span>
                        </div>
                        <span className="text-cafe-mocha dark:text-cafe-warm-white font-bold persian-numbers">
                          {event.registrationCount}/{event.capacity} نفر
                        </span>
                      </div>
                      
                      <div className="w-full bg-white dark:bg-cafe-mocha rounded-full h-2 mb-6">
                        <div 
                          className="bg-cafe-caramel h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(event.registrationCount / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      
                      {isEventPast ? (
                        <Button disabled className="w-full py-3">
                          رویداد برگزار شده
                        </Button>
                      ) : isEventFull ? (
                        <Button disabled className="w-full py-3">
                          ظرفیت تکمیل است
                        </Button>
                      ) : (
                        <Button
                          onClick={handleRegistrationClick}
                          className="w-full bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 py-3"
                          data-testid="button-register"
                        >
                          <UserPlus className="w-5 h-5 ml-2" />
                          ثبت نام در این جلسه
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login Required Message */}
          {showLoginMessage && (
            <Alert className="mb-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <LogIn className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                لطفاً ابتدا ثبت‌نام و ورود کنید، سپس می‌توانید در رویداد شرکت کنید.
                <div className="mt-3 space-x-2 space-x-reverse">
                  <Link to="/login">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" data-testid="link-login">
                      ورود
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" data-testid="link-register">
                      ثبت نام
                    </Button>
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Event Description */}
          <Card className="bg-white dark:bg-cafe-mocha rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                درباره این جلسه
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed text-lg">
                {event.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </>
  );
}