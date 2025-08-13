import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate credentials against registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const user = registeredUsers.find((user: any) => 
        user.email === data.email && user.password === data.password
      );
      
      if (!user) {
        toast({
          title: "خطا در ورود",
          description: "ایمیل یا رمز عبور اشتباه است.",
          variant: "destructive",
        });
        return;
      }
      
      // Store authenticated user data
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      }));
      
      toast({
        title: "ورود موفق",
        description: "با موفقیت وارد حساب کاربری شدید.",
      });
      
      // Redirect to profile
      window.location.href = "/profile";
    } catch (error) {
      toast({
        title: "خطا در ورود",
        description: "مشکلی در ورود پیش آمده است.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-cream via-white to-cafe-latte dark:from-cafe-mocha dark:via-cafe-espresso dark:to-cafe-rich-brown flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">
            ورود به حساب
          </h1>
          <p className="text-cafe-rich-brown dark:text-cafe-latte">
            به باشگاه کتاب کافه خوش آمدید
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-cafe-mocha rounded-2xl shadow-2xl p-8 border border-cafe-cream dark:border-cafe-rich-brown">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-cafe-caramel data-[state=checked]:border-cafe-caramel"
                        />
                      </FormControl>
                      <FormLabel className="mr-2 text-cafe-rich-brown dark:text-cafe-latte font-normal">
                        مرا به خاطر بسپار
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link
                  to="/forgot-password"
                  className="text-cafe-caramel hover:text-cafe-mocha dark:hover:text-cafe-golden transition-colors text-sm"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium py-3 rounded-xl text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin ml-2"></div>
                    در حال ورود...
                  </div>
                ) : (
                  "ورود"
                )}
              </Button>
            </form>
          </Form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cafe-latte dark:border-cafe-rich-brown"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-cafe-mocha text-cafe-rich-brown dark:text-cafe-latte">
                  یا ورود با
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-cafe-latte dark:border-cafe-rich-brown hover:bg-cafe-cream dark:hover:bg-cafe-espresso"
              >
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="border-cafe-latte dark:border-cafe-rich-brown hover:bg-cafe-cream dark:hover:bg-cafe-espresso"
              >
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-cafe-rich-brown dark:text-cafe-latte">
              حساب کاربری ندارید؟{" "}
              <Link
                to="/register"
                className="text-cafe-caramel hover:text-cafe-mocha dark:hover:text-cafe-golden transition-colors font-medium"
              >
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Account Info */}
        <div className="mt-6 bg-cafe-golden/10 dark:bg-cafe-golden/20 rounded-xl p-4 border border-cafe-golden/20">
          <p className="text-center text-cafe-mocha dark:text-cafe-warm-white text-sm">
            <strong>حساب آزمایشی:</strong> demo@bookclub.ir | رمز: demo123
          </p>
        </div>
      </div>
    </div>
  );
}