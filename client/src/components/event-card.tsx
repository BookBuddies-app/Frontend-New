import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RegistrationModal from "@/components/registration-modal";
import { formatPersianDate } from "@/lib/persian-utils";
import { Clock, Users, UserPlus } from "lucide-react";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event & { registrationCount: number };
}

export default function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isEventFull = event.registrationCount >= event.capacity;
  const isEventPast = new Date(event.date) < new Date();

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
      <Card className="bg-white dark:bg-cafe-mocha rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-cafe-cream dark:border-cafe-rich-brown animate-fade-in">
        {event.imageUrl && (
          <Link to={`/events/${event.id}`}>
            <img
              src={event.imageUrl}
              alt={event.bookTitle}
              className="w-full h-48 object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
            />
          </Link>
        )}
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="secondary"
              className={`px-4 py-2 text-sm font-medium rounded-full ${getCategoryColor(event.category)}`}
            >
              {event.category}
            </Badge>
            <span className="text-sm text-cafe-rich-brown dark:text-cafe-latte font-medium">
              {formatPersianDate(new Date(event.date))}
            </span>
          </div>
          
          <Link to={`/events/${event.id}`}>
            <h3 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-3 font-serif hover:text-cafe-caramel dark:hover:text-cafe-golden transition-colors cursor-pointer leading-tight">
              {event.bookTitle}
            </h3>
          </Link>
          <p className="text-cafe-rich-brown dark:text-cafe-latte mb-3 text-lg">نویسنده: {event.author}</p>
          <p className="text-cafe-rich-brown dark:text-cafe-latte mb-6 leading-relaxed line-clamp-3">
            {event.description}
          </p>
          
          <div className="flex items-center justify-between mb-6 text-cafe-rich-brown dark:text-cafe-latte">
            <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso px-3 py-2 rounded-lg">
              <Clock className="w-5 h-5 ml-2 text-cafe-caramel" />
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso px-3 py-2 rounded-lg">
              <Users className="w-5 h-5 ml-2 text-cafe-caramel" />
              <span className="persian-numbers font-medium">{event.registrationCount}/{event.capacity} نفر</span>
            </div>
          </div>
          
          {isEventPast ? (
            <Button disabled className="w-full bg-muted text-muted-foreground py-3 rounded-xl">
              رویداد برگزار شده
            </Button>
          ) : isEventFull ? (
            <Button disabled className="w-full bg-muted text-muted-foreground py-3 rounded-xl">
              ظرفیت تکمیل است
            </Button>
          ) : (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium py-3 rounded-xl text-lg"
            >
              <UserPlus className="w-5 h-5 ml-2" />
              ثبت نام در این جلسه
            </Button>
          )}
        </CardContent>
      </Card>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </>
  );
}