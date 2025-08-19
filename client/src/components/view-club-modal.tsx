import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Calendar, 
  Clock,
  MapPin,
  Users, 
  BookOpen,
  FileText,
  Trophy,
  X
} from "lucide-react";
import { formatPersianDate } from "@/lib/persian-utils";

interface ViewClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: any;
}

export default function ViewClubModal({ isOpen, onClose, club }: ViewClubModalProps) {
  if (!club) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
              اطلاعات باشگاه
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-auto p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Club Header */}
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                  {club.name}
                </h2>
                <Badge className="bg-cafe-sage text-white px-3 py-1">
                  {club.status === "active" ? "فعال" : "غیرفعال"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed mb-6">
                {club.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-lg">
                  <Users className="w-5 h-5 ml-3 text-cafe-caramel" />
                  <div>
                    <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">اعضا</div>
                    <div className="font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers">
                      {club.memberCount || 1} نفر
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-lg">
                  <MapPin className="w-5 h-5 ml-3 text-cafe-caramel" />
                  <div>
                    <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">مکان</div>
                    <div className="font-bold text-cafe-mocha dark:text-cafe-warm-white">
                      {club.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-lg">
                  <Calendar className="w-5 h-5 ml-3 text-cafe-caramel" />
                  <div>
                    <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">روز جلسه</div>
                    <div className="font-bold text-cafe-mocha dark:text-cafe-warm-white">
                      {club.meetingDay}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-lg">
                  <Clock className="w-5 h-5 ml-3 text-cafe-caramel" />
                  <div>
                    <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">ساعت جلسه</div>
                    <div className="font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers">
                      {club.meetingTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-lg">
                  <Trophy className="w-5 h-5 ml-3 text-cafe-caramel" />
                  <div>
                    <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">دسته‌بندی</div>
                    <div className="font-bold text-cafe-mocha dark:text-cafe-warm-white">
                      {club.category}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center bg-cafe-cream dark:bg-cafe-espresso p-4 rounded-lg">
                  <Users className="w-5 h-5 ml-3 text-cafe-caramel" />
                  <div>
                    <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">حداکثر اعضا</div>
                    <div className="font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers">
                      {club.maxMembers} نفر
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Book */}
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                <BookOpen className="w-6 h-6 ml-3 text-cafe-caramel" />
                کتاب فعلی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">
                {club.bookTitle}
              </h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte mb-4">
                نویسنده: {club.author}
              </p>
              <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed mb-4">
                {club.bookDescription}
              </p>
              <div className="flex items-center text-sm text-cafe-rich-brown dark:text-cafe-latte">
                <Calendar className="w-4 h-4 ml-2 text-cafe-caramel" />
                مدت مطالعه: <span className="persian-numbers mr-2">{club.readingDuration}</span> هفته
              </div>
            </CardContent>
          </Card>

          {/* Club Rules */}
          {club.rules && (
            <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                  <FileText className="w-6 h-6 ml-3 text-cafe-caramel" />
                  قوانین باشگاه
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed whitespace-pre-wrap">
                  {club.rules}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Club Stats */}
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                آمار باشگاه
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-cafe-cream dark:bg-cafe-espresso rounded-lg">
                  <div className="text-2xl font-bold text-cafe-caramel persian-numbers mb-1">
                    {club.memberCount || 1}
                  </div>
                  <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">
                    عضو فعال
                  </div>
                </div>
                <div className="text-center p-4 bg-cafe-cream dark:bg-cafe-espresso rounded-lg">
                  <div className="text-2xl font-bold text-cafe-caramel mb-1">
                    {formatPersianDate(new Date(club.createdAt || Date.now()))}
                  </div>
                  <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">
                    تاریخ تأسیس
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}