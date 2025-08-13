import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  fullName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone: z.string().min(11, "شماره تلفن معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val, "پذیرفتن شرایط و قوانین الزامی است"),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تکرار آن باید یکسان باشند",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      newsletter: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in registered users list for login validation
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const newUser = {
        id: `user-${Date.now()}`,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password, // In real app, this would be hashed
        registeredAt: new Date().toISOString(),
      };
      
      // Check if email already exists
      const existingUser = registeredUsers.find((user: any) => user.email === data.email);
      if (existingUser) {
        toast({
          title: "خطا در ثبت نام",
          description: "این ایمیل قبلاً ثبت شده است.",
          variant: "destructive",
        });
        return;
      }
      
      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      
      // Store current user data for login
      localStorage.setItem("user", JSON.stringify({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      }));
      
      toast({
        title: "ثبت نام موفق",
        description: "حساب کاربری شما با موفقیت ایجاد شد.",
      });
      
      // Redirect to profile
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1500);
    } catch (error) {
      toast({
        title: "خطا در ثبت نام",
        description: "مشکلی در ایجاد حساب کاربری پیش آمده است.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-cream via-white to-cafe-latte dark:from-cafe-mocha dark:via-cafe-espresso dark:to-cafe-rich-brown py-20">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">
            عضویت در باشگاه
          </h1>
          <p className="text-cafe-rich-brown dark:text-cafe-latte">
            به خانواده بزرگ کتابخوانان بپیوندید
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white dark:bg-cafe-mocha rounded-2xl shadow-2xl p-8 border border-cafe-cream dark:border-cafe-rich-brown">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel w-5 h-5" />
                        <Input
                          {...field}
                          className="pr-11 bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown focus:border-cafe-caramel dark:focus:border-cafe-golden text-right"
                          placeholder="نام کامل خود را وارد کنید"
                        />
                      </div>
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
                    <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">ایمیل</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel w-5 h-5" />
                        <Input
                          {...field}
                          type="email"
                          className="pr-11 bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown focus:border-cafe-caramel dark:focus:border-cafe-golden text-right"
                          placeholder="ایمیل خود را وارد کنید"
                        />
                      </div>
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
                    <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">تلفن همراه</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel w-5 h-5" />
                        <Input
                          {...field}
                          className="pr-11 bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown focus:border-cafe-caramel dark:focus:border-cafe-golden text-right"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">رمز عبور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel w-5 h-5" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pr-11 pl-11 bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown focus:border-cafe-caramel dark:focus:border-cafe-golden text-right"
                          placeholder="رمز عبور خود را وارد کنید"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel hover:text-cafe-mocha dark:hover:text-cafe-golden transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">تکرار رمز عبور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel w-5 h-5" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          className="pr-11 pl-11 bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown focus:border-cafe-caramel dark:focus:border-cafe-golden text-right"
                          placeholder="رمز عبور خود را دوباره وارد کنید"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cafe-caramel hover:text-cafe-mocha dark:hover:text-cafe-golden transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 data-[state=checked]:bg-cafe-caramel data-[state=checked]:border-cafe-caramel"
                        />
                      </FormControl>
                      <div className="mr-3">
                        <FormLabel className="text-cafe-rich-brown dark:text-cafe-latte font-normal leading-relaxed">
                          <Link to="/rules" className="text-cafe-caramel hover:text-cafe-mocha dark:hover:text-cafe-golden transition-colors underline">
                            شرایط و قوانین
                          </Link>{" "}
                          باشگاه کتاب کافه را مطالعه کرده و می‌پذیرم
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 data-[state=checked]:bg-cafe-caramel data-[state=checked]:border-cafe-caramel"
                        />
                      </FormControl>
                      <FormLabel className="mr-3 text-cafe-rich-brown dark:text-cafe-latte font-normal leading-relaxed">
                        مایل به دریافت اطلاعیه‌های رویدادها و اخبار باشگاه هستم
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium py-3 rounded-xl text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin ml-2"></div>
                    در حال ایجاد حساب...
                  </div>
                ) : (
                  "ثبت نام"
                )}
              </Button>
            </form>
          </Form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-cafe-rich-brown dark:text-cafe-latte">
              قبلاً ثبت نام کرده‌اید؟{" "}
              <Link
                to="/login"
                className="text-cafe-caramel hover:text-cafe-mocha dark:hover:text-cafe-golden transition-colors font-medium"
              >
                وارد شوید
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-cafe-golden/10 dark:bg-cafe-golden/20 rounded-xl p-6 border border-cafe-golden/20">
          <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-3 text-center">
            مزایای عضویت
          </h3>
          <ul className="space-y-2 text-cafe-rich-brown dark:text-cafe-latte text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-3"></div>
              شرکت در جلسات بحث کتاب
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-3"></div>
              دسترسی به کتابخانه دیجیتال
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-3"></div>
              تخفیف ویژه در کافه‌های همکار
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-3"></div>
              اطلاع از رویدادها و کارگاه‌ها
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}