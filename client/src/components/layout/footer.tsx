import { BookOpen, Instagram, Send, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cafe-espresso text-cafe-warm-white border-t border-cafe-mocha">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <BookOpen className="text-cafe-caramel text-3xl ml-3" />
              <span className="text-2xl font-bold font-serif text-cafe-warm-white">باشگاه کتاب کافه</span>
            </div>
            <p className="text-cafe-latte mb-6 leading-relaxed text-lg">
              مکانی برای عاشقان کتاب که می‌خواهند در فضایی گرم و دوستانه درباره ادبیات فارسی صحبت کنند.
            </p>
            <div className="flex space-x-6 space-x-reverse">
              <a href="#" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 hover:scale-110">
                <Send className="w-6 h-6" />
              </a>
              <a href="#" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 font-serif text-cafe-warm-white text-xl">پیوندهای مفید</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 text-lg hover:translate-x-2 inline-block">درباره ما</a></li>
              <li><a href="/events" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 text-lg hover:translate-x-2 inline-block">رویدادها</a></li>
              <li><a href="#" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 text-lg hover:translate-x-2 inline-block">قوانین</a></li>
              <li><a href="#" className="text-cafe-latte hover:text-cafe-golden transition-all duration-300 text-lg hover:translate-x-2 inline-block">تماس با ما</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 font-serif text-cafe-warm-white text-xl">اطلاعات تماس</h4>
            <div className="space-y-4 text-cafe-latte">
              <div className="flex items-center group">
                <MapPin className="w-5 h-5 ml-3 text-cafe-caramel group-hover:text-cafe-golden transition-colors" />
                <span className="text-lg">تهران، خیابان ولیعصر</span>
              </div>
              <div className="flex items-center group">
                <Phone className="w-5 h-5 ml-3 text-cafe-caramel group-hover:text-cafe-golden transition-colors" />
                <span className="persian-numbers text-lg">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-5 h-5 ml-3 text-cafe-caramel group-hover:text-cafe-golden transition-colors" />
                <span className="text-lg">info@bookclubcafe.ir</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cafe-mocha mt-12 pt-8 text-center text-cafe-latte">
          <p className="persian-numbers text-lg">&copy; ۱۴۰۴ باشگاه کتاب کافه. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}