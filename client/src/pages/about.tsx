import { BookOpen, Users, Coffee, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">
              درباره باشگاه کافه کتاب
            </h1>
            <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte max-w-3xl mx-auto leading-relaxed">
              مکانی گرم و دوستانه برای عاشقان ادبیات فارسی که می‌خواهند در فضایی صمیمی درباره کتاب‌های محبوبشان گفتگو کنند
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white dark:bg-cafe-mocha">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">
                داستان ما
              </h2>
              <div className="space-y-6 text-cafe-rich-brown dark:text-cafe-latte text-lg leading-relaxed">
                <p>
                  باشگاه کتاب کافه از عشق به ادبیات فارسی و نیاز به فضایی برای گفتگوهای عمیق درباره کتاب متولد شد. 
                  ما معتقدیم که بهترین گفتگوها در فضایی گرم و دوستانه، در کنار فنجان چای یا قهوه معطر شکل می‌گیرد.
                </p>
                <p>
                  هدف ما ایجاد جامعه‌ای از کتابخوانان است که علاوه بر لذت بردن از مطالعه، در بحث و تبادل نظر درباره 
                  آثار ادبی نیز شرکت کنند و از این طریق درک عمیق‌تری از ادبیات فارسی پیدا کنند.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-cafe-warm-gradient rounded-2xl p-8 shadow-2xl">
                <BookOpen className="w-24 h-24 text-white mx-auto mb-4" />
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">ماموریت ما</h3>
                  <p className="text-cafe-warm-white/90">
                    ترویج فرهنگ مطالعه و ایجاد فضای گفتگو درباره ادبیات فارسی
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-4xl font-bold text-center text-cafe-mocha dark:text-cafe-warm-white mb-16 font-serif">
            ارزش‌های ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-cafe-caramel rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">جامعه</h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                ایجاد فضایی گرم و پذیرا برای همه کسانی که عاشق کتاب و ادبیات هستند
              </p>
            </div>
            <div className="text-center">
              <div className="bg-cafe-sage rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">صمیمیت</h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                فراهم کردن فضای صمیمی کافه که گفتگوهای عمیق و معنادار را تسهیل می‌کند
              </p>
            </div>
            <div className="text-center">
              <div className="bg-cafe-cinnamon rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4 font-serif">عشق به ادبیات</h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                تقدیر از زیبایی و عمق ادبیات فارسی و ترویج مطالعه در بین جوانان
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-cafe-mocha">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cafe-mocha dark:text-cafe-golden mb-2 persian-numbers">۱۵۰+</div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte">اعضای فعال</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cafe-mocha dark:text-cafe-golden mb-2 persian-numbers">۵۰+</div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte">کتاب بررسی شده</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cafe-mocha dark:text-cafe-golden mb-2 persian-numbers">۲۰</div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte">کافه همکار</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cafe-mocha dark:text-cafe-golden mb-2 persian-numbers">۳</div>
              <div className="text-cafe-rich-brown dark:text-cafe-latte">سال فعالیت</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-4xl font-bold text-center text-cafe-mocha dark:text-cafe-warm-white mb-16 font-serif">
            تیم ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-cafe-warm-gradient rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">س.ر</span>
              </div>
              <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">سارا رضایی</h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte">مدیر اجرایی</p>
            </div>
            <div className="text-center">
              <div className="bg-cafe-caramel rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">م.ا</span>
              </div>
              <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">محمد احمدی</h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte">مسئول برنامه‌ریزی</p>
            </div>
            <div className="text-center">
              <div className="bg-cafe-sage rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">ف.م</span>
              </div>
              <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">فاطمه محمدی</h3>
              <p className="text-cafe-rich-brown dark:text-cafe-latte">مسئول روابط عمومی</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}