import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  MapPin,
  Eye,
  UserMinus,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatPersianDate } from "@/lib/persian-utils";
import ViewClubModal from "@/components/view-club-modal";

// Profile edit schema
const profileEditSchema = z.object({
  fullName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().min(11, "شماره تلفن معتبر وارد کنید").optional(),
});

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewClubModalOpen, setIsViewClubModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user data from localStorage and API
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Get user's registered events
  const { data: userRegistrations = [], isLoading: registrationsLoading } = useQuery({
    queryKey: ["/api/user/registrations"],
    queryFn: async () => {
      // Mock API - in real implementation this would fetch user's registrations
      const storedRegistrations = localStorage.getItem("userRegistrations");
      return storedRegistrations ? JSON.parse(storedRegistrations) : [];
    },
    enabled: !!user
  });

  // Get user's clubs
  const { data: userClubs = [], isLoading: clubsLoading } = useQuery({
    queryKey: ["/api/user/clubs"],
    queryFn: async () => {
      // Mock API - in real implementation this would fetch user's clubs
      const storedClubs = localStorage.getItem("userClubs");
      return storedClubs ? JSON.parse(storedClubs) : [];
    },
    enabled: !!user
  });

  // Profile edit form
  const form = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || "",
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      // Update localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    },
    onSuccess: () => {
      toast({
        title: "پروفایل بروزرسانی شد",
        description: "اطلاعات شما با موفقیت ذخیره شد.",
      });
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی پروفایل",
        variant: "destructive",
      });
    },
  });

  const leaveClubMutation = useMutation({
    mutationFn: async (clubId: string) => {
      // Remove from localStorage
      const clubs = JSON.parse(localStorage.getItem("userClubs") || "[]");
      const updatedClubs = clubs.filter((club: any) => club.id !== clubId);
      localStorage.setItem("userClubs", JSON.stringify(updatedClubs));
      return updatedClubs;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/clubs"] });
      toast({
        title: "خروج از باشگاه",
        description: "شما با موفقیت از باشگاه خارج شدید.",
      });
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "خطا در خروج از باشگاه",
        variant: "destructive",
      });
    },
  });

  const cancelRegistrationMutation = useMutation({
    mutationFn: async (eventId: string) => {
      // Remove from localStorage
      const registrations = JSON.parse(localStorage.getItem("userRegistrations") || "[]");
      const updatedRegistrations = registrations.filter((reg: any) => reg.id !== eventId);
      localStorage.setItem("userRegistrations", JSON.stringify(updatedRegistrations));
      return updatedRegistrations;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/registrations"] });
      toast({
        title: "لغو ثبت نام",
        description: "ثبت نام شما با موفقیت لغو شد.",
      });
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "خطا در لغو ثبت نام",
        variant: "destructive",
      });
    },
  });

  const uploadProfilePicture = useMutation({
    mutationFn: async (file: File) => {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      const updatedUser = { ...user, avatar: imageUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return imageUrl;
    },
    onSuccess: () => {
      toast({
        title: "تصویر پروفایل بروزرسانی شد",
        description: "تصویر پروفایل شما با موفقیت تغییر کرد.",
      });
    },
    onError: () => {
      toast({
        title: "خطا",
        description: "خطا در بروزرسانی تصویر پروفایل",
        variant: "destructive",
      });
    },
  });

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "خطا",
          description: "حجم فایل باید کمتر از ۵ مگابایت باشد.",
          variant: "destructive",
        });
        return;
      }
      uploadProfilePicture.mutate(file);
    }
  };

  const onSubmitProfile = (data: any) => {
    updateProfileMutation.mutate(data);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4">
            لطفاً ابتدا وارد شوید
          </h2>
          <Link to="/login">
            <Button className="bg-cafe-warm-gradient text-white">
              ورود
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <div className="relative">
                <Avatar className="w-32 h-32 mb-4">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <AvatarFallback className="text-3xl bg-cafe-caramel text-white font-bold">
                      {user.fullName.split(' ').map((name: string) => name[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profile-picture-input"
                />
                <Button 
                  variant="outline" 
                  className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white"
                  onClick={() => document.getElementById('profile-picture-input')?.click()}
                  disabled={uploadProfilePicture.isPending}
                >
                  <Edit className="w-4 h-4 ml-2" />
                  {uploadProfilePicture.isPending ? "در حال بروزرسانی..." : "ویرایش تصویر"}
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">
                    {user.fullName}
                  </h1>
                  <div className="space-y-3 text-cafe-rich-brown dark:text-cafe-latte">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <span className="persian-numbers">{user.phone || "تلفن ثبت نشده"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 ml-3 text-cafe-caramel" />
                      <span>عضو از: {formatPersianDate(new Date())}</span>
                    </div>
                  </div>
                </div>
                
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <Settings className="w-5 h-5 ml-2" />
                      ویرایش پروفایل
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md" dir="rtl">
                    <DialogHeader>
                      <DialogTitle className="text-cafe-mocha dark:text-cafe-warm-white font-serif">
                        ویرایش پروفایل
                      </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نام و نام خانوادگی</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>شماره تلفن</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2 pt-4">
                          <Button
                            type="submit"
                            className="flex-1 bg-cafe-caramel text-white hover:bg-cafe-cinnamon"
                            disabled={updateProfileMutation.isPending}
                          >
                            <Save className="w-4 h-4 ml-2" />
                            ذخیره
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                          >
                            <X className="w-4 h-4 ml-2" />
                            انصراف
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
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
                {userRegistrations.length}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">رویداد شرکت کرده</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-cafe-sage mx-auto mb-4" />
              <div className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers mb-2">
                {userRegistrations.length * 2}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">کتاب خوانده</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-cafe-cinnamon mx-auto mb-4" />
              <div className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white persian-numbers mb-2">
                {userClubs.length}
              </div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte text-sm">بحث شرکت کرده</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-cafe-golden mx-auto mb-4" />
              <div className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">
                رمان معاصر
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
                  {userRegistrations.length === 0 ? (
                    <div className="text-center text-cafe-rich-brown dark:text-cafe-latte py-8">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-cafe-caramel opacity-50" />
                      <p>هنوز در هیچ رویدادی شرکت نکرده‌اید</p>
                    </div>
                  ) : (
                    userRegistrations.slice(0, 3).map((event: any) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-cafe-cream dark:bg-cafe-espresso rounded-xl">
                        <div>
                          <div className="font-medium text-cafe-mocha dark:text-cafe-warm-white">
                            {event.bookTitle}
                          </div>
                          <div className="text-sm text-cafe-rich-brown dark:text-cafe-latte">
                            {formatPersianDate(new Date(event.date || Date.now()))}
                          </div>
                        </div>
                        {getStatusBadge("upcoming")}
                      </div>
                    ))
                  )}
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
            <div className="space-y-4">
              {userRegistrations.length === 0 ? (
                <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                  <CardContent className="p-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-6 text-cafe-caramel opacity-50" />
                    <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4">
                      هیچ رویدادی یافت نشد
                    </h3>
                    <p className="text-cafe-rich-brown dark:text-cafe-latte mb-6">
                      هنوز در هیچ رویدادی ثبت نام نکرده‌اید. برای مشاهده رویدادها به صفحه رویدادها بروید.
                    </p>
                    <Link to="/events">
                      <Button className="bg-cafe-warm-gradient text-white">
                        مشاهده رویدادها
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                userRegistrations.map((event: any) => (
                  <Card key={event.id} className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2 font-serif">
                            {event.bookTitle}
                          </h3>
                          <p className="text-cafe-rich-brown dark:text-cafe-latte mb-3">
                            نویسنده: {event.author}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-cafe-rich-brown dark:text-cafe-latte">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 ml-2 text-cafe-caramel" />
                              {formatPersianDate(new Date(event.date || Date.now()))}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 ml-2 text-cafe-caramel" />
                              <span className="persian-numbers">{event.time || "18:00"}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 ml-2 text-cafe-caramel" />
                              {event.location || "کافه کتاب"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {getStatusBadge("upcoming")}
                          <Link to={`/events/${event.id}`}>
                            <Button variant="outline" size="sm" className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white">
                              <Eye className="w-4 h-4 ml-2" />
                              جزئیات
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => cancelRegistrationMutation.mutate(event.id)}
                            disabled={cancelRegistrationMutation.isPending}
                          >
                            <X className="w-4 h-4 ml-2" />
                            لغو ثبت نام
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-6">
            <div className="space-y-4">
              {userClubs.length === 0 ? (
                <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                  <CardContent className="p-12 text-center">
                    <User className="w-16 h-16 mx-auto mb-6 text-cafe-caramel opacity-50" />
                    <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4">
                      هیچ باشگاهی یافت نشد
                    </h3>
                    <p className="text-cafe-rich-brown dark:text-cafe-latte mb-6">
                      هنوز عضو هیچ باشگاهی نیستید. برای ایجاد باشگاه جدید از دکمه زیر استفاده کنید.
                    </p>
                    <Link to="/create-club">
                      <Button className="bg-cafe-warm-gradient text-white">
                        ایجاد باشگاه جدید
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                userClubs.map((club: any) => (
                  <Card key={club.id} className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                              {club.name}
                            </h3>
                            <Badge className="bg-cafe-sage text-white">فعال</Badge>
                          </div>
                          <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                            {club.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-cafe-rich-brown dark:text-cafe-latte">
                            <div className="flex items-center">
                              <User className="w-4 h-4 ml-2 text-cafe-caramel" />
                              <span className="persian-numbers">{club.memberCount || 15} عضو</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 ml-2 text-cafe-caramel" />
                              عضو از: {formatPersianDate(new Date())}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white"
                            onClick={() => {
                              setSelectedClub(club);
                              setIsViewClubModalOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 ml-2" />
                            مشاهده باشگاه
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => leaveClubMutation.mutate(club.id)}
                            disabled={leaveClubMutation.isPending}
                          >
                            <UserMinus className="w-4 h-4 ml-2" />
                            ترک باشگاه
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Club Modal */}
      <ViewClubModal
        isOpen={isViewClubModalOpen}
        onClose={() => setIsViewClubModalOpen(false)}
        club={selectedClub}
      />
    </div>
  );
}