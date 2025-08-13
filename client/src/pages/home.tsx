import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EventCard from "@/components/event-card";
import { Link } from "wouter";
import { BookOpen, Calendar, Users, Coffee } from "lucide-react";
import type { Event } from "@shared/schema";

export default function Home() {
  const { data: upcomingEvents, isLoading } = useQuery<(Event & { registrationCount: number })[]>({
    queryKey: ["/api/events/upcoming"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cafe-cream min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-cafe-brown mb-6 font-serif">
            باشگاه کتاب کافه
          </h1>
          <p className="text-lg md:text-xl text-cafe-dark-brown mb-8 max-w-3xl mx-auto leading-relaxed">
            جایی دنج برای عاشقان کتاب. هر هفته در فضایی گرم و صمیمی دور هم جمع می‌شویم تا درباره کتاب‌های جذاب گفتگو کنیم و قهوه‌ای خوشمزه بنوشیم.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/events">
              <Button size="lg" className="bg-cafe-brown hover:bg-cafe-dark-brown text-white px-8 py-3 text-lg">
                <Calendar className="w-5 h-5 ml-2" />
                مشاهده رویدادها
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-cafe-brown text-cafe-brown hover:bg-cafe-brown hover:text-white px-8 py-3 text-lg"
            >
              <BookOpen className="w-5 h-5 ml-2" />
              درباره ما بیشتر بدانید
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cafe-brown mb-4 font-serif">رویدادهای آینده</h2>
            <p className="text-lg text-cafe-dark max-w-2xl mx-auto">
              به باشگاه کتاب ما بپیوندید و در جلسات هفتگی شرکت کنید
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-t-xl" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-6 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-16 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents?.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/events">
              <Button className="bg-cafe-orange hover:bg-orange-600 text-white px-8 py-3">
                <Calendar className="w-5 h-5 ml-2" />
                مشاهده همه رویدادها
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-cafe-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-cafe-brown mb-6 font-serif">درباره باشگاه کتاب کافه</h2>
              <p className="text-lg text-cafe-dark mb-6 leading-relaxed">
                باشگاه کتاب کافه مکانی است برای عاشقان کتاب که می‌خواهند در فضایی گرم و دوستانه درباره کتاب‌های مورد علاقه‌شان صحبت کنند. ما هر هفته در کافه دنجی جمع می‌شویم تا با نوشیدن قهوه‌ای خوشمزه، درباره آثار ادبی بحث و تبادل نظر کنیم.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="text-cafe-brown text-xl ml-3" />
                  <span className="text-cafe-dark">انواع مختلف کتاب: رمان، شعر، داستان کوتاه</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-cafe-brown text-xl ml-3" />
                  <span className="text-cafe-dark">جمع کوچک و صمیمی (حداکثر ۱۵ نفر)</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="text-cafe-brown text-xl ml-3" />
                  <span className="text-cafe-dark">فضای گرم و دنج کافه</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-cafe-brown text-xl ml-3" />
                  <span className="text-cafe-dark">جلسات هفتگی منظم</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Book Club Discussion"
                className="rounded-xl shadow-lg w-full h-auto"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cafe-brown font-serif persian-numbers">۲۰۰+</div>
                  <div className="text-sm text-cafe-dark">عضو فعال</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-cafe-brown">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 font-serif">از جدیدترین رویدادها باخبر شوید</h2>
          <p className="text-cafe-cream text-lg mb-8">
            ایمیل خود را وارد کنید تا از برنامه‌های جدید باشگاه کتاب مطلع شوید
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="آدرس ایمیل شما"
              className="flex-1 px-4 py-3 rounded-lg text-cafe-dark focus:ring-2 focus:ring-cafe-orange focus:outline-none"
              required
            />
            <Button
              type="submit"
              className="bg-cafe-orange hover:bg-orange-600 text-white px-6 py-3"
            >
              عضویت
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
