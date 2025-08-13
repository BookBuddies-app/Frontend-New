import { BookOpen, Instagram, Send, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cafe-dark-brown text-cafe-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BookOpen className="text-cafe-orange text-2xl ml-2" />
              <span className="text-xl font-bold font-serif">باشگاه کتاب کافه</span>
            </div>
            <p className="text-cafe-light mb-4 leading-relaxed">
              مکانی برای عاشقان کتاب که می‌خواهند در فضایی گرم و دوستانه درباره ادبیات فارسی صحبت کنند.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-cafe-cream hover:text-cafe-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cafe-cream hover:text-cafe-orange transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="text-cafe-cream hover:text-cafe-orange transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 font-serif">پیوندهای مفید</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-cafe-light hover:text-white transition-colors">درباره ما</a></li>
              <li><a href="#" className="text-cafe-light hover:text-white transition-colors">رویدادها</a></li>
              <li><a href="#" className="text-cafe-light hover:text-white transition-colors">قوانین</a></li>
              <li><a href="#" className="text-cafe-light hover:text-white transition-colors">تماس با ما</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 font-serif">اطلاعات تماس</h4>
            <div className="space-y-2 text-cafe-light">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt ml-2"></i>
                <span>تهران، خیابان ولیعصر</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone ml-2"></i>
                <span className="persian-numbers">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope ml-2"></i>
                <span>info@bookclubcafe.ir</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cafe-brown mt-8 pt-8 text-center text-cafe-light">
          <p className="persian-numbers">&copy; ۱۴۰۳ باشگاه کتاب کافه. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}