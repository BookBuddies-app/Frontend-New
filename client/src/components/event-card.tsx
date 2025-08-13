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
        return "bg-cafe-green";
      case "شعر معاصر":
        return "bg-cafe-orange";
      default:
        return "bg-purple-500";
    }
  };

  return (
    <>
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-cafe-cream animate-fade-in">
        {event.imageUrl && (
          <Link to={`/events/${event.id}`}>
            <img
              src={event.imageUrl}
              alt={event.bookTitle}
              className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className={`px-3 py-1 text-xs font-medium text-white ${getCategoryColor(event.category)}`}
            >
              {event.category}
            </Badge>
            <span className="text-sm text-cafe-dark">
              {formatPersianDate(new Date(event.date))}
            </span>
          </div>
          
          <Link to={`/events/${event.id}`}>
            <h3 className="text-xl font-bold text-cafe-brown mb-2 font-serif hover:text-cafe-dark-brown transition-colors cursor-pointer">
              {event.bookTitle}
            </h3>
          </Link>
          <p className="text-cafe-dark mb-2">نویسنده: {event.author}</p>
          <p className="text-sm text-cafe-dark mb-4 leading-relaxed line-clamp-3">
            {event.description}
          </p>
          
          <div className="flex items-center justify-between mb-4 text-sm text-cafe-dark">
            <div className="flex items-center">
              <Clock className="w-4 h-4 ml-1 text-cafe-brown" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 ml-1 text-cafe-brown" />
              <span className="persian-numbers">{event.registrationCount}/{event.capacity} نفر</span>
            </div>
          </div>
          
          {isEventPast ? (
            <Button disabled className="w-full bg-muted text-muted-foreground">
              رویداد برگزار شده
            </Button>
          ) : isEventFull ? (
            <Button disabled className="w-full bg-muted text-muted-foreground">
              ظرفیت تکمیل است
            </Button>
          ) : (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-cafe-brown text-white hover:bg-cafe-dark-brown transition-colors font-medium"
            >
              <UserPlus className="w-4 h-4 ml-2" />
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