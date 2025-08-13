import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RegistrationModal from "@/components/registration-modal";
import { formatPersianDate } from "@/lib/persian-utils";
import { Calendar, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import type { Event } from "@shared/schema";

export default function EventDetail() {
  const [, params] = useRoute("/events/:id");
  const [, navigate] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: event, isLoading } = useQuery<Event & { registrationCount: number }>({
    queryKey: ["/api/events", params?.id],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cafe-light py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8" />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-64 bg-muted" />
              <div className="p-8 space-y-4">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-cafe-light py-8 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-cafe-brown mb-4">رویداد پیدا نشد</h1>
            <p className="text-cafe-dark mb-6">رویداد مورد نظر شما وجود ندارد یا حذف شده است.</p>
            <Button onClick={() => navigate("/events")} className="bg-cafe-brown hover:bg-cafe-dark-brown">
              بازگشت به فهرست رویدادها
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isEventFull = event.registrationCount >= event.capacity;
  const isEventPast = new Date(event.date) < new Date();

  return (
    <div className="min-h-screen bg-cafe-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/events")}
          className="mb-8 text-cafe-brown hover:text-cafe-dark-brown hover:bg-cafe-cream"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت به فهرست رویدادها
        </Button>

        {/* Event Details */}
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.bookTitle}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Badge
                variant="secondary"
                className={`px-3 py-1 text-xs font-medium text-white ${
                  event.category === "رمان کلاسیک" ? "bg-cafe-green" :
                  event.category === "شعر معاصر" ? "bg-cafe-orange" :
                  "bg-purple-500"
                }`}
              >
                {event.category}
              </Badge>
              <span className="text-sm text-cafe-dark">
                {formatPersianDate(new Date(event.date))}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-cafe-brown mb-2 font-serif">{event.bookTitle}</h1>
            <p className="text-lg text-cafe-dark mb-4">نویسنده: {event.author}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-cafe-dark">
                <Calendar className="w-5 h-5 ml-2 text-cafe-brown" />
                <span>{formatPersianDate(new Date(event.date))}</span>
              </div>
              <div className="flex items-center text-cafe-dark">
                <Clock className="w-5 h-5 ml-2 text-cafe-brown" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-cafe-dark">
                <Users className="w-5 h-5 ml-2 text-cafe-brown" />
                <span className="persian-numbers">{event.registrationCount}/{event.capacity} نفر</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-cafe-dark leading-relaxed">{event.description}</p>
            </div>

            <div className="border-t border-cafe-cream pt-6">
              <div className="flex items-center text-cafe-dark mb-4">
                <MapPin className="w-5 h-5 ml-2 text-cafe-brown" />
                <span>کافه کتاب، خیابان ولیعصر، تهران</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isEventPast ? (
                  <Button disabled className="flex-1 bg-muted text-muted-foreground">
                    این رویداد برگزار شده است
                  </Button>
                ) : isEventFull ? (
                  <Button disabled className="flex-1 bg-muted text-muted-foreground">
                    ظرفیت تکمیل است
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 bg-cafe-brown hover:bg-cafe-dark-brown text-white"
                    size="lg"
                  >
                    <Users className="w-5 h-5 ml-2" />
                    ثبت نام در این جلسه
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => navigate("/events")}
                  className="border-cafe-brown text-cafe-brown hover:bg-cafe-brown hover:text-white"
                  size="lg"
                >
                  مشاهده سایر رویدادها
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={event}
        />
      </div>
    </div>
  );
}
