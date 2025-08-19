import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertRegistrationSchema } from "@shared/schema";
import { X, Check, Loader2 } from "lucide-react";
import type { Event, InsertRegistration } from "@shared/schema";
import { z } from "zod";

const formSchema = insertRegistrationSchema.omit({ eventId: true }).extend({
  terms: z.boolean().refine(val => val, "پذیرفتن قوانین و مقررات الزامی است"),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export default function RegistrationModal({ isOpen, onClose, event }: RegistrationModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      notes: "",
      terms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const response = await apiRequest("POST", `/api/events/${event.id}/register`, data);
      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      queryClient.invalidateQueries({ queryKey: ["/api/events", event.id] });
      toast({
        title: "ثبت نام موفق",
        description: "شما با موفقیت در این رویداد ثبت نام شدید.",
      });
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    },
    onError: (error: any) => {
      const message = error.message || "خطا در ثبت نام";
      toast({
        title: "خطا",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    // Check authentication before proceeding
    if (!user) {
      toast({
        title: "ورود مورد نیاز است",
        description: "لطفاً ابتدا ثبت‌نام و ورود کنید، سپس می‌توانید در رویداد شرکت کنید.",
        variant: "destructive",
      });
      onClose();
      return;
    }

    const { terms, ...registrationData } = data;
    
    // Store registration in localStorage for profile tracking
    const storedRegistrations = JSON.parse(localStorage.getItem("userRegistrations") || "[]");
    const newRegistration = {
      id: event.id,
      bookTitle: event.bookTitle,
      author: event.author,
      date: event.date,
      time: event.time,
      location: "کافه کتاب", // Default location
      category: event.category,
      registeredAt: new Date().toISOString(),
      ...registrationData,
    };
    storedRegistrations.push(newRegistration);
    localStorage.setItem("userRegistrations", JSON.stringify(storedRegistrations));
    
    registerMutation.mutate({
      ...registrationData,
      eventId: event.id,
      userId: user.id, // Add user ID to the registration
    });
  };

  const handleClose = () => {
    setIsSuccess(false);
    form.reset();
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-cafe-brown mb-2 font-serif">ثبت نام موفق!</h3>
            <p className="text-cafe-dark mb-4">
              شما با موفقیت در رویداد «{event.bookTitle}» ثبت نام شدید.
            </p>
            <p className="text-sm text-cafe-dark">
              این پنجره به زودی بسته خواهد شد...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-cafe-brown font-serif">
              ثبت نام در جلسه
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-cafe-dark hover:text-cafe-brown"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="text-sm text-cafe-dark">
            {event.bookTitle} - {event.author}
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cafe-dark">نام و نام خانوادگی *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="نام کامل خود را وارد کنید"
                      className="focus:ring-cafe-brown focus:border-cafe-brown"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cafe-dark">ایمیل *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      className="focus:ring-cafe-brown focus:border-cafe-brown"
                      {...field}
                    />
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
                  <FormLabel className="text-cafe-dark">شماره موبایل *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="focus:ring-cafe-brown focus:border-cafe-brown persian-numbers"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cafe-dark">توضیحات (اختیاری)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اگر سوال یا نظری دارید، بنویسید..."
                      className="resize-none focus:ring-cafe-brown focus:border-cafe-brown"
                      rows={3}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-cafe-brown data-[state=checked]:border-cafe-brown"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-cafe-dark">
                      با <a href="/rules" target="_blank" className="text-cafe-brown hover:underline cursor-pointer">قوانین و مقررات</a> موافقم *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full bg-cafe-caramel hover:bg-cafe-cinnamon text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
              disabled={registerMutation.isPending || !form.formState.isValid || !form.watch("terms")}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  در حال ثبت نام...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 ml-2" />
                  تأیید ثبت نام
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
