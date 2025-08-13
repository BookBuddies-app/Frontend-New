import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  BookOpen, 
  Calendar, 
  Trophy, 
  Mail, 
  Phone, 
  Edit, 
  Settings,
  Clock,
  MapPin
} from "lucide-react";
import { formatPersianDate } from "@/lib/persian-utils";

// Mock user data - in real implementation this would come from backend
const mockUser = {
  id: "1",
  fullName: "سارا احمدی",
  email: "sara@example.com",
  phone: "09123456789",
  joinDate: "2024-01-15",
  avatar: null,
  stats: {
    eventsAttended: 12,
    booksRead: 18,
    discussionsJoined: 24,
    favoriteGenre: "رمان معاصر"
  }
};

const mockMyEvents = [
  {
    id: "1",
    bookTitle: "بوف کور",
    author: "صادق هدایت",
    date: "2024-08-20",
    time: "18:00",
    status: "upcoming",
    location: "کافه نادری"
  },
  {
    id: "2",
    bookTitle: "سووشون",
    author: "سیمین دانشور",
    date: "2024-08-05",
    time: "18:00",
    status: "attended",
    location: "کافه چای خونه"
  },
  {
    id: "3",
    bookTitle: "داستان شهر من",
    author: "غلامحسین ساعدی",
    date: "2024-07-22",
    time: "18:00",
    status: "attended",
    location: "کافه نادری"
  }
];

const mockMyClubs = [
  {
    id: "1",
    name: "باشگاه عاشقان شعر",
    description: "جلسات هفتگی برای بحث درباره شعر کلاسیک و معاصر",
    memberCount: 24,
    joinDate: "2024-01-15",
    nextMeeting: "2024-08-25",
    status: "active"
  },
  {
    id: "2",
    name: "حلقه رمان معاصر",
    description: "مطالعه و تحلیل رمان‌های معاصر ایرانی",
    memberCount: 18,
    joinDate: "2024-02-20",
    nextMeeting: "2024-08-27",
    status: "active"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  // In real implementation, use actual API calls
  // const { data: user } = useQuery({ queryKey: ['/api/user/profile'] });
  // const { data: myEvents } = useQuery({ queryKey: ['/api/user/events'] });
  // const { data: myClubs } = useQuery({ queryKey: ['/api/user/clubs'] });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-cafe-caramel text-white">آینده</Badge>;
      case "attended":
        return <Badge className="bg-cafe-sage text-white">شرکت کرده</Badge>;
      case "missed":
        return <Badge variant="destructive">غایب</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Profile Header */}
        <div className="bg-white dark:bg-cafe-mocha rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarFallback className="text-3xl bg-cafe-caramel text-white font-bold">
                  {mockUser.fullName.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white">
                <Edit className="w-4 h-4 ml-2" />
                ویرایش تصویر
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">
                    {mockUser.fullName}
                  </h1>
                  <div className="space-y-3 text-cafe-rich-brown dark:text-cafe-latte">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <span>{mockUser.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <span className="persian-numbers">{mockUser.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <span>عضو از: {formatPersianDate(new Date(mockUser.joinDate))}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Settings className="w-5 h-5 ml-2" />
                  ویرایش پروفایل
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-cafe-caramel mx-auto mb-4" />
              <div className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers mb-2">
                {mockUser.stats.eventsAttended}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">رویداد شرکت کرده</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-cafe-sage mx-auto mb-4" />
              <div className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers mb-2">
                {mockUser.stats.booksRead}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">کتاب خوانده</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-cafe-cinnamon mx-auto mb-4" />
              <div className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers mb-2">
                {mockUser.stats.discussionsJoined}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">بحث شرکت کرده</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-cafe-golden mx-auto mb-4" />
              <div className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">
                {mockUser.stats.favoriteGenre}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">ژانر مورد علاقه</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-cafe-mocha border border-cafe-cream dark:border-cafe-rich-brown">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cafe-caramel data-[state=active]:text-white">
              نگاه کلی
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-cafe-caramel data-[state=active]:text-white">
              رویدادهای من
            </TabsTrigger>
            <TabsTrigger value="clubs" className="data-[state=active]:bg-cafe-caramel data-[state=active]:text-white">
              باشگاه‌های من
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                <CardHeader>
                  <CardTitle className="text-cafe-mocha dark:text-cafe-warm-white font-serif">
                    فعالیت‌های اخیر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockMyEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-cafe-cream dark:bg-cafe-espresso rounded-xl">
                      <div>
                        <div className="font-medium text-cafe-mocha dark:text-cafe-warm-white">
                          {event.bookTitle}
                        </div>
                        <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">
                          {formatPersianDate(new Date(event.date))}
                        </div>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                <CardHeader>
                  <CardTitle className="text-cafe-mocha dark:text-cafe-warm-white font-serif">
                    پیشرفت ماهانه
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-cafe-rich-brown dark:text-cafe-latte">کتاب‌های خوانده شده</span>
                        <span className="text-cafe-mocha dark:text-cafe-warm-white persian-numbers">3/4</span>
                      </div>
                      <div className="w-full bg-cafe-cream dark:bg-cafe-espresso rounded-full h-2">
                        <div className="bg-cafe-caramel h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-cafe-rich-brown dark:text-cafe-latte">شرکت در جلسات</span>
                        <span className="text-cafe-mocha dark:text-cafe-warm-white persian-numbers">2/3</span>
                      </div>
                      <div className="w-full bg-cafe-cream dark:bg-cafe-espresso rounded-full h-2">
                        <div className="bg-cafe-sage h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {mockMyEvents.map((event) => (
                <Card key={event.id} className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                          {event.bookTitle}
                        </h3>
                        <p className="text-cafe-rich-brown dark:text-cafe-latte">
                          نویسنده: {event.author}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-cafe-rich-brown dark:text-cafe-latte">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 ml-2 text-cafe-caramel" />
                            {formatPersianDate(new Date(event.date))}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 ml-2 text-cafe-caramel" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 ml-2 text-cafe-caramel" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(event.status)}
                        {event.status === "upcoming" && (
                          <Button variant="outline" size="sm" className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white">
                            جزئیات رویداد
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-6">
            <div className="grid gap-6">
              {mockMyClubs.map((club) => (
                <Card key={club.id} className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                            {club.name}
                          </h3>
                          <Badge className="bg-cafe-sage text-white">{club.status === "active" ? "فعال" : "غیرفعال"}</Badge>
                        </div>
                        <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                          {club.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-cafe-rich-brown dark:text-cafe-latte">
                          <div className="flex items-center">
                            <User className="w-4 h-4 ml-2 text-cafe-caramel" />
                            <span className="persian-numbers">{club.memberCount} عضو</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 ml-2 text-cafe-caramel" />
                            عضو از: {formatPersianDate(new Date(club.joinDate))}
                          </div>
                          {club.nextMeeting && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 ml-2 text-cafe-caramel" />
                              جلسه بعدی: {formatPersianDate(new Date(club.nextMeeting))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white">
                          مشاهده باشگاه
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                          ترک باشگاه
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}