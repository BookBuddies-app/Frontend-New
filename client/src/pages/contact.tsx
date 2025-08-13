import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone: z.string().min(11, "شماره تلفن معتبر وارد کنید"),
  subject: z.string().min(5, "موضوع باید حداقل ۵ کاراکتر باشد"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Contact form data:", data);
      
      toast({
        title: "پیام ارسال شد",
        description: "پیام شما با موفقیت ارسال شد. در کوتاه‌ترین زمان ممکن پاسخ داده خواهد شد.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "خطا در ارسال",
        description: "مشکلی در ارسال پیام پیش آمده است. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">
              تماس با ما
            </h1>
            <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte max-w-3xl mx-auto leading-relaxed">
              برای هرگونه سؤال، پیشنهاد یا درخواست همکاری با ما در تماس باشید
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-8 font-serif">
                اطلاعات تماس
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-cafe-caramel rounded-full p-3 ml-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-1">آدرس</h3>
                    <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                      تهران، خیابان ولیعصر، نرسیده به چهارراه ولیعصر، پلاک ۱۲۳
                      <br />
                      طبقه دوم، واحد ۴
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-cafe-sage rounded-full p-3 ml-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-1">تلفن</h3>
                    <p className="text-cafe-rich-brown dark:text-cafe-latte persian-numbers">
                      ۰۲۱-۱۲۳۴۵۶۷۸
                      <br />
                      ۰۹۱۲-۳۴۵۶۷۸۹
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-cafe-cinnamon rounded-full p-3 ml-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-1">ایمیل</h3>
                    <p className="text-cafe-rich-brown dark:text-cafe-latte">
                      info@bookclubcafe.ir
                      <br />
                      support@bookclubcafe.ir
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-cafe-golden rounded-full p-3 ml-4">
                    <Clock className="w-6 h-6 text-cafe-espresso" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-1">ساعات کاری</h3>
                    <p className="text-cafe-rich-brown dark:text-cafe-latte persian-numbers">
                      شنبه تا چهارشنبه: ۹:۰۰ - ۲۱:۰۰
                      <br />
                      پنج‌شنبه و جمعه: ۱۰:۰۰ - ۲۲:۰۰
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">موقعیت ما</h3>
              <div className="bg-cafe-cream dark:bg-cafe-espresso rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-cafe-rich-brown dark:text-cafe-latte">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-cafe-caramel" />
                  <p>نقشه موقعیت باشگاه کتاب کافه</p>
                  <p className="text-sm mt-2">خیابان ولیعصر، تهران</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-8 font-serif">
              پیام به ما
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">نام و نام خانوادگی</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown"
                          placeholder="نام کامل خود را وارد کنید"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">ایمیل</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown"
                            placeholder="example@email.com"
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
                        <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">تلفن همراه</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown"
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">موضوع</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown"
                          placeholder="موضوع پیام خود را بنویسید"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cafe-mocha dark:text-cafe-warm-white font-medium">پیام</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="bg-cafe-cream dark:bg-cafe-espresso border-cafe-latte dark:border-cafe-rich-brown min-h-32"
                          placeholder="پیام خود را اینجا بنویسید..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-cafe-warm-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium py-3 rounded-xl text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin ml-2"></div>
                      در حال ارسال...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 ml-2" />
                      ارسال پیام
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}