import { CheckCircle, AlertTriangle, Users, BookOpen, Coffee, Clock } from "lucide-react";

export default function Rules() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cafe-cream to-white dark:from-cafe-mocha dark:to-cafe-espresso">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-6 font-serif">
              قوانین و مقررات
            </h1>
            <p className="text-xl text-cafe-rich-brown dark:text-cafe-latte max-w-3xl mx-auto leading-relaxed">
              برای حفظ فضای دوستانه و سازنده باشگاه کتاب، لطفاً این قوانین را مطالعه و رعایت کنید
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
        {/* General Rules */}
        <section className="mb-12">
          <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-8">
              <BookOpen className="w-8 h-8 text-cafe-caramel ml-3" />
              <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                قوانین کلی
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-cafe-sage mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">احترام متقابل</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    به نظرات و دیدگاه‌های سایر اعضا احترام بگذارید و از ایجاد بحث‌های تند و بی‌ادبانه خودداری کنید.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-cafe-sage mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">مطالعه کتاب</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    برای شرکت مؤثر در جلسات، لطفاً کتاب مورد بحث را تا حد امکان مطالعه کرده باشید.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-cafe-sage mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">فضای بدون تبعیض</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    هرگونه تبعیض بر اساس جنسیت، مذهب، قومیت یا عقاید سیاسی ممنوع است.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-cafe-sage mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">حفظ محرمانگی</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    اطلاعات شخصی سایر اعضا باید محرمانه باقی بماند و از آن سوءاستفاده نکنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Rules */}
        <section className="mb-12">
          <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-8">
              <Users className="w-8 h-8 text-cafe-caramel ml-3" />
              <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                قوانین رویدادها
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-cafe-cinnamon mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">حضور به موقع</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    لطفاً سر وقت مقرر در جلسات حضور یابید. تأخیر بیش از ۱۵ دقیقه بدون اطلاع قبلی مناسب نیست.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-cafe-golden mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">لغو ثبت‌نام</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    در صورت عدم توانایی حضور، حداقل ۲۴ ساعت قبل از برگزاری رویداد اطلاع دهید تا اعضای فهرست انتظار بتوانند شرکت کنند.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Coffee className="w-6 h-6 text-cafe-mocha mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">آداب کافه</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    از فضای کافه با احترام استفاده کنید و میز خود را پس از پایان جلسه تمیز کنید.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-cafe-sage mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-2">مشارکت فعال</h3>
                  <p className="text-cafe-rich-brown dark:text-cafe-latte leading-relaxed">
                    در بحث‌ها مشارکت داشته باشید و از صحبت کردن در طول سخنرانی دیگران خودداری کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Rules */}
        <section className="mb-12">
          <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-8">
              <CheckCircle className="w-8 h-8 text-cafe-caramel ml-3" />
              <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                قوانین ثبت‌نام
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-cafe-cream dark:bg-cafe-espresso rounded-xl p-6">
                <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-3">شرایط عضویت</h3>
                <ul className="space-y-2 text-cafe-rich-brown dark:text-cafe-latte">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-2"></div>
                    حداقل سن ۱۶ سال
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-2"></div>
                    علاقه به مطالعه و ادبیات فارسی
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-2"></div>
                    تکمیل فرم ثبت‌نام با اطلاعات صحیح
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cafe-caramel rounded-full ml-2"></div>
                    پذیرش قوانین و مقررات باشگاه
                  </li>
                </ul>
              </div>

              <div className="bg-cafe-latte/20 dark:bg-cafe-golden/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-cafe-mocha dark:text-cafe-warm-white mb-3">فرآیند ثبت‌نام</h3>
                <div className="space-y-3 text-cafe-rich-brown dark:text-cafe-latte">
                  <p><strong>۱.</strong> تکمیل فرم ثبت‌نام آنلاین</p>
                  <p><strong>۲.</strong> تأیید ایمیل ارسالی</p>
                  <p><strong>۳.</strong> انتخاب رویداد مورد نظر</p>
                  <p><strong>۴.</strong> تأیید نهایی توسط مدیران</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Violations and Penalties */}
        <section className="mb-12">
          <div className="bg-white dark:bg-cafe-mocha rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-8">
              <AlertTriangle className="w-8 h-8 text-cafe-golden ml-3" />
              <h2 className="text-3xl font-bold text-cafe-mocha dark:text-cafe-warm-white font-serif">
                تخلفات و مجازات‌ها
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4">تخلفات خفیف</h3>
                <div className="space-y-3 text-cafe-rich-brown dark:text-cafe-latte">
                  <p>• تأخیر مکرر بدون اطلاع</p>
                  <p>• عدم مطالعه کتاب</p>
                  <p>• استفاده نامناسب از تجهیزات کافه</p>
                  <p><strong>مجازات:</strong> تذکر شفاهی</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-cafe-mocha dark:text-cafe-warm-white mb-4">تخلفات شدید</h3>
                <div className="space-y-3 text-cafe-rich-brown dark:text-cafe-latte">
                  <p>• بی‌احترامی به سایر اعضا</p>
                  <p>• ایجاد مزاحمت</p>
                  <p>• نقض محرمانگی</p>
                  <p><strong>مجازات:</strong> محرومیت موقت یا دائم</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agreement */}
        <section>
          <div className="bg-cafe-warm-gradient rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 font-serif">پذیرش قوانین</h2>
            <p className="text-xl mb-8 leading-relaxed">
              با ثبت‌نام در باشگاه کتاب کافه، تمامی قوانین فوق را می‌پذیرید و متعهد می‌شوید که آن‌ها را رعایت کنید.
            </p>
            <div className="bg-white/20 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-lg">
                این قوانین به منظور ایجاد فضایی امن، دوستانه و سازنده برای همه اعضا تدوین شده است.
                امیدواریم با همکاری شما، بتوانیم تجربه‌ای لذت‌بخش و آموزنده از مطالعه و بحث درباره ادبیات داشته باشیم.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}