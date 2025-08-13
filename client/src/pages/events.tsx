import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EventCard from "@/components/event-card";
import type { Event } from "@shared/schema";

const categories = [
  { key: "all", label: "همه", value: "" },
  { key: "classic", label: "رمان کلاسیک", value: "رمان کلاسیک" },
  { key: "poetry", label: "شعر معاصر", value: "شعر معاصر" },
  { key: "short", label: "داستان کوتاه", value: "داستان کوتاه" },
];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: events, isLoading } = useQuery<(Event & { registrationCount: number })[]>({
    queryKey: ["/api/events"],
  });

  const filteredEvents = events?.filter(event => 
    activeCategory === "all" || event.category === categories.find(c => c.key === activeCategory)?.value
  );

  return (
    <div className="min-h-screen bg-cafe-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-cafe-brown mb-4 font-serif">همه رویدادها</h1>
          <p className="text-lg text-cafe-dark max-w-2xl mx-auto">
            تمام جلسات باشگاه کتاب را مشاهده کنید و برای شرکت ثبت نام کنید
          </p>
        </div>

        {/* Event Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "default" : "outline"}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.key
                  ? "bg-cafe-brown text-white hover:bg-cafe-dark-brown"
                  : "bg-cafe-light text-cafe-dark border-cafe-brown hover:bg-cafe-cream"
              }`}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : filteredEvents && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-cafe-dark text-lg mb-4">
              رویدادی در این دسته‌بندی یافت نشد
            </div>
            <Button
              onClick={() => setActiveCategory("all")}
              className="bg-cafe-brown hover:bg-cafe-dark-brown text-white"
            >
              مشاهده همه رویدادها
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
