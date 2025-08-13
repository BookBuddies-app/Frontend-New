import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard from "@/components/event-card";
import type { Event } from "@shared/schema";
import { Search, MapPin, Calendar, Filter, Plus } from "lucide-react";
import { Link } from "wouter";

const categories = [
  { key: "all", label: "همه", value: "" },
  { key: "classic", label: "رمان کلاسیک", value: "رمان کلاسیک" },
  { key: "contemporary", label: "رمان معاصر", value: "رمان معاصر" },
  { key: "poetry", label: "شعر معاصر", value: "شعر معاصر" },
  { key: "short", label: "داستان کوتاه", value: "داستان کوتاه" },
  { key: "history", label: "تاریخ", value: "تاریخ" },
  { key: "philosophy", label: "فلسفه", value: "فلسفه" },
  { key: "literature", label: "ادبیات", value: "ادبیات" },
];

const locations = [
  "همه مکان‌ها",
  "کافه نادری",
  "کافه چای خونه", 
  "کافه گاندی",
  "کافه کتاب",
  "کافه رستگار"
];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("همه مکان‌ها");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  
  const { data: events, isLoading } = useQuery<(Event & { registrationCount: number })[]>({
    queryKey: ["/api/events"],
  });

  const filteredEvents = events?.filter(event => {
    const matchesCategory = activeCategory === "all" || event.category === categories.find(c => c.key === activeCategory)?.value;
    const matchesSearch = !searchQuery || 
      event.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For location filtering, get location from cafe data or default to random location
    const eventLocations = ["کافه نادری", "کافه چای خونه", "کافه گاندی", "کافه کتاب", "کافه رستگار"];
    const eventLocation = eventLocations[parseInt(event.id) % eventLocations.length];
    const matchesLocation = selectedLocation === "همه مکان‌ها" || eventLocation === selectedLocation;
    
    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-cafe-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">
            رویدادهای باشگاه کتاب
          </h1>
          <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte max-w-3xl mx-auto mb-8 leading-relaxed">
            تمام جلسات باشگاه کتاب را مشاهده کنید و برای شرکت ثبت نام کنید
          </p>
          
          {/* Create Club Button for Café Owners */}
          <Link to="/create-club">
            <Button className="bg-cafe-warm-gradient text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg rounded-xl">
              <Plus className="w-5 h-5 ml-2" />
              ایجاد باشگاه جدید
            </Button>
          </Link>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown shadow-lg">
          <CardContent className="p-6">
            {/* Basic Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel w-5 h-5" />
                <Input
                  placeholder="جستجوی کتاب، نویسنده یا توضیحات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 focus:ring-cafe-caramel focus:border-cafe-caramel"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
                className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white px-6"
              >
                <Filter className="w-4 h-4 ml-2" />
                فیلتر پیشرفته
              </Button>
            </div>

            {/* Advanced Search */}
            {isAdvancedSearch && (
              <div className="grid md:grid-cols-2 gap-6 p-4 bg-cafe-cream dark:bg-cafe-espresso rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-cafe-rich-brown dark:text-cafe-latte mb-2">
                    <MapPin className="w-4 h-4 inline ml-1" />
                    مکان برگزاری
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="focus:ring-cafe-caramel focus:border-cafe-caramel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cafe-rich-brown dark:text-cafe-latte mb-2">
                    <Calendar className="w-4 h-4 inline ml-1" />
                    دسته‌بندی
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.key}
                        variant={activeCategory === category.key ? "default" : "outline"}
                        size="sm"
                        className={`rounded-full transition-all duration-300 ${
                          activeCategory === category.key
                            ? "bg-cafe-caramel text-white hover:bg-cafe-cinnamon"
                            : "border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white"
                        }`}
                        onClick={() => setActiveCategory(category.key)}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(searchQuery || selectedLocation !== "همه مکان‌ها" || activeCategory !== "all") && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-cafe-cream dark:border-cafe-rich-brown">
                <span className="text-sm text-cafe-rich-brown dark:text-cafe-latte">فیلترهای فعال:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-cafe-caramel text-white">
                    جستجو: {searchQuery}
                  </Badge>
                )}
                {selectedLocation !== "همه مکان‌ها" && (
                  <Badge variant="secondary" className="bg-cafe-sage text-white">
                    مکان: {selectedLocation}
                  </Badge>
                )}
                {activeCategory !== "all" && (
                  <Badge variant="secondary" className="bg-cafe-cinnamon text-white">
                    دسته: {categories.find(c => c.key === activeCategory)?.label}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("همه مکان‌ها");
                    setActiveCategory("all");
                  }}
                  className="text-cafe-caramel hover:text-cafe-cinnamon"
                >
                  پاک کردن همه
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

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
