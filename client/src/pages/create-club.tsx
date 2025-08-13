import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  Trash2,
  Coffee,
  Star
} from "lucide-react";

const clubSchema = z.object({
  name: z.string().min(3, "نام باشگاه باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  location: z.string().min(3, "مکان باید مشخص شود"),
  maxMembers: z.number().min(5).max(50),
  meetingDay: z.string().min(1, "روز جلسه را انتخاب کنید"),
  meetingTime: z.string().min(1, "ساعت جلسه را مشخص کنید"),
  bookTitle: z.string().min(2, "نام کتاب الزامی است"),
  author: z.string().min(2, "نام نویسنده الزامی است"),
  bookDescription: z.string().min(10, "توضیحات کتاب الزامی است"),
  readingDuration: z.number().min(1).max(12),
  rules: z.string().optional(),
});

type ClubFormData = z.infer<typeof clubSchema>;

const categories = [
  "رمان معاصر",
  "شعر کلاسیک",
  "داستان کوتاه", 
  "ادبیات جهان",
  "تاریخ و فلسفه",
  "کتاب‌های علمی",
  "ادبیات جوانان"
];

const locations = [
  "کافه نادری - میدان تجریش",
  "کافه چای خونه - خیابان فرشته", 
  "کافه گاندی - خیابان ولیعصر",
  "کافه کتاب - میدان آرژانتین",
  "کافه رستگار - خیابان کریمخان"
];

const meetingDays = [
  "شنبه",
  "یکشنبه", 
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه"
];

export default function CreateClub() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ClubFormData>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      location: "",
      maxMembers: 15,
      meetingDay: "",
      meetingTime: "",
      bookTitle: "",
      author: "",
      bookDescription: "",
      readingDuration: 4,
      rules: "",
    },
  });

  const onSubmit = async (data: ClubFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store club in localStorage and user clubs for immediate availability
      const newClub = {
        id: `club-${Date.now()}`,
        name: data.name,
        description: data.description,
        category: data.category,
        location: data.location,
        maxMembers: data.maxMembers,
        meetingDay: data.meetingDay,
        meetingTime: data.meetingTime,
        bookTitle: data.bookTitle,
        author: data.author,
        bookDescription: data.bookDescription,
        readingDuration: data.readingDuration,
        rules: data.rules,
        createdAt: new Date().toISOString(),
        memberCount: 1,
        status: "active",
      };
      
      // Add to user's clubs
      const userClubs = JSON.parse(localStorage.getItem("userClubs") || "[]");
      userClubs.push(newClub);
      localStorage.setItem("userClubs", JSON.stringify(userClubs));
      
      // Create an event for the new club (immediate availability)
      const newEvent = {
        id: `event-${Date.now()}`,
        bookTitle: data.bookTitle,
        author: data.author,
        description: data.bookDescription,
        category: data.category,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
        time: data.meetingTime,
        capacity: data.maxMembers,
        imageUrl: null,
        clubId: newClub.id,
        cafeId: "cafe-1",
        createdAt: new Date().toISOString(),
        registrationCount: 0,
      };
      
      // This would be stored in the events system in a real implementation
      
      toast({
        title: "باشگاه ایجاد شد",
        description: "باشگاه کتاب شما با موفقیت ایجاد شد و در رویدادها قابل مشاهده است.",
      });
      
      // Reset form and redirect to events
      form.reset();
      setTimeout(() => {
        window.location.href = "/events";
      }, 2000);
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد باشگاه پیش آمده است.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">
            ایجاد باشگاه کتاب جدید
          </h1>
          <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte max-w-3xl mx-auto leading-relaxed">
            باشگاه کتاب خود را ایجاد کنید و عاشقان کتاب را دور هم جمع کنید
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown shadow-2xl">
          <CardHeader className="text-center bg-cafe-caramel text-white rounded-t-xl">
            <CardTitle className="text-2xl font-serif flex items-center justify-center gap-3">
              <Coffee className="w-8 h-8" />
              مشخصات باشگاه
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Info Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white border-b border-cafe-caramel pb-2">
                    اطلاعات پایه
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">نام باشگاه *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="مثل: باشگاه عاشقان شعر"
                              className="focus:ring-cafe-caramel focus:border-cafe-caramel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">دسته‌بندی *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-cafe-caramel focus:border-cafe-caramel">
                                <SelectValue placeholder="انتخاب دسته‌بندی" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">توضیحات باشگاه *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="توضیحی درباره اهداف و فعالیت‌های باشگاه بنویسید..."
                            className="min-h-[100px] focus:ring-cafe-caramel focus:border-cafe-caramel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Meeting Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white border-b border-cafe-caramel pb-2">
                    جزئیات جلسات
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">مکان جلسات *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-cafe-caramel focus:border-cafe-caramel">
                                <SelectValue placeholder="انتخاب مکان" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meetingDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">روز جلسه *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-cafe-caramel focus:border-cafe-caramel">
                                <SelectValue placeholder="انتخاب روز" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {meetingDays.map((day) => (
                                <SelectItem key={day} value={day}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meetingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">ساعت جلسه *</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              className="focus:ring-cafe-caramel focus:border-cafe-caramel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="maxMembers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">حداکثر تعداد اعضا</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="5"
                            max="50"
                            className="focus:ring-cafe-caramel focus:border-cafe-caramel"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Book Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white border-b border-cafe-caramel pb-2">
                    اطلاعات کتاب اول
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="bookTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">نام کتاب *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="مثل: بوف کور"
                              className="focus:ring-cafe-caramel focus:border-cafe-caramel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">نویسنده *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="مثل: صادق هدایت"
                              className="focus:ring-cafe-caramel focus:border-cafe-caramel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bookDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">توضیحات کتاب *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="خلاصه‌ای از کتاب و دلیل انتخاب آن..."
                            className="min-h-[80px] focus:ring-cafe-caramel focus:border-cafe-caramel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readingDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">مدت زمان مطالعه (هفته)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="12"
                            className="focus:ring-cafe-caramel focus:border-cafe-caramel"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Rules Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white border-b border-cafe-caramel pb-2">
                    قوانین باشگاه (اختیاری)
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="rules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte">قوانین و مقررات خاص</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="قوانین خاص باشگاه مانند نحوه حضور، آمادگی برای جلسات و غیره..."
                            className="min-h-[100px] focus:ring-cafe-caramel focus:border-cafe-caramel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Section */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-cafe-cream dark:border-cafe-rich-brown">
                  <Button
                    type="submit"
                    className="flex-1 bg-cafe-warm-gradient text-white hover:shadow-xl hover:scale-105 transition-all duration-300 py-3 text-lg font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Clock className="w-5 h-5 ml-2 animate-spin" />
                        در حال ایجاد...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 ml-2" />
                        ایجاد باشگاه
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="border-cafe-caramel text-cafe-caramel hover:bg-cafe-caramel hover:text-white py-3 px-6"
                    onClick={() => form.reset()}
                  >
                    <Trash2 className="w-5 h-5 ml-2" />
                    پاک کردن فرم
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Preview Section */}
        <Card className="mt-8 bg-white dark:bg-cafe-mocha border-cafe-cream dark:border-cafe-rich-brown">
          <CardHeader>
            <CardTitle className="text-cafe-mocha dark:text-cafe-warm-white font-serif">
              پیش‌نمایش باشگاه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-cafe-cream dark:bg-cafe-espresso rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white">
                  {form.watch("name") || "نام باشگاه"}
                </h3>
                <Badge className="bg-cafe-caramel text-white">
                  {form.watch("category") || "دسته‌بندی"}
                </Badge>
              </div>
              
              <p className="text-cafe-rich-brown dark:text-cafe-latte mb-4">
                {form.watch("description") || "توضیحات باشگاه در اینجا نمایش داده می‌شود..."}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center text-cafe-rich-brown dark:text-cafe-latte">
                  <MapPin className="w-4 h-4 ml-2 text-cafe-caramel" />
                  {form.watch("location") || "مکان"}
                </div>
                <div className="flex items-center text-cafe-rich-brown dark:text-cafe-latte">
                  <Calendar className="w-4 h-4 ml-2 text-cafe-caramel" />
                  {form.watch("meetingDay") || "روز"} {form.watch("meetingTime") && `- ${form.watch("meetingTime")}`}
                </div>
                <div className="flex items-center text-cafe-rich-brown dark:text-cafe-latte">
                  <Users className="w-4 h-4 ml-2 text-cafe-caramel" />
                  <span className="persian-numbers">{form.watch("maxMembers") || 15} نفر</span>
                </div>
                <div className="flex items-center text-cafe-rich-brown dark:text-cafe-latte">
                  <BookOpen className="w-4 h-4 ml-2 text-cafe-caramel" />
                  {form.watch("bookTitle") || "کتاب"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}