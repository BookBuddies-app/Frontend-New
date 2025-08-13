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
      <section className="relative bg-cafe-gradient dark:bg-cafe-espresso min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-cafe-espresso dark:text-cafe-warm-white mb-8 font-serif leading-tight">
            باشگاه کتاب کافه
          </h1>
          <p className="text-xl md:text-2xl text-cafe-rich-brown dark:text-cafe-latte mb-12 max-w-4xl mx-auto leading-relaxed">
            جایی دنج برای عاشقان کتاب. هر هفته در فضایی گرم و صمیمی دور هم جمع می‌شویم تا درباره کتاب‌های جذاب گفتگو کنیم و قهوه‌ای خوشمزه بنوشیم.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/events">
              <Button size="lg" className="bg-cafe-warm-gradient hover:shadow-xl hover:scale-105 transition-all duration-300 text-white px-10 py-4 text-xl rounded-xl">
                <Calendar className="w-6 h-6 ml-3" />
                مشاهده رویدادها
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-cafe-mocha dark:border-cafe-caramel text-cafe-mocha dark:text-cafe-caramel hover:bg-cafe-mocha hover:text-white dark:hover:bg-cafe-caramel dark:hover:text-cafe-espresso px-10 py-4 text-xl rounded-xl transition-all duration-300"
            >
              <BookOpen className="w-6 h-6 ml-3" />
              درباره ما بیشتر بدانید
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white dark:bg-cafe-espresso">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">رویدادهای آینده</h2>
            <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte max-w-3xl mx-auto leading-relaxed">
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

          <div className="text-center mt-16">
            <Link to="/events">
              <Button className="bg-cafe-caramel hover:bg-cafe-cinnamon hover:shadow-lg hover:scale-105 transition-all duration-300 text-white px-10 py-4 text-lg rounded-xl">
                <Calendar className="w-6 h-6 ml-3" />
                مشاهده همه رویدادها
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-cafe-cream dark:bg-cafe-mocha">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-cafe-espresso dark:text-cafe-warm-white mb-8 font-serif">درباره باشگاه کتاب کافه</h2>
              <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte mb-8 leading-relaxed">
                باشگاه کتاب کافه مکانی است برای عاشقان کتاب که می‌خواهند در فضایی گرم و دوستانه درباره کتاب‌های مورد علاقه‌شان صحبت کنند. ما هر هفته در کافه دنجی جمع می‌شویم تا با نوشیدن قهوه‌ای خوشمزه، درباره آثار ادبی بحث و تبادل نظر کنیم.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center group hover:bg-white dark:hover:bg-cafe-espresso p-4 rounded-xl transition-colors">
                  <BookOpen className="text-cafe-caramel text-2xl ml-4 group-hover:text-cafe-cinnamon transition-colors" />
                  <span className="text-cafe-rich-brown dark:text-cafe-latte text-lg">انواع مختلف کتاب: رمان، شعر، داستان کوتاه</span>
                </div>
                <div className="flex items-center group hover:bg-white dark:hover:bg-cafe-espresso p-4 rounded-xl transition-colors">
                  <Users className="text-cafe-caramel text-2xl ml-4 group-hover:text-cafe-cinnamon transition-colors" />
                  <span className="text-cafe-rich-brown dark:text-cafe-latte text-lg">جمع کوچک و صمیمی (حداکثر ۱۵ نفر)</span>
                </div>
                <div className="flex items-center group hover:bg-white dark:hover:bg-cafe-espresso p-4 rounded-xl transition-colors">
                  <Coffee className="text-cafe-caramel text-2xl ml-4 group-hover:text-cafe-cinnamon transition-colors" />
                  <span className="text-cafe-rich-brown dark:text-cafe-latte text-lg">فضای گرم و دنج کافه</span>
                </div>
                <div className="flex items-center group hover:bg-white dark:hover:bg-cafe-espresso p-4 rounded-xl transition-colors">
                  <Calendar className="text-cafe-caramel text-2xl ml-4 group-hover:text-cafe-cinnamon transition-colors" />
                  <span className="text-cafe-rich-brown dark:text-cafe-latte text-lg">جلسات هفتگی منظم</span>
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
      <section className="py-20 bg-cafe-warm-gradient">
        <div className="max-w-5xl mx-auto text-center px-6 sm:px-8 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">از جدیدترین رویدادها باخبر شوید</h2>
          <p className="text-cafe-warm-white text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            ایمیل خود را وارد کنید تا از برنامه‌های جدید باشگاه کتاب مطلع شوید
          </p>
          
          <form className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="آدرس ایمیل شما"
              className="flex-1 px-6 py-4 rounded-xl text-cafe-rich-brown text-lg focus:ring-2 focus:ring-cafe-golden focus:outline-none shadow-lg"
              required
            />
            <Button
              type="submit"
              className="bg-white text-cafe-cinnamon hover:bg-cafe-golden hover:text-white hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg rounded-xl font-medium"
            >
              عضویت
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
